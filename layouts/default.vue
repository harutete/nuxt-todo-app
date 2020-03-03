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
      <p class="mb-0 mr-2" v-if="isLogin">
        <v-icon class="mr-1">mdi-account-circle-outline</v-icon>
        {{ user.displayName }}
      </p>
      <v-btn
        icon
        @click="logOut"
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
import { Getter } from 'vuex-class'
import firebase from 'firebase'

@Component
export default class DefaultLayout extends Vue {
  @Getter('user') user
  @Getter('isLogin') isLogin

  title = 'TODO TASK'
  clipped = false
  drawer = false
  fixed = false
  miniVariant = false
  right = true
  rightDrawer = false

  private logOut () {
    firebase.auth().signOut()
  }

  mounted () {
    console.log(this.user.email)
  }
}
</script>
