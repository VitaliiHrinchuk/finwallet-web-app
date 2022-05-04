<template>
  <v-select
      label="Tag"
      hide-details
      small-chips
      filled
      :value="value"
      :items="items"
      multiple
      deletable-chips

      :item-text="(item) => item.name"
      :item-value="(item) => item.slug"
      :loading="loading"
      @input="(newValue) => this.$emit('input', newValue)">

  </v-select>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: "TagPicker",
  props: [
    "value"
  ],
  computed: {
    ...mapGetters('tag', {
      items: 'entities'
    }),
    ...mapState('tag', {
      loading: 'loading'
    }),

  },
  methods: {
    ...mapActions('tag', {
      fetch: 'fetch'
    }),

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
