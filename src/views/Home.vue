<template>
  <v-layout class=" p-0">
    <HomeHeader>
      <AccountHorizontalList></AccountHorizontalList>
    </HomeHeader>
  </v-layout>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import HomeHeader from "../components/home/HomeHeader";
import AccountHorizontalList from "../components/account/AccountHorizontalList";
export default {
  name: 'Home',
  components: {
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
