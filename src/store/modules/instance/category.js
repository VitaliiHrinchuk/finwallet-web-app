import { getField, updateField } from 'vuex-map-fields';
import api from "../../../api";
import moment from "moment";

let initialState = {
    loading: false,
    form: {
        name: null,
        type: 'CRE',
        id: null
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
            };
            commit('setLoading', true);

            if (state.form.id) {
                await api.category.update(state.form.id, body);
            } else {
                await api.category.create(body);
            }



            commit('setLoading', false);

            dispatch(
                'message/put',
                {
                    type: 'success',
                    text: 'Category Successfully saved',
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
            id: null,
            name: null,
            type: 'CRE'
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
