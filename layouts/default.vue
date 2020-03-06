<template>
  <v-app color="info">
    <v-app-bar
      color="primary"
      fixed
      app
    >
      <v-toolbar-title v-text="title" class="text-logo" />
      <v-icon
        class="ml-2 ico-logo"
        :class="{'is-bound': !isLogin}"
      >
        mdi-lead-pencil
      </v-icon>
      <v-spacer />
      <template v-if="isLogin">
        <p class="mb-0 mr-2">
          <v-icon class="mr-1">mdi-account-circle-outline</v-icon>
          {{ user.displayName }}
        </p>
        <v-btn
          icon
          @click="logOut"
        >
          <v-icon>mdi-logout-variant</v-icon>
        </v-btn>
      </template>
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
    this.$router.push('/login')
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c|Pacifico&display=swap');
.v-application--wrap {
  font-family: 'M PLUS Rounded 1c', sans-serif;
}
.text-logo {
  font: {
    family: 'Pacifico', cursive;
    size: 1.8rem;
  }
  color: #FFFFFF;
}
.ico-logo {
  .v-toolbar__content & {
    color: #FFFFFF;
  }
}
</style>
