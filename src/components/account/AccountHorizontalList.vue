<template>
  <v-container class="p-3">

    <v-row >
      <v-col cols="12">
          <div class="d-flex">
            <div class="title">Your Accounts</div>
            <v-btn :to="{ name: 'account.index'}" light icon><v-icon>mdi-cog</v-icon></v-btn>
          </div>
      </v-col>
      <v-col cols="2" v-for="account in list" :key="account.id" class="mb-2">
        <account-card
            :name="account.name"
            :color="account.hexColor"
            :amount="account.amount"
            :currency="account.currency"
            :disabled="!!selectedAccount && selectedAccount != account.id"
            @select="() => $emit('change', account)"
        >

        </account-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AccountCard from "./AccountCard";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: "AccountHorizontalList",
  props: {
    selectedAccount: String
  },
  components: {
    AccountCard
  },
  methods: {
    ...mapActions('account', {
      fetch: 'fetch'
    })
  },
  computed: {
    ...mapState('account', {
      list: 'list'
    }),

  },
  created() {
    this.fetch();
  }
}
</script>

<style scoped>

</style>
