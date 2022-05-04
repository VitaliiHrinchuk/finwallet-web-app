<template>
  <v-select
      label="Currency"
      hide-details
      filled
      :value="value"
      :items="currencies"
      :item-text="(item) => item.code + ' - ' + item.name"
      item-value="code"
      @input="(newValue) => this.$emit('input', newValue)">

  </v-select>
</template>

<script>
import currencies from "../../constants/currencies";

export default {
  name: "CurrencyPicker",
  props: [
      "value"
  ],
  computed: {
    currencies() {
      return currencies;
    }
  }
}
</script>

<style scoped>

</style>
