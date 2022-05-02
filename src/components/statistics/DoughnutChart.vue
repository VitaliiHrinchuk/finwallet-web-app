<script>
import {Doughnut} from "vue-chartjs/legacy";


import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
export default {
  extends: Doughnut,
  props: ['options', 'chartData'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
}
</script>

<style scoped>

</style>
