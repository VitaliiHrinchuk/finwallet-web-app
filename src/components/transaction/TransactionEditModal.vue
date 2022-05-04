
<template>
  <v-dialog
      :value="show"
      persistent
      max-width="600px"
      @click:outside="$emit('close')"
  >

    <v-card>
      <v-card-title>
        <span class="headline">{{isEdit ? 'Edit Transaction' : 'Create New Transaction' }}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container>
          {{form}}
          <v-row>
            <v-col cols="8">
              <v-text-field
                  v-model="amount"
                  filled
                  label="Amount"
                  type="number"
                  dense
                  hide-details>
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <currency-picker v-model="currency"></currency-picker>
            </v-col>
            <v-col cols="12">
              <account-picker v-model="accountId"></account-picker>
            </v-col>
            <v-col cols="12">
              <category-picker v-model="categorySlug"></category-picker>
            </v-col>
            <v-col cols="12">
              <tag-picker v-model="tags"></tag-picker>
            </v-col>
            <v-col cols="12">
              <v-menu
                  v-model="dateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      filled
                      v-model="dateFormatted"
                      label="Transaction Date"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    @input="dateMenu = false"
                    no-title
                    v-model="date"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-container>

      </v-card-text>
      <v-card-actions>

        <v-btn
            color="primary"
            block
            @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import currencies from "../../constants/currencies";
import CurrencyPicker from "../common/CurrencyPicker";
import AccountPicker from "../account/AccountPicker";
import CategoryPicker from "../category/CategoryPicker";
import TagPicker from "../tag/TagPicker";
import {mapFields} from "vuex-map-fields";
import moment from "moment";

export default {
  props: [
    'show', 'value', 'isEdit'

  ],
  components: {
    TagPicker,
    CategoryPicker,
    AccountPicker,
    CurrencyPicker

  },
  data() {
    return {
      dateMenu: null
    }
  },
  methods: {
    formatDate (date) {
      if (!date) return null

      return moment(date).format('DD-MM-YYYY')
    },
    save() {}
  },
  computed: {
    ...mapFields('transaction/instance', {
      form: 'form',
      accountId: 'form.accountId',
      currency: 'form.currency',
      categorySlug: 'form.categorySlug',
      amount: 'form.amount',
      type: 'form.type',
      tags: 'form.tags',
      date: 'form.date'
    }),
    dateFormatted () {
      return this.formatDate(this.date);
    },
    currencies() {
      return currencies;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
