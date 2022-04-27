<template>
  <div class="d-flex align-center">
    <v-btn icon @click="setPrevMonth">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <div class="subtitle-1 font-weight-bold mx-3">{{title}}</div>
    <v-btn icon @click="setNextMonth">
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "MonthSlider",
  data() {
    return {
      value: moment()
    }
  },
  computed: {
    isCurrentMonth() {
      return moment(this.value).format('YYYY-MM') == moment().format('YYYY-MM');
    },
    title() {
      if (this.isCurrentMonth) {
        return 'This Month';
      } else {
        return moment(this.value).startOf('month').format('MMMM YYYY')
      }
    },
    monthFirstAndLastDay() {
      return {
        start: moment(this.value).startOf('month').toDate(),
        end: moment(this.value).endOf('month').toDate(),
      }
    }
  },
  methods: {
    setPrevMonth() {
      const current = moment(this.value).startOf('month');

      this.value = moment(current.subtract('1', "day"));
      this.$emit('change', this.monthFirstAndLastDay);
    },
    setNextMonth() {
      if (!this.isCurrentMonth) {
        const current = moment(this.value).endOf('month');

        this.value = moment(current.add('1', "day"));
      }
      this.$emit('change', this.monthFirstAndLastDay);
    }
  },
  created() {

  }
}
</script>

<style scoped>

</style>
