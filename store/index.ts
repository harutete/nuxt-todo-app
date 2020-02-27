import { GetterTree, ActionContext, ActionTree, MutationTree } from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import firebase from '~/plugins/firebase'
import { IndexState, TaskDetail } from '~/types/'
import filteringTasks from '~/common/filteringTasks'

const db = firebase.firestore()
const taskRef = db.collection('task')

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
  beforeTasks: (state: IndexState): TaskDetail[] | undefined => {
    if (state.tasks === null) return

    return filteringTasks(state.tasks, 'before')
  },
  runningTasks: (state: IndexState): TaskDetail[] | undefined => {
    if (state.tasks === null) return

    return filteringTasks(state.tasks, 'running')
  },
  doneTasks: (state: IndexState): TaskDetail[] | undefined => {
    if (state.tasks === null) return

    return filteringTasks(state.tasks, 'done')
  },
  tasks: (state: IndexState): TaskDetail[] | null => state.tasks
}

export const mutations: MutationTree<IndexState> = {
  setTask: (state: IndexState, tasks: any) => {
    state.tasks = tasks
  },
  ...vuexfireMutations
}

export const actions: ActionTree<IndexState, IndexState> = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('tasks', taskRef)
  }),
  addTask: firestoreAction((context, taskItem) => {
    taskRef.add(taskItem)
  }),
  removeTask: firestoreAction((context, id) => {
    taskRef.doc(id).delete()
  })
}

