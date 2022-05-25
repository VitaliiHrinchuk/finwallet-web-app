<template>
  <v-select
      label="Category"
      hide-details
      :multiple="multiple"
      filled
      :value="value"
      :items="items"
      :loading="loading"
      :item-value="(item) => item.slug"
      @input="onInput">
    <template v-slot:selection="{ item, index }">
      <v-row no-gutters align="center" v-if="!multiple">
        <category-icon :slug="item.slug"></category-icon>
        <span>{{ item.name }}</span>
      </v-row>
      <v-chip v-else>{{item.name}}</v-chip>
    </template>
    <template v-slot:item="{ active, item, attrs, on }">
      <v-list-item v-on="on" v-bind="attrs" #default="{ active }">
        <v-list-item-content>
          <v-list-item-title>
            <v-row no-gutters align="center">
              <v-checkbox dense hide-details :value="active" v-on="on"> </v-checkbox>
              <category-icon :slug="item.slug"></category-icon>
              <span>{{ item.name }}</span>
            </v-row>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-select>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import CategoryIcon from "./CategoryIcon";

export default {
  name: "CategoryPicker",
  components: {CategoryIcon},
  props: [
    "value", "type", "multiple"
  ],
  computed: {
    ...mapGetters('category', {
      entities: 'entities'
    }),
    ...mapState('category', {
      loading: 'loading'
    }),
    items() {
      if (this.type != null) {
        return this.entities.filter(item => item.categoryType == this.type);
      } else  {
        return this.entities;
      }
    }
  },
  methods: {
    ...mapActions('category', {
      fetch: 'fetch'
    }),
    onInput(newValue){
      this.$emit('input', newValue)
      this.$emit('change', newValue)
    }

  },
  created() {
    if (this.items.length == 0) {
      this.fetch();
    }
  }
}
</script>

<style scoped>

</style>
