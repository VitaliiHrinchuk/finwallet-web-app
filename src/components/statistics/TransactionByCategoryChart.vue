<template>
  <v-sheet max-height="400" >

    <doughnut-chart
        v-if="data.length > 0"
        :chart-data="chartData"
        :options="options"
    ></doughnut-chart>
    <content-placeholder title="Looks like you don't have any transaction by selected month" v-else></content-placeholder>
  </v-sheet>
</template>

<script>

import moment from "moment";
import DoughnutChart from "./DoughnutChart";
import { CATEGORY_COLORS } from '../../constants/categories'
import ContentPlaceholder from "../common/ContentPlaceholder";
export default {
  name: "TransactionByCategoryChart",
  components: {ContentPlaceholder, DoughnutChart},
  props: {
    data: {
      type: Array,
      default: () => []
    },
    baseCurrency: String
  },
  computed: {
    total() {
      return this.data.reduce((prev, current) => prev + current.sum, 0).toFixed(2)
    },
    chartData(){
      const categories = this.data.map(item => item.name);
      const values = this.data.map(item => item.sum);
      const colors = this.data.map(item => CATEGORY_COLORS[item.slug] || '#000000');
      return {
        labels: categories,

        datasets: [
          {
            label: 'Expense',
            backgroundColor: colors,
            data: values
          },
        ]
      }
    },
    options() {
      return {
        maintainAspectRatio: false,
        elements: {
          center: {
            text: 'Test',
          }
        }
      }
    },

  },
  methods: {
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>

<style scoped>

</style>
