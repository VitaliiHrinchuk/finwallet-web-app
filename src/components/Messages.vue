<template>
  <v-snackbar dark v-model="active" :color="color" :top="true">
    <span>{{ message.text }}</span>
    <template v-slot:action="{ attrs }">
      <v-btn dark text @click="active = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      hasMessage: 'message/has',
      message: 'message/get',
    }),

    active: {
      get: function() {
        return this.message.text;
      },
      set: function(v) {
        if (v == false) this.$store.dispatch('message/unset');
      },
    },

    color: function() {
      return this.message.type;
    },
  },

  mounted: function() {
    this.$store.subscribe(({ type, payload }, state) => {
      if (type == 'message/put') {
        this.$forceUpdate();
      }
    });
  },
};
</script>
