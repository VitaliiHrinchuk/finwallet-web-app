<template>
  <v-dialog
      :value="show"
      persistent
      max-width="600px"
      @click:outside="$emit('close')"
  >

    <v-card>
      <v-card-title>
        <span class="headline">{{isEdit ? 'Edit Account' : 'Create New Account' }}</span>
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
            <v-col cols="12">
              <v-text-field
                  filled
                  :value="value.amount"
                  label="Amount"
                  :readonly="isEdit"
                  dense
                  type="number"
                  hide-details
                  @input="(val) => handleInput(parseFloat(val),'amount')">

              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                  label="Currency"
                  dense
                  hide-details
                  filled
                  :readonly="isEdit"
                  :value="value.currency"
                  :items="currencies"
                  :item-text="(item) => item.code + ' - ' + item.name"
                  item-value="code"
                  @input="(val) => handleInput(val,'currency')">

              </v-select>
            </v-col>
            <v-col cols="12">
              <div class="subtitle-2">
                Pick A Color
              </div>
              <color-picker :value="value.hexColor" @input="(val) => handleInput(val,'hexColor')"></color-picker>
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
import currencies from "../../constants/currencies";
import ColorPicker from "../common/ColorPicker";

export default {
  props: [
    'show', 'value', 'isEdit'

  ],
  components: {
    ColorPicker
  },
  methods: {
    handleInput(val, field) {
      let instance = {...this.value}
      instance[field] = val;
      this.$emit('input', instance)
    }
  },
  computed: {
    currencies() {
      return currencies;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
