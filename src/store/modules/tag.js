import api from '../../api';
import { getField, updateField } from 'vuex-map-fields';
import _ from "lodash";
import instance from "./instance/tag";

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
    entities(state) {
        return _.get(state, 'list', []) || [];
    }
};

const actions = {
    async fetch({ commit }) {
        try {
            commit('setLoading', true);

            const response  = await api.tag.browse(state.query);

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
const modules = {
    instance: instance,
};
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    modules,
    actions,
};
