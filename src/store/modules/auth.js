import _ from 'lodash';
import api from '../../api';
import router from '../../router';

const state = {
  token: localStorage.getItem('token') || null,
  //refresh_token: localStorage.getItem('refresh_token') || null,
  expires_at: localStorage.getItem('expires_at'),
  authenticated: !!localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')),
  attempting: false,
  errors: false,
};

const getters = {
  id: (state) => _.get(state, 'user.id', null),
  email: (state) => _.get(state, 'user.email', null),
  baseCurrency: (state) => _.get(state, 'user.baseCurrency', null)
};

const actions = {
  login(context, payload) {
    context.commit('attempt');
    context.commit('errors/clear', null, { root: true });

    //    let provider = payload.provider;
    let promise = null;

    let credentials = {
      email: _.get(payload, 'email', null),
      password: _.get(payload, 'password', null),
    };

    promise = api.auth.login(credentials);


    return promise
      .then((response) => {
        let user = response.data;
        context.commit('applyAttempt', false);
        context.commit('login', user);
        context.dispatch(
          'message/put',
          {
            type: 'success',
            text: 'You successfully logged in',
          },
          { root: true }
        );
        router.replace({ name: 'home' });
        context.dispatch('iam');
      })
      .catch(() => {
        context.commit('applyAttempt', false);

        context.commit('fail');
      });
  },
  register(context, payload) {
    context.commit('applyAttempt', true);
    context.commit('errors/clear', null, { root: true });

    let promise = null;

    let credentials = {
      email: _.get(payload, 'email', null),
      password: _.get(payload, 'password', null),
      name: _.get(payload, 'name', null),
    };

    promise = api.user.register(credentials);

    return promise
      .then((response) => {
        context.commit('applyAttempt', false);
        context.dispatch(
          'message/put',
          {
            type: 'success',
            text: 'New User successfully registered',
          },
          { root: true }
        );
      })
      .catch(() => {
        context.commit('applyAttempt', false);
        context.commit('fail');
      });
  },

  attempting(context, status) {
    context.commit('attempting', status);
  },
  logout(context) {

    context.commit('logout');

  },
  iam(context) {
    context.commit('applyAttempt', true);
    return api.user
      .iam()
      .then(({ data }) => {
        context.commit('applyUserData', data);
        context.commit('applyAttempt', false);
      })
      .catch((e) => {
        context.commit('applyAttempt', false);
      });
  },
};

const mutations = {
  attempt(state, response) {
    state.authenticated = false;
    state.attempting = true;

    state.user = null;
    state.token = null;
    //  state.refresh_token = null;
    state.expires_at = null;
  },

  login(state, user) {
    state.authenticated = true;
    state.attempting = false;

    state.token = user.access_token;
    state.expires_at = user.expires_at;

    localStorage.setItem('token', state.token);
    //  localStorage.setItem('refresh_token', state.refresh_token);
    localStorage.setItem('expires_at', state.expires_at);
  },

  fail(state, errors) {
    state.authenticated = false;
    state.attempting = false;

    state.user = null;
    state.token = null;
    // state.refresh_token = null;
    state.expires_at = null;
  },

  logout(state) {
    state.authenticated = false;
    state.attempting = false;

    state.user = null;
    state.token = null;
    //  state.refresh_token = null;
    state.expires_at = null;

    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_at');

    // Let's redirect back to home page in some cases...
    let requiresAuth = _.get(router.app.$route, 'meta.auth', false);
    router.replace({ name: 'login.index' });

    // And dont't forget to clear data from previous session in each module...
  },
  // refreshToken(state, data) {
  //   state.token = data.token;
  //   state.refresh_token = data.refresh_token;
  //   state.expires_at = data.expires_at;

  //   localStorage.setItem('token', state.token);
  //   localStorage.setItem('refresh_token', state.refresh_token);
  //   localStorage.setItem('expires_at', state.expires_at);
  // },
  applyAttempt(state, status) {
    state.attempting = status;
  },
  applyUserData(state, user) {
    localStorage.setItem('user', JSON.stringify(user));
    state.user = user;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
