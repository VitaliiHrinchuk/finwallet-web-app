<template>
  <v-card :min-height="minHeight" class="px-3">
    <v-row>
      <v-col cols="12">
        <h3 class="text-center">Filters</h3>
      </v-col>
      <v-col cols="12">
        <transaction-filter-section title="Date">
          <template>
            <v-row>
              <v-col cols="6">
                <date-picker @change="$emit('change')" v-model="startDate"></date-picker>
              </v-col>
              <v-col cols="6">
                <date-picker @change="$emit('change')" v-model="endDate"></date-picker>
              </v-col>
            </v-row>
          </template>
        </transaction-filter-section>
      </v-col>
      <v-col cols="12">
        <transaction-filter-section title="Account">
          <template>
            <account-picker @change="$emit('change')" v-model="accountId"></account-picker>
          </template>
        </transaction-filter-section>

      </v-col>
      <v-col cols="12">
        <transaction-filter-section title="Category">
          <template>
            <category-picker @change="$emit('change')" v-model="categories" :multiple="true"></category-picker>
          </template>
        </transaction-filter-section>
      </v-col>
      <v-col cols="12">
        <transaction-filter-section title="Type">
          <template>
            <v-radio-group v-model="type" @change="$emit('change')">
              <v-radio
                  v-for="type in typeOptions"
                  :key="type.value"
                  :label="type.title"
                  :value="type.value"
              ></v-radio>
            </v-radio-group>
          </template>
        </transaction-filter-section>

      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import DatePicker from "../common/DatePicker";
import AccountPicker from "../account/AccountPicker";
import CategoryPicker from "../category/CategoryPicker";
import TransactionFilterSection from "./TransactionFilterSection";
import {mapFields} from "vuex-map-fields";
export default {
  components: {TransactionFilterSection, CategoryPicker, AccountPicker, DatePicker},
  props: {
    minHeight: Number
  },
  name: "TransactionFilters",
  data() {
    return {

    }
  },
  computed: {
    ...mapFields('transaction', {
      startDate: 'query.startDate',
      endDate: 'query.endDate',
      accountId: 'query.accountId',
      categories: 'query.categories',
      type: 'query.type',
      filters:'query'
    }),
    typeOptions() {
      return [
        {
          title: 'All',
          value: null
        },
        {
          title: 'Income',
          value: 'DEB'
        },
        {
          title: 'Expense',
          value: 'CRE'
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
