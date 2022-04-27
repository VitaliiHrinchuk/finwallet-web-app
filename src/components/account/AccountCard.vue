<template>
  <v-card elevation="0" dark rounded class="rounded-xl">
    <v-row align="center">
      <v-col cols="2"  >
        <v-sheet
            class="rounded-circle mx-3 d-block"
            elevation="0"
            width="20"
            height="20"
            style="padding: 50%"
            :color="accountColor"
        >
          <span>&nbsp;</span>
        </v-sheet>
      </v-col>
      <v-col class="p-0">
        <v-card-title>{{ name }}</v-card-title>
        <v-card-subtitle>{{ formattedAmount }} {{ currency }}</v-card-subtitle>
      </v-col>
    </v-row>

  </v-card>
</template>

<script>
export default {
  props: {
    name: String,
    currency: String,
    color: String,
    amount: Number
  },
  name: "AccountCard",
  computed: {
    accountColor() {
      return '#' + this.color;
    },
    formattedAmount() {
      return this.amount.toFixed(2);
    }
  }
}
</script>

<style scoped>

</style>
