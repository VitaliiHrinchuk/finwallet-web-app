<template>
  <v-container>
    <v-row align="center">
      <v-col v-for="color in colors" :key="color" cols="2">
        <v-btn icon @click="() => updateValue(color)">
          <v-sheet :color="color" width="30" height="30" class="rounded-lg mx-auto d-flex align-center justify-center">
            <v-icon v-if="value == color" color="white">mdi-check</v-icon>
          </v-sheet>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const DEFAULT_COLORS = [
    '#F44336',
    '#E91E63',
    '#673AB7',
    '#607D8B',
    '#2196F3',
    '#FF9800',
    '#00BCD4',
    '#795548',
    '#4CAF50',
    '#13E6FB',
    '#23D7CC',
    '#F57EBB'
];
export default {
  name: "ColorPicker",
  props: {
    value: String
  },
  computed: {
    colors() {
      return DEFAULT_COLORS;
    }
  },
  methods: {
    updateValue: function (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>

</style>
