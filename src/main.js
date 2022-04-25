import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router';
import store from './store';
import moment from 'moment';
import './scss/main.scss';

Vue.prototype.$moment = moment;

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),
  mounted() {
    if (!this.$store.state.auth.authenticated) {
      this.$router.replace({ name: 'login.index' });
    } else {
      this.$store.dispatch('auth/iam');
    }
  },
}).$mount('#app')
