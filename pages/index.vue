<template>
  <div>
    <div v-if="isLoading">
      ローディング中...
    </div>
    <template v-else>
      <div
        v-if="isLogin"
      >
        <AddTaskDialog @add-task-item="addTaskItem" />
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="4">
              <TaskPanel
                panel-title="作業前"
                :tasks="beforeTasks"
                @show-modal="showModal($event)"
                @drag-start="dragStart($event)"
                @drag-enter="dragEnter('before')"
                @drag-end="dragEnd($event)"
                @remove-task-item="removeTaskItem($event)"
              />
            </v-col>
            <v-col cols="12" md="4">
              <TaskPanel
                panel-title="作業中"
                :tasks="runningTasks"
                @drag-start="dragStart($event)"
                @drag-enter="dragEnter('running')"
                @drag-end="dragEnd($event)"
                @remove-task-item="removeTaskItem($event)"
              />
            </v-col>
            <v-col cols="12" md="4">
              <TaskPanel
                panel-title="完了"
                :tasks="doneTasks"
                @drag-start="dragStart($event)"
                @drag-enter="dragEnter('done')"
                @drag-end="dragEnd($event)"
                @remove-task-item="removeTaskItem($event)"
              />
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div v-else class="my-2">
        <v-btn
          :loading="loading"
          :disabled="loading"
          x-large
          color="primary"
          dark
          @click="logIn"
        >
          Googleアカウントでログイン
        </v-btn>
      </div>
      <ModalContent
        v-if="isDialogOpen"
        :task="activeTask"
        @close-modal="closeModal"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter, Mutation, Action } from 'vuex-class'

// Component
import AddTaskDialog from '~/components/AddTaskDialog.vue'
import ModalContent from '~/components/ModalContent.vue'
import TaskPanel from '~/components/TaskPanel.vue'
import { TaskDetail } from '~/types'

@Component({
  middleware: 'checkAuthentication',
  components: {
    AddTaskDialog,
    ModalContent,
    TaskPanel
  }
})
export default class IndexPage extends Vue {
  @Getter('beforeTasks') beforeTasks
  @Getter('runningTasks') runningTasks
  @Getter('doneTasks') doneTasks
  @Getter('tasks') tasks
  @Getter('user') user
  @Action('init') init
  @Action('addTask') addTask
  @Action('updateTask') updateTask
  @Action('removeTask') removeTask
  @Mutation('setTask') setTask

  isLoading = true
  isLogin = true
  loader = null
  loading = false
  cacheItem: null | { [key: string]: any } = null
  catchState: string = ''
  isDialogOpen = false
  activeTask: null | TaskDetail = null

  private showModal (task: TaskDetail): void {
    this.activeTask = task
    this.isDialogOpen = true
  }

  private closeModal (): void {
    this.isDialogOpen = false
    this.activeTask = null
  }

  private addTaskItem (tasks: { [key: string]: any }): void {
    this.addTask(tasks)
  }

  private removeTaskItem (taskId: string):void {
    this.removeTask(taskId)
  }

  private changeStatus (status: string): void | boolean {
    if (this.cacheItem === null || this.cacheItem.status === status) {
      return false
    }

    const state = status
    const changeStatusItem = {
      ...this.cacheItem,
      status: state
    }

    this.updateTask(changeStatusItem)
  }

  private dragStart (item: { [key: string]: any }): void {
    this.cacheItem = item
  }

  private dragEnd (): void {
    this.changeStatus(this.catchState)

    this.cacheItem = null
    this.catchState = ''
  }

  private dragEnter (status: string) {
    this.catchState = status
  }

  async mounted () {
    await this.init()
    this.isLoading = false
  }
}
</script>
