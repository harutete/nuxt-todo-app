<template>
  <div>
    <div v-if="isLoading">
      ローディング中...
    </div>
    <template v-else>
      <div
        v-if="isLogin"
      >
        <v-btn
          @click="logOut"
          :loading="loading"
          :disabled="loading"
          x-large
          color="blue-grey"
          dark
        >ログアウト</v-btn>
        <FormComponent />
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="4">
              <v-card>
                <h2 class="title font-weight-bold mx-3 pt-3">作業前</h2>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-card>
                        <v-card-title>
                          <span @click="showModal">やることタイトル(必須)<v-icon>mdi-dock-window</v-icon></span>
                        </v-card-title>
                        <v-card-text>
                          <div class="text--primary">
                            備考書いてあれば(必須ではない)
                          </div>
                        </v-card-text>
                      </v-card>
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
                    <v-col cols="12">
                      <v-card>
                        <v-card-title>
                          <span @click="showModal">やることタイトル(必須)<v-icon>mdi-dock-window</v-icon></span>
                        </v-card-title>
                        <v-card-text>
                          <div class="text--primary">
                            備考書いてあれば(必須ではない)
                          </div>
                        </v-card-text>
                      </v-card>
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
                    <v-col cols="12">
                      <v-card>
                        <v-card-title>
                          <span @click="showModal">やることタイトル(必須)<v-icon>mdi-dock-window</v-icon></span>
                        </v-card-title>
                        <v-card-text>
                          <div class="mt-n2 ml-n2">
                            <v-chip
                              class="ma-2"
                              color="pink"
                              label
                              text-color="white"
                            >
                              <v-icon left>mdi-label</v-icon>
                              タグが入る
                            </v-chip>
                          </div>
                          <div class="text--primary">
                            備考書いてあれば(必須ではない)
                          </div>
                          <v-container>
                            <v-row
                              align="center"
                              justify="space-between"
                            >
                              <v-col cols="6">
                                <p class="mb-0">YYYY/MM/DD HH:MM</p>
                              </v-col>
                              <v-col cols="6">
                                <v-btn class="float-right" icon>
                                  <v-icon>mdi-trash-can-outline</v-icon>
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                      </v-card>
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
// import firebase from '~/plugins/firebase'

@Component({
  components: {
    FormComponent,
    ModalContent
  }
})
export default class IndexPage extends Vue {
  @Mutation('setTask') setTask
  @Getter('tasks') tasks
  @Action('init') init

  isLoading = false
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

  private logOut () {
    console.log('LOGOUT')
    // firebase.auth().signOut()
  }

  private showModal () {
    this.isDialogOpen = true
  }

  async mounted () {
    const response = await this.init()

    console.log(response)
  }
}
</script>
