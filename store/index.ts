import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import firebase from '~/plugins/firebase'
import { IndexState, TaskDetail } from '~/types/'
import filteringTasks from '~/common/filteringTasks'
import checkTerm from '~/common/checkTerm'

const db = firebase.firestore()
const usersCollection = db.collection('users')

export const state = (): IndexState => ({
  isLogin: false,
  isLoading: true,
  user: null,
  tasks: [],
  taskItem: {
    id: null,
    title: null,
    description: null,
    status: null,
    ended_date: null,
    tags: []
  }
})

export const getters: GetterTree<IndexState, IndexState> = {
  isLogin: state => !!state.user,
  user: state => state.user,
  beforeTasks: (state: IndexState): TaskDetail[] | undefined => {
    if (state.tasks === null) return
    const filteringtask = filteringTasks(state.tasks, 'before')

    return checkTerm(filteringtask)
  },
  runningTasks: (state: IndexState): TaskDetail[] | undefined => {
    if (state.tasks === null) return
    const filteringtask = filteringTasks(state.tasks, 'running')

    return checkTerm(filteringtask)
  },
  doneTasks: (state: IndexState): TaskDetail[] | undefined => {
    if (state.tasks === null) return

    return filteringTasks(state.tasks, 'done')
  },
  tasks: (state: IndexState): TaskDetail[] | null => state.tasks
}

export const mutations: MutationTree<IndexState> = {
  setLoggedIn: (state: IndexState, isLogin: boolean): void => {
    state.isLogin = isLogin
  },
  setUserData: (state: IndexState, user): void => {
    state.user = user
  },
  setTask: (state: IndexState, tasks: any): void => {
    state.tasks = tasks
  },
  ...vuexfireMutations
}

export const actions: ActionTree<IndexState, IndexState> = {
  init: firestoreAction(async ({ bindFirestoreRef, rootGetters }): Promise<void> => {
    const uid = rootGetters.user.uid
    const userTasks = usersCollection.doc(uid).collection('tasks')

    bindFirestoreRef('tasks', userTasks)
  }),
  addTask: firestoreAction(({ rootGetters }, taskItem): void => {
    const uid = rootGetters.user.uid
    const userTaskCollection = usersCollection.doc(uid).collection('tasks')

    userTaskCollection.add(taskItem)
  }),
  updateTask: firestoreAction((context, taskItem): void => {
    const uid = context.rootGetters.user.uid
    const taskId = taskItem.id
    const updatedTask = usersCollection.doc(uid).collection('tasks').doc(taskId)

    updatedTask.update({ status: taskItem.status })
  }),
  removeTask: firestoreAction(({ rootGetters }, id): void => {
    const uid = rootGetters.user.uid
    usersCollection.doc(uid).collection('tasks').doc(id).delete()
  })
}

