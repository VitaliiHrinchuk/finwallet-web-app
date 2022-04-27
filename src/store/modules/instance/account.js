import { getField, updateField } from 'vuex-map-fields';

let initialState = {
    loading: false,
    instance: {
        name: null,
        amount: null,
        currency: null,
        hexColor: null
    }
};

const state = () => ({
    ...initialState,
});

const getters = {
    getField,
};

const actions = {};

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
