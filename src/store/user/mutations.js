import * as types from './types'

export default {
    [types.LIST_SET_PARAMS](state, params) {
        state.list.params = {
            ...state.list.params,
            ...params,
        }
    },
    [types.LIST_FETCH_REQUEST](state) {
        state.list.fetchingData = true
        state.list.errors = null
    },
    [types.LIST_FETCH_SUCCESS](state, { users }) {
        state.list.fetchingData = false
        state.list.errors = null
        state.list.data = users.data
    },
    [types.LIST_FETCH_FAILURE](state, { errors }) {
        state.list.fetchingData = false
        state.list.errors = errors
    },

    [types.CREATE_FETCH_REQUEST](state) {
        state.create.fetchingData = true
        state.create.errors = null
    },
    [types.CREATE_FETCH_SUCCESS](state, { data }) {
        state.create.fetchingData = false
        state.create.errors = null
        state.create.data = data
    },
    [types.CREATE_FETCH_FAILURE](state, { errors }) {
        state.create.fetchingData = false
        state.create.errors = errors
    },

    [types.STATE_CHANGE_FETCH_REQUEST](state) {
        state.create.fetchingData = true
        state.create.errors = null
    },
    [types.STATE_CHANGE_FETCH_SUCCESS](state, { data }) {
        state.create.fetchingData = false
        state.create.errors = null
        state.create.data = data
    },
    [types.STATE_CHANGE_FETCH_FAILURE](state, { errors }) {
        state.create.fetchingData = false
        state.create.errors = errors
    },

    [types.UPDATE_FETCH_REQUEST](state) {
        state.update.fetchingData = true
        state.update.errors = null
    },
    [types.UPDATE_FETCH_SUCCESS](state, { data }) {
        state.update.fetchingData = false
        state.update.errors = null
        state.update.data = data
    },
    [types.UPDATE_FETCH_FAILURE](state, { errors }) {
        state.update.fetchingData = false
        state.update.errors = errors
    },
}
