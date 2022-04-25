<template>
  <v-layout fill-height justify-center align-center class="white">
    <v-form ref="form" v-model="valid" lazy-validation style="min-width:500px">
      <div class="text-center">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <h1 class="text-center">Login</h1>
      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          required
          type="password"
      ></v-text-field>
      <div class="text-center">
        <v-btn block :disabled="!valid" :loading="loading" color="primary" @click="submit">
          Login
        </v-btn>
      </div>
    </v-form>

  </v-layout>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
  name: 'AuthLogin',
  data() {
    return {
      valid: true,
      password: '',
      passwordRules: [(v) => !!v || 'Password is required'],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    };
  },
  methods: {
    ...mapActions('auth', {
      login: 'login',
    }),
    submit() {

      let valid = this.$refs.form.validate();
      if (!valid) return;
      this.login({
        email: this.email,
        password: this.password,
      });
    },
  },
  computed: {
    ...mapState('auth', {
      loading: 'attempting',
    }),
  },
};
</script>

<style lang="scss" scoped></style>
