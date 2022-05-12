<template>
  <v-dialog
      :value="show"
      persistent
      max-width="600px"
      @click:outside="$emit('close')"
  >

    <v-card>
      <v-card-title>
        <span class="headline">{{isEdit ? 'Edit Tag' : 'Create New Tag' }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                  filled
                  :value="value.name"
                  label="Name"
                  dense
                  hide-details
                  @input="(val) => handleInput(val,'name')">

              </v-text-field>
            </v-col>
          </v-row>
        </v-container>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            text
            @click="$emit('close')"
        >
          Close
        </v-btn>
        <v-btn
            color="success"
            text
            @click="$emit('save')"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: [
    'show', 'value', 'isEdit'

  ],
  methods: {
    handleInput(val, field) {
      let instance = {...this.value}
      instance[field] = val;
      this.$emit('input', instance)
    }
  },

}
</script>

<style lang="scss" scoped>

</style>
