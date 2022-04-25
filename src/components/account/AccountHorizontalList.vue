<template>
  <v-container class="p-3">

    <v-row >
      <v-col cols="12">
        <div class="title">Your Accounts</div>
      </v-col>
      <v-col cols="2" v-for="account in list" :key="account.id" class="mb-2">
        <AccountCard
            :name="account.name"
            :color="account.hexColor"
            :amount="account.amount"
            :currency="account.currency"
        >

        </AccountCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AccountCard from "./AccountCard";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: "AccountHorizontalList",
  components: {
    AccountCard
  },
  computed: {
    ...mapState('account', {
      list: 'list'
    }),
    ...mapActions('account', {
      fetch: 'fetch'
    })
  },
  created() {
    this.fetch();
  }
}
</script>

<style scoped>

</style>
