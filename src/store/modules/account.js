import _ from 'lodash';
import api from '../../api';
import { getField, updateField } from 'vuex-map-fields';

let initialState = {
    list: [],
    query: {},
    loading: false,
};

const state = () => ({
    ...initialState,
});

const getters = {
    getField,
};

const actions = {
    async fetch({ commit }) {
        try {
            commit('setLoading', true);

            const response  = await api.account.browse(state.query);

            commit('setLoading', false);
            commit('applyFetchedList', response.data.data);
        } catch (error) {
            commit('setLoading', false);
            console.log(error);
        }
    },

    clearData(context) {
        context.commit('applyClearData');
    },

};

const mutations = {
    updateField,
    setLoading(state, status) {
        state.loading = status;
    },
    applyFetchedList(state, list) {
        state.list = list;
    },

};
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
