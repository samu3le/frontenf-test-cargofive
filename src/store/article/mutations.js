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
    [types.LIST_FETCH_SUCCESS](state, { articles }) {
        state.list.fetchingData = false
        state.list.errors = null
        state.list.data = articles
    },
    [types.LIST_FETCH_FAILURE](state, { errors }) {
        state.list.fetchingData = false
        state.list.errors = errors
    },

    [types.SCRAPP_FETCH_REQUEST](state) {
        state.scrapp.fetchingData = true
        state.scrapp.errors = null
    },
    [types.SCRAPP_FETCH_SUCCESS](state, { data }) {
        state.scrapp.fetchingData = false
        state.scrapp.errors = null
        state.scrapp.data = data
    },
    [types.SCRAPP_FETCH_FAILURE](state, { errors }) {
        state.scrapp.fetchingData = false
        state.scrapp.errors = errors
    },

    [types.CATEGORIES_FETCH_REQUEST](state) {
        state.categories.fetchingData = true
        state.categories.errors = null
    },
    [types.CATEGORIES_FETCH_SUCCESS](state, { categories }) {
        state.categories.fetchingData = false
        state.categories.errors = null
        state.categories.data = categories
    },
    [types.CATEGORIES_FETCH_FAILURE](state, { errors }) {
        state.categories.fetchingData = false
        state.categories.errors = errors
    },

    [types.AUTHORS_FETCH_REQUEST](state) {
        state.authors.fetchingData = true
        state.authors.errors = null
    },
    [types.AUTHORS_FETCH_SUCCESS](state, { authors }) {
        state.authors.fetchingData = false
        state.authors.errors = null
        state.authors.data = authors
    },
    [types.AUTHORS_FETCH_FAILURE](state, { errors }) {
        state.authors.fetchingData = false
        state.authors.errors = errors
    },

}
