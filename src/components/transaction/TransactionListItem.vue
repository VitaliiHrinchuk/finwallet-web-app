<template>
  <v-list-item>
    <v-list-item-avatar>
      <category-icon :slug="categorySlug" ></category-icon>
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
import CategoryIcon from "../category/CategoryIcon";

export default {
  name: "TransactionListItem",
  components: {CategoryIcon},
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
