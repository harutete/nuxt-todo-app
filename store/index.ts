import { GetterTree, ActionContext, ActionTree, MutationTree } from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import firebase from '~/plugins/firebase'
import { TaskState } from '~/types/'
import filteringTasks from '~/common/filteringTasks'

const db = firebase.firestore()

export const state = (): TaskState => ({
  tasks: []
})

export const getters: GetterTree<TaskState, TaskState> = {
  beforeTasks: (state: TaskState) => {
    if (state.tasks === null) return false

    return filteringTasks(state.tasks, 'before')
  },
  runningTasks: (state: TaskState) => {
    if (state.tasks === null) return false

    return filteringTasks(state.tasks, 'running')
  },
  doneTasks: (state: TaskState) => {
    if (state.tasks === null) return false

    return filteringTasks(state.tasks, 'done')
  },
  tasks: (state: TaskState) => state.tasks
}

export const mutations: MutationTree<TaskState> = {
  setTask: (state: TaskState, tasks: any) => {
    state.tasks = tasks
  },
  ...vuexfireMutations
}

export const actions: ActionTree<TaskState, TaskState> = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('tasks', db.collection('task'))
  })
}

