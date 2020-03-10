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
                @move-item="moveItem"
                @fix-item="fixItem($event)"
                @change-status="changeStatus('before')"
                @remove-task-item="removeTaskItem($event)"
              />
            </v-col>
            <v-col cols="12" md="4">
              <TaskPanel
                panel-title="作業中"
                :tasks="runningTasks"
                @move-item="moveItem"
                @fix-item="fixItem($event)"
                @change-status="changeStatus('running')"
                @remove-task-item="removeTaskItem($event)"
              />
            </v-col>
            <v-col cols="12" md="4">
              <TaskPanel
                panel-title="完了"
                :tasks="doneTasks"
                @move-item="moveItem"
                @fix-item="fixItem($event)"
                @change-status="changeStatus('done')"
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
      <!-- <ModalContent :is-dialog-open="isDialogOpen" /> -->
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
  movedItem: null | { [key: string]: any } = null

  private addTaskItem (tasks: { [key: string]: any }): void {
    this.addTask(tasks)
  }

  private removeTaskItem (taskId: string):void {
    this.removeTask(taskId)
  }

  private changeStatus (status: string): void | boolean {
    if (this.movedItem === null || this.movedItem.status === status) {
      return false
    }
    const state = status
    const changeStatusItem = {
      ...this.movedItem,
      status: state
    }

    this.updateTask(changeStatusItem)
  }

  private moveItem (): void {
    console.log('hoge')
  }

  private fixItem (item: { [key: string]: any }): void {
    this.movedItem = item
  }

  async mounted () {
    await this.init()
    this.isLoading = false
  }
}
</script>
