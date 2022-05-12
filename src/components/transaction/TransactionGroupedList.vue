<template>
  <v-card>
    <v-tabs
        v-model="tab"
        grow
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab
          v-for="item in tabs"
          :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
          v-for="item in tabs"
          :key="item"
      >
        <v-card flat>
          <v-list class="overflow-y-auto" :max-height="maxHeight" :min-height="maxHeight">
            <v-slide-y-transition group>
              <div v-for="(listItem, i) in list" :key="i">
                <v-subheader class="d-flex justify-space-between" v-if="listItem.divider">

                  <div>
                    {{ listItem.leadingTitle }}
                  </div>
                  <div>
                    {{ listItem.trailingTitle }}
                  </div>

                </v-subheader>
                <transaction-list-item
                    v-else
                    :amount="listItem.amount"
                    :account="listItem.account.name"
                    :category="listItem.category.name"
                    :tags="listItem.tags"
                    :currency="listItem.currency"
                    :type="listItem.transactionType"
                    :categorySlug="listItem.category.slug"
                />
              </div>
            </v-slide-y-transition>
          </v-list>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import TransactionListItem from "./TransactionListItem";
import moment from "moment";
import _ from 'lodash';
import {mapGetters} from "vuex";

export default {
  name: "TransactionGroupedList",
  components: {TransactionListItem},
  props: {
    data: Array,
    maxHeight: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      tab: null,
      tabs: ['By Date', 'By Category']
    }
  },
  computed: {
    ...mapGetters('auth', {
      baseCurrency: 'baseCurrency'
    }),
    list() {
      return this.tab == 0 ? this.listByDate : this.listByCategory
    },
    listByDate() {
      const result = [];
      const existedDates = [];
      const dateFormat = 'yyyy-MM-DD';

      this.data.forEach(entity => {
        const entityDate = moment(entity.transactionDate);
        const formattedDate = entityDate.format(dateFormat);

        if (existedDates.includes(formattedDate)) {
          result.push(entity);
        } else {
          const total = this._getTotalByDate(entityDate);
          result.push({divider: true, leadingTitle: formattedDate, trailingTitle: total + ' ' + this.baseCurrency});
          result.push(entity);
          existedDates.push(formattedDate);
        }
      });

      return result;
    },
    listByCategory() {
      const result = [];
      const categoryGroups = [];

      this.data.forEach(entity => {
        if (!_.find(categoryGroups, (item) => item.name == entity.category.name)) {
          const totalByGroup = this._getTotalByGroup(entity.category.name);
          categoryGroups.push({name: entity.category.name, total: totalByGroup});
        }
      });
      const sorted = _.sortBy(categoryGroups, (item) => item.total);

      sorted.forEach(group => {
        result.push({divider: true, leadingTitle: group.name, trailingTitle: group.total + ' ' + this.baseCurrency});

        this.data.forEach(entity => {
          if (entity.category.name == group.name) {
            result.push(entity);
          }
        });
      })

      return result;
    },

  },
  methods: {
    _getTotalByGroup(name) {
      return this.data.reduce((prev, current) => {
        if(current.category.name == name) {
          return prev + (current.transactionType == 'CRE' ? -current.amount : current.amount)
        }
        return prev;
      }, 0);
    },
    _getTotalByDate(date) {
      return this.data.reduce((prev, current) => {
        if(moment(current.transactionDate).format('yyyy-MM-DD') == date.format('yyyy-MM-DD')) {
          return prev + (current.transactionType == 'CRE' ? -current.amount : current.amount)
        }
        return prev;
      }, 0);
    }
  }
}
</script>

<style scoped>

</style>
