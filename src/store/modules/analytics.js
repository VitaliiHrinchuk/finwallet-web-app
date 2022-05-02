import _ from 'lodash';
import api from '../../api';
import { getField, updateField } from 'vuex-map-fields';
import instance from "./instance/account";
import moment from "moment";

let initialState = {
    query: {

        transactionType: 'CRE'
    },
    date: null,
    category: null,
    loading: false,
};

const state = () => ({
    ...initialState,
});

const getters = {
    getField,
    monthly(state) {
        return _.get(state, 'date', []) || [];
    }
};

const actions = {
    async fetch({ commit, state }, query) {
        try {
            commit('setLoading', true);

            const response  = await api.analytics.fetch(query);

            commit('setLoading', false);
            // commit('applyFetched', {
            //     type,
            //     data: response.data.data
            // });

            return response.data.data;
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
    applyFetched(state, payload) {
        state[payload.type] = payload.data;
    },
    setLoading(state, status) {
        state.loading = status;
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
