<template>
  <div>
    <div v-if="isLoading">
      ローディング中...
    </div>
    <template v-else>
      <div
        v-if="isLogin"
      >
        <FormComponent @add-task-item="addTaskItem" />
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="4">
              <TaskPanel
                panel-title="作業前"
                :tasks="beforeTasks"
                @remove-task-item="removeTaskItem($event)"
              />
            </v-col>
            <v-col cols="12" md="4">
              <TaskPanel
                panel-title="作業中"
                :tasks="runningTasks"
                @remove-task-item="removeTaskItem($event)"
              />
            </v-col>
            <v-col cols="12" md="4">
              <TaskPanel
                panel-title="完了"
                :tasks="doneTasks"
                @remove-task-item="removeTaskItem($event)"
              />
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div v-else class="my-2">
        <v-btn
          @click="logIn"
          :loading="loading"
          :disabled="loading"
          x-large
          color="primary"
          dark
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
import FormComponent from '~/components/FormComponent.vue'
import ModalContent from '~/components/ModalContent.vue'
import TaskPanel from '~/components/TaskPanel.vue'

@Component({
  middleware: 'checkAuthentication',
  components: {
    FormComponent,
    ModalContent,
    TaskPanel
  }
})
export default class IndexPage extends Vue {
  @Getter('beforeTasks') beforeTasks
  @Getter('runningTasks') runningTasks
  @Getter('doneTasks') doneTasks
  @Getter('tasks') tasks
  @Action('init') init
  @Action('addTask') addTask
  @Action('removeTask') removeTask
  @Mutation('setTask') setTask

  isLoading = true
  isLogin = true
  loader = null
  loading = false
  user = {
    email: 'hogehoge@hoge.com'
  }

  private addTaskItem (tasks: { [key: string]: any }): void {
    this.addTask(tasks)
  }

  private removeTaskItem (taskId: string | number):void {
    this.removeTask(taskId)
  }

  async mounted () {
    await this.init()
    this.isLoading = false
  }
}
</script>
