<template>
  <v-card >
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
                  {{listItem.leadingTitle}}
                </div>
                <div>
                  {{listItem.trailingTitle}}
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

export default {
  name: "TransactionGroupedList",
  components: {TransactionListItem},
  props: {
    data: Array,
    maxHeight: {
      type: Number,
      default:  500
    }
  },
  data() {
    return {
      tab: null,
      tabs: ['By Date', 'By Category']
    }
  },
  computed: {
    list() {
      return this.tab == 0 ? this.listByDate : this.listByCategory
    },
    listByDate() {
      const result = [];
      const existedDates = [];
      const dateFormat = 'yyyy-MM-DD';

      this.data.forEach(entity => {
        const formattedDate = moment(entity.transactionDate).format(dateFormat);

        if (existedDates.includes(formattedDate)) {
          result.push(entity);
        } else {
          result.push({ divider: true, leadingTitle: formattedDate, trailingTitle: 1111111});
          result.push(entity);
          existedDates.push(formattedDate);
        }
      });

      return result;
    },
    listByCategory() {
      const result = [];
      const categoryGroups = [];
      const dateFormat = 'yyyy-MM-dd';

      this.data.forEach(entity => {
        if (!_.find(categoryGroups, (item) => item.name == entity.category.name)) {
          categoryGroups[entity.category.name] = 11111;
          categoryGroups.push({ name: entity.category.name, total: 1111});
        }
      });
      const sorted = _.sortBy(categoryGroups, (item) => item.total);

      sorted.forEach(group => {
        result.push({ divider: true, leadingTitle: group.name, trailingTitle: group.total});

        this.data.forEach(entity => {
          if(entity.category.name == group.name) {
            result.push(entity);
          }
        });
      })

      return result;
    }
//     List<Widget> _buildListByDate(context, List<TransactionEntity> entities) {
//   List<Widget> result = [];
//   DateFormat dateFormat = DateFormat("yyyy-MM-dd");
//   List<String> existedDates = [];
//   Currency? baseCurrency = this._getBaseCurrency(context);
//
//   entities.forEach((TransactionEntity entity) {
//     String formattedDate = dateFormat.format(entity.transactionDate);
//
//     if (existedDates.contains(formattedDate)) {
//       result.add(TransactionListItem(entity: entity));
//     } else {
//       double totalByMonth =
//           _countTotalAmountByDate(entity.transactionDate, entities);
//       result.add(TransactionListSeparator(
//           leadingTitle: formattedDate,
//           trailingTitle: formatAmount(totalByMonth, baseCurrency!),
//     ));
//       result.add(TransactionListItem(entity: entity));
//       existedDates.add(formattedDate);
//     }
//   });
//
//   return result;
// }
//
// List<Widget> _buildListByCategory(context, List<TransactionEntity> entities) {
//   List<Widget> result = [];
//   Currency? baseCurrency = this._getBaseCurrency(context);
//   Map<String, double> categoryGroups = {};
//
//   entities.forEach((TransactionEntity entity) {
//     if (!categoryGroups.containsKey(entity.category.name)) {
//       categoryGroups[entity.category.name] =
//           _countTotalAmountByCategory(entity.category.slug, entities);
//     }
//   });
//
//   Map<String, double> sortedByTotal = Map.fromEntries(
//       categoryGroups.entries.toList()
// ..sort((e1, e2) => e2.value.compareTo(e1.value)));
//
//   sortedByTotal.forEach((key, value) {
//     result.add(TransactionListSeparator(
//         leadingTitle: key,
//         trailingTitle: formatAmount(value, baseCurrency!),
//   ));
//
//     entities.forEach((entity) {
//       if (entity.category.name == key) {
//         result.add(TransactionListItem(entity: entity));
//       }
//     });
//   });
//
//   return result;
// }

}
}
</script>

<style scoped>

</style>
