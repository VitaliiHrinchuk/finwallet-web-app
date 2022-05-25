<template>
  <v-menu
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
          filled
          hide-details
          label="Start Date"
          prepend-inner-icon="mdi-calendar"
          readonly
          :value="computedValue"
          v-bind="attrs"
          v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
        @input="dateMenu = false"
        no-title
        @change="onChange"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import moment from 'moment';
export default {
  name: "DatePicker",
  props: ['value'],
  data() {
    return {
      dateMenu: null
    }
  },
  methods: {
    onChange(val) {
      this.$emit('input', moment(val, 'YYYY-MM-DD').toDate());
      this.$emit('change')
    }
  },
  computed: {
    computedValue() {
      return moment(this.value).format('YYYY-MM-DD')
    }
  }
}
</script>

<style scoped>

</style>
