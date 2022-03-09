import * as types from "./types";

import endpoint from "@/endpoint";

export default {
    setFetchingData({ commit }) {
        commit(types.LIST_FETCH_REQUEST);
    },
    setParams({ commit }, params) {
        commit(types.LIST_SET_PARAMS, params);
    },
    getList({ state, commit }) {
        commit(types.LIST_FETCH_REQUEST);

        return endpoint
            .get({
                url: `${types.route}/`,
                params: state.list.params,
            })
            .then(({ data }) => {
                commit(types.LIST_FETCH_SUCCESS, data);
                return data;
            })
            .catch((err) => {
                console.log("err", err);
                commit(types.LIST_FETCH_FAILURE, { err: err.errors });
                return Promise.reject(err);
            });
    },
    scrappArticles({ state, commit }) {
        commit(types.SCRAPP_FETCH_REQUEST);

        return endpoint
            .get({
                url: `scrapper`,
            })
            .then(({ data }) => {
                commit(types.SCRAPP_FETCH_SUCCESS, data);
                return data;
            })
            .catch((err) => {
                console.log("err", err);
                commit(types.SCRAPP_FETCH_FAILURE, { err: err.errors });
                return Promise.reject(err);
            });
    },
    getCategories({ state, commit }) {
        commit(types.CATEGORIES_FETCH_REQUEST);

        return endpoint
            .get({
                url: `categories`,
            })
            .then(({ data }) => {
                commit(types.CATEGORIES_FETCH_SUCCESS, data);
                return data;
            })
            .catch((err) => {
                console.log("err", err);
                commit(types.CATEGORIES_FETCH_FAILURE, { err: err.errors });
                return Promise.reject(err);
            });
    },
    getAuthors({ state, commit }) {
        commit(types.AUTHORS_FETCH_REQUEST);

        return endpoint
            .get({
                url: `${types.route}/authors`,
            })
            .then(({ data }) => {
                commit(types.AUTHORS_FETCH_SUCCESS, data);
                return data;
            })
            .catch((err) => {
                console.log("err", err);
                commit(types.AUTHORS_FETCH_FAILURE, { err: err.errors });
                return Promise.reject(err);
            });
    },
    getListByCategory({ state, commit }, { name }) {
        commit(types.LIST_FETCH_REQUEST);

        return endpoint
            .post({
                url: `categories/articles`,
                params: { name },
            })
            .then(({ data }) => {
                commit(types.LIST_FETCH_SUCCESS, data);
                return data;
            })
            .catch((err) => {
                console.log("err", err);
                commit(types.LIST_FETCH_FAILURE, { err: err.errors });
                return Promise.reject(err);
            });
    },
    getListByAuthor({ state, commit }, { author }) {
        commit(types.LIST_FETCH_REQUEST);

        return endpoint
            .post({
                url: `${types.route}/by_author`,
                params: { author },
            })
            .then(({ data }) => {
                commit(types.LIST_FETCH_SUCCESS, data);
                return data;
            })
            .catch((err) => {
                console.log("err", err);
                commit(types.LIST_FETCH_FAILURE, { err: err.errors });
                return Promise.reject(err);
            });
    },
};