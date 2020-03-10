<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="6"
      >
        <v-card
          outlined
          class="d-flex flex-column align-center py-12"
        >
          <p class="text-lead">
            Welcome
          </p>
          <div class="content-login-button-area">
            <v-btn
              outlined
              color="accent"
              class="mt-4"
              @click="logIn"
            >
              Login
            </v-btn>
            <p class="mt-6">
              Login with your Google account
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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

<style scoped lang="scss">
.content {
  &-login {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  &-login-button-area {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
.text-lead {
  font: {
    family: 'Pacifico', cursive;
    size: 1.8rem;
  }
}
</style>
