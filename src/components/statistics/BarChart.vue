<script>
import {Bar} from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


export default {
  extends: Bar,
  props: ['options', 'chartData'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
}
</script>

<style scoped>

</style>
