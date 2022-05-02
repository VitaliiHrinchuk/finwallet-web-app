import api from '../../api';
import { getField, updateField } from 'vuex-map-fields';
import instance from './instance/transaction';
import _ from "lodash";

let initialState = {
    data: [],
    query: {
        limit: 999
    },
    loading: false,
};

const state = () => ({
    ...initialState,
});

const getters = {
    getField,
    entities(state) {
        return _.get(state, 'data', []) || [];
    }
};

const actions = {
    async fetch({ commit, state }) {
        try {
            commit('setLoading', true);

            const response  = await api.transaction.browse(state.query);
            console.log('len!', response.data)
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
    applyFetchedList(state, data) {
        state.data = [...data];
    },

};
const modules = {
    instance: instance,
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
    modules
};
