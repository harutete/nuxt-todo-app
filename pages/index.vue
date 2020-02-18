<template>
  <div>
    <div v-if="isLoading">
      ローディング中...
    </div>
    <template v-else>
      <div
        v-if="isLogin"
      >
        <FormComponent />
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="4">
              <v-card>
                <h2 class="title font-weight-bold mx-3 pt-3">作業前</h2>
                <v-container>
                  <v-row>
                    <template v-if="beforeTasks.length">
                      <v-col
                        v-for="(task, index) in beforeTasks"
                        :key="`task${index}`"
                        cols="12"
                      >
                        <TaskCard
                          :task="task"
                          @show-modal="showModal"
                        />
                      </v-col>
                    </template>
                    <v-col
                      v-else
                      cols="12"
                     >
                      <p>作業前のタスクはありません</p>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card>
                <h2 class="title font-weight-bold mx-3 pt-3">作業中</h2>
                <v-container>
                  <v-row>
                    <template v-if="runningTasks.length">
                      <v-col
                        v-for="(task, index) in runningTasks"
                        :key="`task${index}`"
                        cols="12"
                      >
                        <TaskCard :task="task" />
                      </v-col>
                    </template>
                    <v-col
                      v-else
                      cols="12"
                     >
                      <p>作業中のタスクはありません</p>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card>
                <h2 class="title font-weight-bold mx-3 pt-3">完了</h2>
                <v-container>
                  <v-row>
                    <template v-if="doneTasks.length">
                      <v-col
                        v-for="(task, index) in doneTasks"
                        :key="`task${index}`"
                        cols="12"
                      >
                        <TaskCard :task="task" />
                      </v-col>
                    </template>
                    <v-col
                      v-else
                      cols="12"
                     >
                      <p>完了のタスクはありません</p>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
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
      <ModalContent :is-dialog-open="isDialogOpen" />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
// import firebase from 'firebase'
import { Getter, Mutation, Action } from 'vuex-class'

// Component
import FormComponent from '~/components/Form.vue'
import ModalContent from '~/components/ModalContent.vue'
import TaskCard from '~/components/TaskCard.vue'
// import firebase from '~/plugins/firebase'

@Component({
  components: {
    FormComponent,
    ModalContent,
    TaskCard
  }
})
export default class IndexPage extends Vue {
  @Mutation('setTask') setTask
  @Getter('beforeTasks') beforeTasks
  @Getter('runningTasks') runningTasks
  @Getter('doneTasks') doneTasks
  @Getter('tasks') tasks
  @Action('init') init

  isLoading = true
  isLogin = true
  loader = null
  loading = false
  user = {
    email: 'hogehoge@hoge.com'
  }

  isDialogOpen = false

  private logIn () {
    console.log('LOGIN')
    // const provider = new firebase.auth.GoogleAuthProvider()
    // firebase.auth().signInWithRedirect(provider)
  }

  private showModal () {
    this.isDialogOpen = true
  }

  async mounted () {
    await this.init()
    this.isLoading = false
  }
}
</script>
