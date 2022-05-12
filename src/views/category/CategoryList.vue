<template>
  <v-layout fill-height column justify-center class="container background">
    <v-sheet max-width="800" width="100%" class="py-2 " color="background">
      <div class="d-flex align-center justify-space-around">
        <div>
          <h1>Categories</h1>
        </div>
        <v-btn class="ml-auto" color="primary" @click="isCategoryEditForm = true">
          <v-icon left>
            mdi-plus
          </v-icon>
          Create New
        </v-btn>
      </div>
    </v-sheet>
    <v-sheet max-width="800" color="transparent" class="mb-10">
      <v-row>
        <v-col cols="12">
          <div class="subtitle-2 ma-1"> Expense Categories</div>
          <div class="d-flex flex-wrap ">

            <v-card @click="" v-for="entity in creditCategories" :key="entity.id" class="ma-1">
              <v-sheet color="blue-grey darken-1" width="100" height="100"
                       class="text-center d-flex justify-center align-center">

                <div class="white--text subtitle-2 text-truncate pa-2">{{ entity.name }}</div>

              </v-sheet>
            </v-card>
          </div>
        </v-col>

        <v-col cols="12">
          <div class="subtitle-2 ma-1"> Income Categories</div>
          <div class="d-flex flex-wrap " >

            <v-card @click="" v-for="entity in debitCategories" :key="entity.id" class="ma-1">
              <v-sheet color="blue-grey darken-1" width="100" height="100"
                       class="text-center d-flex justify-center align-center">

                <div class="white--text subtitle-2 text-truncate pa-2">{{ entity.name }}</div>

              </v-sheet>
            </v-card>
          </div>
        </v-col>
      </v-row>

    </v-sheet>

    <v-sheet max-width="800" width="100%" class="pa-2 " color="background">
      <div class="d-flex align-center justify-space-around">
        <div>
          <h1>Tags</h1>
        </div>
        <v-btn class="ml-auto" color="primary" @click="isTagEditForm = true">
          <v-icon left>
            mdi-plus
          </v-icon>
          Create New
        </v-btn>
      </div>
    </v-sheet>

    <v-sheet max-width="800" color="transparent" class="mb-10">
      <div class="d-flex flex-wrap justify-space-around">
        <v-card @click="" v-for="entity in tags" :key="entity.id" class="ma-1">
          <v-sheet color="blue-grey darken-1" width="100" height="100"
                   class="text-center d-flex justify-center align-center">

            <div class="white--text subtitle-2 text-truncate pa-2">{{ entity.name }}</div>

          </v-sheet>
        </v-card>
      </div>
    </v-sheet>

    <category-edit-dialog :isEdit="isCategoryEdit"
                          :show="isCategoryEditForm"
                          @close="isCategoryEditForm = false"
                          v-model="categoryInstance"
                          @save="submitCategorySave"
    />

    <tag-edit-dialog :isEdit="isTagEdit"
                          :show="isTagEditForm"
                          @close="isTagEditForm = false"
                          v-model="tagInstance"
                          @save="submitTagSave"
    />
    <!--    <confirm-dialog-->
    <!--        :dialog="deleteConfirmation"-->
    <!--        title="Delete account"-->
    <!--        text="Are you sure you want to delete this account?"-->
    <!--        @confirm="() => remove(selectedAccount.id)"-->
    <!--        @close="deleteConfirmation = false"-->
    <!--    />-->
  </v-layout>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import CategoryEditDialog from "../../components/category/CategoryEditDialog";
import {mapFields} from "vuex-map-fields";
import TagEditDialog from "../../components/tag/TagEditDialog";

export default {
  name: "CategoryList",
  components: {TagEditDialog, CategoryEditDialog},
  data() {
    return {
      isCategoryEditForm: false,
      isCategoryEdit: false,
      isTagEdit: false,
      isTagEditForm: false,
    }
  },
  computed: {
    ...mapGetters('category', {
      categories: 'entities'
    }),
    ...mapGetters('tag', {
      tags: 'entities'
    }),
    ...mapState('category', {
      loading: 'loading'
    }),
    ...mapFields('category/instance', {
      categoryInstance: 'form'
    }),
    ...mapFields('tag/instance', {
      tagInstance: 'form'
    }),
    creditCategories() {
      return this.categories.filter(item => item.categoryType == 'CRE');
    },
    debitCategories() {
      return this.categories.filter(item => item.categoryType == 'DEB');
    }
  },
  methods: {
    ...mapActions('category', {
      fetchCategories: 'fetch'
    }),
    ...mapActions('category/instance', {
      saveCategory: 'save',
      clearCategoryInstance: 'clearData'
    }),
    ...mapActions('tag/instance', {
      saveTag: 'save',
      clearTagInstance: 'clearData'
    }),
    ...mapActions('tag', {
      fetchTags: 'fetch'
    }),
    async submitCategorySave() {
      await this.saveCategory();
      this.isCategoryEditForm = false;
      this.clearCategoryInstance();
      this.fetchCategories();
    },
    async submitTagSave() {
      await this.saveTag();
      this.isTagEditForm = false;
      this.clearTagInstance();
      this.fetchTags();
    }
  },
  created() {
    this.fetchCategories()
    this.fetchTags()
  }
}
</script>

<style scoped>

</style>
