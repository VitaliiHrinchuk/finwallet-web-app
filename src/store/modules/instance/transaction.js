import { getField, updateField } from 'vuex-map-fields';

let initialState = {
    loading: false,
    form: {
        accountId: null,
        currency: null,
        categorySlug: null,
        amount: null,
        type: "CRE",
        tags: [],
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString()
    }
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
};


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
