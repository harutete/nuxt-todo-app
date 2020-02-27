<template>
  <div class="text-center">
    <v-btn
      @click="logIn"
      x-large
      color="primary"
      dark
    >
      Googleアカウントでログイン
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import firebase from 'firebase'
import auth from '~/plugins/auth'

@Component
export default class LoginPage extends Vue {
  @Mutation('setUserData') setUserData

  private logIn () {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }

  async created () {
    const user = await auth()

    if (user) {
      const { uid, email, displayName }: any = user
      this.setUserData({ uid, email, displayName })

      this.$router.push('/')
    }
  }
}
</script>
