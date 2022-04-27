import { getField, updateField } from 'vuex-map-fields';

let initialState = {
    loading: false,

};

const state = () => ({
    ...initialState,
});

const getters = {
    getField,
};

const actions = {

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
