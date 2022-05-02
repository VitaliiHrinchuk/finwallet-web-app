<template>
  <v-layout class=" p-0" column>
    <home-header class="pb-10">
      <account-horizontal-list @change="onAccountChange" :selectedAccount="filters.accountId" class="pb-5"></account-horizontal-list>
    </home-header>onAccountChange
    <v-sheet class="rounded-xl pa-5" color="white" style="margin-top: -35px" >
      <v-row align="center">
        <v-col cols="12">
          <div class="d-flex justify-center">
            <date-slider @change="onMonthChange" ></date-slider>
          </div>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="6">
              <div class="d-flex flex-column">
                <h2>{{baseCurrency}} {{total}} Total Spent</h2>
                <transaction-by-category-chart :data="categoryChartData"></transaction-by-category-chart>

                <monthly-spends-chart :data="monthlyChartData" />
              </div>
            </v-col>
            <v-col cols="6">
              <transaction-grouped-list :data="transactions"></transaction-grouped-list>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

    </v-sheet>

  </v-layout>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import HomeHeader from "../components/home/HomeHeader";
import AccountHorizontalList from "../components/account/AccountHorizontalList";
import DateSlider from "../components/common/MonthSlider";
import MonthlySpendsChart from "../components/statistics/MonthlySpendsChart";
import {mapFields} from "vuex-map-fields";
import moment from "moment";
import TransactionByCategoryChart from "../components/statistics/TransactionByCategoryChart";
import TransactionGroupedList from "../components/transaction/TransactionGroupedList";
export default {
  name: 'Home',
  components: {
    TransactionGroupedList,
    TransactionByCategoryChart,
    MonthlySpendsChart,
    DateSlider,
    HomeHeader,
    AccountHorizontalList
  },
  data() {
    return {
      monthlyChartData: [],
      categoryChartData: [],
      filters: {
        startDate: moment().startOf('month').toDate(),
        endDate: moment().endOf('month').toDate(),
        accountId: null
      }
    };
  },
  computed: {
      ...mapGetters('auth', {
        baseCurrency: 'baseCurrency'
      }),
      ...mapFields('analytics', {
        startDate: 'query.startDate',
        endDate: 'query.endDate',
      }),
      ...mapFields('transaction', {
        transactionsQuery: 'query',
      }),
      ...mapGetters('transaction', {
        transactions: 'entities'
      }),
      total() {
        return this.monthlyChartData.reduce((prev, current) => prev + current.sum, 0).toFixed(2)
      },
  },
  methods: {
    ...mapActions('analytics', {
      fetchAnalytics: 'fetch',
    }),
    ...mapActions('transaction', {
      fetchTransactions: 'fetch',
    }),
    onMonthChange(dateRange) {
      this.filters = {
        ...this.filters,
        startDate: dateRange.start,
        endDate: dateRange.end
      }

      this.refresh();
    },
    async refreshAnalytics() {
      this.monthlyChartData = await this.fetchAnalytics({
        type: 'date',
        transactionType: 'CRE',
        ...this.filters
      });
      this.categoryChartData = await this.fetchAnalytics({
        type: 'category',
        transactionType: 'CRE',
        ...this.filters
      });
    },
    async refreshTransactions() {
      this.transactionsQuery = {
        ...this.transactionsQuery,
        ...this.filters
      };
      this.fetchTransactions();
    },
    onAccountChange(account) {
      if (this.filters.accountId != null && this.filters.accountId == account.id) {
        this.filters = {
          ...this.filters,
          accountId: null
        }
      } else {
        this.filters = {
          ...this.filters,
          accountId: account.id
        }
      }

      this.refresh();
    },
    refresh() {
      this.refreshAnalytics();
      this.refreshTransactions();
    }
  },
  created() {
    this.refresh();
  },
};
</script>
