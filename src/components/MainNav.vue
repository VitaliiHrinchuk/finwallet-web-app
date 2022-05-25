<template>
  <v-layout column fill-height>
    <v-list two-line>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">FinWallet</v-list-item-title>
          <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <template v-for="(item, i) in nav">
        <v-list-item link :to="{ name: item.path }" exact :key="item.title" >
          <v-list-item-avatar>
            <v-icon color="primary">{{ item.icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>

          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <v-spacer></v-spacer>
    <v-list dense>
      <v-list-item @click="logout">
        <v-list-item-action>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-layout>

</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import NAV_ITEMS from "../constants/nav";

export default {
  computed: {
    ...mapState('auth', {
      authenticated: 'authenticated',
    }),
    ...mapGetters('auth', {
      email: 'email',
    }),
    nav() {
      return NAV_ITEMS;
    }
  },
  methods: {
    ...mapActions('auth', {
      logout: 'logout',
    }),
  },
};
</script>
