import { GetterTree, ActionContext, ActionTree, MutationTree } from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import firebase from '~/plugins/firebase'
import { TaskState, TaskDetail } from '~/types/'
import filteringTasks from '~/common/filteringTasks'

const db = firebase.firestore()
const taskRef = db.collection('task')

export const state = (): TaskState => ({
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

export const getters: GetterTree<TaskState, TaskState> = {
  beforeTasks: (state: TaskState): TaskDetail[] | undefined => {
    if (state.tasks === null) return

    return filteringTasks(state.tasks, 'before')
  },
  runningTasks: (state: TaskState): TaskDetail[] | undefined => {
    if (state.tasks === null) return

    return filteringTasks(state.tasks, 'running')
  },
  doneTasks: (state: TaskState): TaskDetail[] | undefined => {
    if (state.tasks === null) return

    return filteringTasks(state.tasks, 'done')
  },
  tasks: (state: TaskState): TaskDetail[] | null => state.tasks
}

export const mutations: MutationTree<TaskState> = {
  setTask: (state: TaskState, tasks: any) => {
    state.tasks = tasks
  },
  ...vuexfireMutations
}

export const actions: ActionTree<TaskState, TaskState> = {
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

