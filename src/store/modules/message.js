import _ from 'lodash';

const state = {
  message: {},
};

const mutations = {
  put: function(state, message) {
    state.message = message;
  },

  unset: function(state) {
    state.message = {};
  },

  clear: function(state) {
    state.message = {};
  },
};

const actions = {
  put: function(context, message) {
    context.commit('put', message);
  },

  unset: function(context) {
    context.commit('unset');
  },

  clear: function(context) {
    context.commit('clear');
  },
};

const getters = {
  get: (state, getters, rootState, rootGetters) => state.message,

  has: (state, getters, rootState, rootGetters) => Object.keys(state.message).length > 0,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
