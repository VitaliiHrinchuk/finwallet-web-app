<template>
  <v-sheet max-height="300" >
    <bar-chart
        :chart-data="chartData"
        :options="options"
    ></bar-chart>
  </v-sheet>
</template>

<script>
import BarChart from "./BarChart";
import moment from "moment";

export default {
  name: "MonthlySpendsChart",
  components: {BarChart},
  props: {
    data: {
      type: Array,
      default: () => []
    },
  },
  computed: {

    chartData(){
      const days = this.data.map(item => moment(item.date).format('DD-MM'));
      const values = this.data.map(item => item.sum)
      return {
        labels: days,

        datasets: [
          {
            label: 'Expense',
            backgroundColor: '#000000',
            data: values
          },
          // {
          //   label: 'Income',
          //   backgroundColor: 'green',
          //   data: values
          // }
        ]
      }
    },
    options() {
      return {
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false
            }
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
