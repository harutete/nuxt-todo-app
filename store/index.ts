import { GetterTree, ActionContext, ActionTree, MutationTree } from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import firebase from '~/plugins/firebase'
import { TaskState, TaskDetail } from '~/types/'
import filteringTasks from '~/common/filteringTasks'

const db = firebase.firestore()

export const state = (): TaskState => ({
  tasks: []
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
    bindFirestoreRef('tasks', db.collection('task'))
  })
}

