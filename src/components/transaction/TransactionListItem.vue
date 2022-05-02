<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-icon :color="iconColor">
        {{icon}}
      </v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="d-flex justify-space-between align-center">
        <div>
          {{category}}
          <small>
            {{joinedTags}}
          </small>
        </div>
        <div :class="amountColor">
          {{amountFormatted}}
        </div>
      </v-list-item-title>
      <v-list-item-subtitle>
        {{account}}
      </v-list-item-subtitle>
    </v-list-item-content>

  </v-list-item>
</template>

<script>
import {CATEGORY_COLORS, CATEGORY_ICONS} from "../../constants/categories";

export default {
  name: "TransactionListItem",
  props: {
    categorySlug: String,
    category: String,
    tags: Array,
    amount: Number,
    currency: String,
    account: String,
    type: String
  },
  computed: {
    icon() {
      return CATEGORY_ICONS[this.categorySlug] || CATEGORY_ICONS['other'];
    },
    iconColor() {
      return CATEGORY_COLORS[this.categorySlug] || CATEGORY_COLORS['other'];
    },
    amountFormatted() {
      let prefix = '';

      if (this.type == 'CRE') {
        prefix = '-'
      }

      return prefix + this.amount.toFixed(2) + ' ' + this.currency;
    },
    amountColor() {
      return this.type == 'CRE' ? "red--text" : 'green--text';
    },
    joinedTags() {
      return this.tags.map(item => item.name).join(', ');
    }
  }
}
</script>

<style scoped>

</style>
