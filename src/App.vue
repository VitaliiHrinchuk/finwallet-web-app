<template>
  <v-app >
    <v-navigation-drawer app permanent width="250" v-if="authenticated">
      <main-nav></main-nav>
    </v-navigation-drawer>

    <v-main >
      <router-view />
    </v-main>
    <messages></messages>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import MainNav from './components/MainNav';
import Messages from './components/Messages';
export default {
  name: 'App',

  components: {
    MainNav,
    messages: Messages,
  },

  computed: {
    ...mapState('auth', {
      authenticated: 'authenticated',
    }),
  },
};
</script>
