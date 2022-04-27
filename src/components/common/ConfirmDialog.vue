<template>
  <v-dialog v-model="dialog" persistent max-width="590" @click:outside="$emit('close')">
    <v-card>
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      <v-card-text>{{ text }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="$emit('close')">
          No
        </v-btn>
        <v-btn color="primary" @click="confirm">
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['dialog', 'title', 'text'],
  methods: {
    confirm() {
      this.$emit('close');
      this.$emit('confirm');
    },
  },
};
</script>

<style lang="scss" scoped></style>
