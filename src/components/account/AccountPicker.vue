<template>
  <v-select
      label="Account"

      hide-details
      filled
      :value="value"
      :item-value="(item) => item.id"
      :items="items"
      :loading="loading"
      @input="onInput">
      <template v-slot:selection="{ item, index }">
        <v-row no-gutters align="center">
          <v-icon left :color="'#'+item.hexColor">mdi-circle</v-icon>
          <span>{{ item.name }}</span>
        </v-row>
      </template>
      <template v-slot:item="{ active, item, attrs, on }">
        <v-list-item v-on="on" v-bind="attrs" #default="{ active }">
          <v-list-item-content>
            <v-list-item-title>
              <v-row no-gutters align="center">
                <v-icon left :color="'#'+item.hexColor">mdi-circle</v-icon>
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

export default {
  name: "AccountPicker",
  props: [
    "value", "withDefault"
  ],
  computed: {
    ...mapGetters('account', {
      items: 'entities'
    }),
    ...mapState('category', {
      loading: 'loading'
    })
  },
  methods: {
    ...mapActions('account', {
      fetch: 'fetch'
    }),
    onInput(newValue) {
      this.$emit('input', newValue)
      this.$emit('change', newValue)
    }
  },
  async mounted()  {
    if (this.items.length == 0) {
      await this.fetch();
    }
    if(this.withDefault) {
      this.$emit('input', this.items[0].id);
    }


  }
}
</script>

<style scoped>

</style>
