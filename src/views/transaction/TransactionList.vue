<template>
  <v-layout class="pt-10 px-5" column >
    <div class="text-center mb-10">
      <h2>All Records</h2>
    </div>
    <v-row style="width: 100%;" >
      <v-col cols="8" class="pa-0" >
        <transaction-grouped-list :data="transactions" max-height="600"></transaction-grouped-list>
      </v-col>
      <v-col cols="4">
        <transaction-filters @change="fetchTransactions" :min-height="700"></transaction-filters>
      </v-col>
    </v-row>

    <transaction-edit-modal @close="onTransactionModalClose" :show="showTransactionModal"></transaction-edit-modal>
    <v-btn
        color="primary"
        @click="showTransactionModal = true"
        dark
        fixed
        bottom
        right
        fab
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import {mapFields} from "vuex-map-fields";
import {mapActions, mapGetters} from "vuex";
import TransactionGroupedList from "../../components/transaction/TransactionGroupedList";
import TransactionFilters from "../../components/transaction/TransactionFilters";

export default {
  name: "TransactionList",
  components: {TransactionFilters, TransactionGroupedList},
  data() {
    return {
      showTransactionModal: false,
    }
  },
  computed: {
    ...mapFields('transaction', {
      transactionsQuery: 'query',
    }),
    ...mapGetters('transaction', {
      transactions: 'entities'
    }),
  },
  methods: {
    ...mapActions('transaction', {
      fetchTransactions: 'fetch',
    }),
    onTransactionModalClose(){
      this.showTransactionModal = false;
    },

  },
  created() {
    this.fetchTransactions();
  }
}
</script>

<style scoped>

</style>
