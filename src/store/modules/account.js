import _ from 'lodash';
import api from '../../api';
import { getField, updateField } from 'vuex-map-fields';
import instance from "./instance/account";

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

            const response  = await api.account.browse(state.query);

            commit('setLoading', false);
            commit('applyFetchedList', response.data.data);
        } catch (error) {
            commit('setLoading', false);
            console.log(error);
        }
    },

    async create({ commit, dispatch }, instance) {
        try {
            const body = {
                ...instance,
                hexColor: instance.hexColor.replace('#', '')
            };
            commit('setLoading', true);

            await api.account.create(body);

            commit('setLoading', false);

            dispatch(
                'message/put',
                {
                    type: 'success',
                    text: 'Account Successfully created',
                },
                { root: true }
            );
            dispatch('fetch');
        } catch (error) {
            commit('setLoading', false);
            console.log(error);
        }
    },

    async update({ commit, dispatch }, { id, instance }) {
        try {
            const body = {
                name: instance.name,
                hexColor: instance.hexColor.replace('#', '')
            };
            commit('setLoading', true);

            await api.account.update(id, body);

            commit('setLoading', false);

            dispatch(
                'message/put',
                {
                    type: 'success',
                    text: 'Account Successfully Updated',
                },
                { root: true }
            );
            dispatch('fetch');
        } catch (error) {
            commit('setLoading', false);
            console.log(error);
        }
    },

    async remove({ commit, dispatch }, id) {
        try {
            commit('setLoading', true);

            await api.account.remove(id);

            commit('setLoading', false);

            dispatch(
                'message/put',
                {
                    type: 'success',
                    text: 'Account Successfully removed',
                },
                { root: true }
            );
            dispatch('fetch');
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
    actions,
    modules
};
