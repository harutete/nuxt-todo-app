<template>
  <v-app>
    <v-app-bar
      color="primary"
      fixed
      app
    >
      <v-toolbar-title
        class="text-logo white--text"
        v-text="title"
      />
      <v-icon
        class="ml-2 ico-logo white--text"
        :class="{'is-bound': !isLogin}"
      >
        mdi-lead-pencil
      </v-icon>
      <v-spacer />
      <template v-if="isLogin">
        <p class="mb-0 mr-2 white--text">
          <v-icon class="mr-1 white--text">
            mdi-account-circle-outline
          </v-icon>
          {{ user.displayName }}
        </p>
        <v-btn
          icon
          class="white--text"
          @click="logOut"
        >
          <v-icon>
            mdi-logout-variant
          </v-icon>
        </v-btn>
      </template>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      <div class="ma-auto">
        <small>&copy; 2019</small>
      </div>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter, Mutation } from 'vuex-class'
import firebase from 'firebase'

@Component
export default class DefaultLayout extends Vue {
  @Getter('user') user
  @Getter('isLogin') isLogin
  @Mutation('setLoggedIn') setLoggedIn

  title = 'TODO TASK'
  clipped = false
  drawer = false
  fixed = false
  miniVariant = false
  right = true
  rightDrawer = false

  private logOut () {
    firebase.auth().signOut()
    this.$store.commit('setLoggedIn', null)
    this.$router.push('/login')
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c|Pacifico&display=swap');
.v-application--wrap,
.v-application .v-application--wrap .title {
  font-family: 'M PLUS Rounded 1c', sans-serif !important;
}
.text-logo {
  font: {
    family: 'Pacifico', cursive;
    size: 1.8rem;
  }
}
</style>
