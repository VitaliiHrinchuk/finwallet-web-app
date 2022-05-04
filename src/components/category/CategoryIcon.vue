<template>
  <v-icon left :color="iconColor">
    {{icon}}
  </v-icon>

</template>

<script>
import {CATEGORY_COLORS, CATEGORY_ICONS} from "../../constants/categories";

export default {
  name: "CategoryIcon",
  props: {
    slug: String,
  },
  computed: {
    iconColor() {
      return CATEGORY_COLORS[this.slug] || CATEGORY_COLORS['other'];
    },
    icon() {
      return CATEGORY_ICONS[this.slug] || CATEGORY_ICONS['other'];
    },
  }
}
</script>

<style scoped>

</style>
