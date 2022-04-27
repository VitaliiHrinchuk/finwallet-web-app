<template>
  <v-layout fill-height column justify-center class="container background">
    <v-sheet max-width="800" width="100%" class="pa-2" color="background">
      <div class="d-flex align-center justify-space-around">
        <div>
          <h1>Accounts</h1>
          <div class="subtitle-2"> All your accounts</div>
        </div>
        <v-btn  class="ml-auto" color="primary" @click="isEditForm = true">
          <v-icon left>
            mdi-plus
          </v-icon>
          Create New
        </v-btn>
      </div>
    </v-sheet>
    <v-card max-width="800" width="100%" class="mx-auto " elevation="0">

      <v-list subheader class="w-100" v-for="(account , i) in list" :key="account.id">
        <v-list-item>
          <v-list-item-avatar>
            <v-icon
                dark
                :color="'#' + account.hexColor"
            >
              mdi-circle
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="account.name"></v-list-item-title>

            <v-list-item-subtitle v-text="formatAmount(account)"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <div class="d-flex">
              <v-btn icon @click="() => editAccount(account)">
                <v-icon color="primary">mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="() => attemptRemoveAccount(account)">
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </div>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
    <account-edit-dialog :isEdit="isEdit" :show="isEditForm" @close="isEditForm = false" v-model="accountInstance" @save="submitAccountSave"  />
    <confirm-dialog
        :dialog="deleteConfirmation"
        title="Delete account"
        text="Are you sure you want to delete this account?"
        @confirm="() => remove(selectedAccount.id)"
        @close="deleteConfirmation = false"
    />
  </v-layout>
</template>

<script>
import {mapActions, mapState} from "vuex";
import formatAmountAndCurrency from '../../utils/formatAmountAndCurrency';
import AccountEditDialog from "../../components/account/AccountEditDialog";
import { createHelpers } from 'vuex-map-fields';
import ConfirmDialog from "../../components/common/ConfirmDialog";

const { mapFields } = createHelpers({
  getterType: 'account/instance/getField',
  mutationType: 'account/instance/updateField',
});

export default {
  name: "AccountsList",
  components: {
    AccountEditDialog,
    ConfirmDialog
  },
  data() {
    return {
      isEditForm: false,
      deleteConfirmation: false,
      selectedAccount: null,
      isEdit: false
    }
  },
  computed: {
    ...mapState('account', {
      list: 'list'
    }),

    ...mapFields({
      accountInstance: 'instance'
    }),
  },
  methods: {
    formatAmount(account) {
      return formatAmountAndCurrency(account.amount, account.currency);
    },
    ...mapActions('account', {
      fetch: 'fetch',
      create: 'create',
      remove: 'remove',
      update: 'update'
    }),
    async submitAccountSave()  {
      if (this.isEdit) {
        await this.update({
          id: this.selectedAccount.id,
          instance: this.accountInstance
        });
        this.isEdit = false;
      } else {
        await this.create(this.accountInstance);
      }
      this.isEditForm = false;
    },
    attemptRemoveAccount(account) {
      this.selectedAccount = account;
      this.deleteConfirmation = true;
    },
    editAccount(account) {
      this.selectedAccount = account;
      this.accountInstance = {
        name: account.name,
        amount: account.amount,
        hexColor: '#' + account.hexColor,
        currency: account.currency
      };
      this.isEditForm = true;
      this.isEdit = true;
    }
  },
  created() {
    this.fetch();
  }
}
</script>

<style scoped>

</style>
