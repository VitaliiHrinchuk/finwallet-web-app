<template>
  <v-layout class=" p-0" column>
    <home-header class="pb-10">
      <account-horizontal-list class="pb-5"></account-horizontal-list>
    </home-header>
    <v-sheet class="rounded-xl pa-5" color="white" style="margin-top: -35px" >
      <v-row align="center">
        <v-col cols="12">
          <div class="d-flex justify-center">
            <date-slider></date-slider>
          </div>
        </v-col>
        <v-col cols="6">hey</v-col>
      </v-row>
    </v-sheet>

  </v-layout>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import HomeHeader from "../components/home/HomeHeader";
import AccountHorizontalList from "../components/account/AccountHorizontalList";
import DateSlider from "../components/common/MonthSlider";
export default {
  name: 'Home',
  components: {
    DateSlider,
    HomeHeader,
    AccountHorizontalList
  },
  data() {
    return {

    };
  },
  computed: {

  },
  methods: {


  },
  created() {

  },
};
</script>
