<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      justify="center"
    >
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>
      <p class="mb-0" v-if="isLogin">
        {{ user.email }}でログイン中
      </p>
      <v-btn
        icon
        @click="logOut"
        :loading="loading"
      >
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      <small>&copy; 2019</small>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class DefaultLayout extends Vue {
  title = 'TODO TASK'
  clipped = false
  drawer = false
  fixed = false
  miniVariant = false
  right = true
  rightDrawer = false
  isLogin = true
  user = {
    email: 'hogehoge@hoge.com'
  }

  private logOut () {
    console.log('LOGOUT')
    // firebase.auth().signOut()
  }
}
</script>
