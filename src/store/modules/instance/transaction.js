import { getField, updateField } from 'vuex-map-fields';
import api from "../../../api";
import moment from "moment";

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
    async save({ commit, dispatch, state }) {
        try {
            const body = {
                ...state.form,
                date: moment(state.form.date, 'YYYY-MM-DD').toISOString()
            };
            commit('setLoading', true);

            await api.transaction.create(body);

            commit('setLoading', false);

            dispatch(
                'message/put',
                {
                    type: 'success',
                    text: 'Transaction Successfully created',
                },
                { root: true }
            );
        } catch (error) {
            commit('setLoading', false);
            throw error;
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
    applyClearData(state) {
        state.form = {
            ...state.form,
            categorySlug: null,
            amount: null,
            tags: [],
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString()
        }
    },
};


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
