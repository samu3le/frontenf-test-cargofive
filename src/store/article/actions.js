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
    create({ commit }, {
        name,
        email,
        password,
        passwordConfirmation,
    }) {
        commit(types.CREATE_FETCH_REQUEST);

        return endpoint
            .post({
                url: `${types.route}/create`,
                params: {
                    name,
                    email,
                    password,
                    passwordConfirmation,
                },
            })
            .then(({ data }) => {
                commit(types.CREATE_FETCH_SUCCESS, data);
                return data;
            })
            .catch((err) => {
                console.log("err", err);
                commit(types.CREATE_FETCH_FAILURE, { err: err.errors });
                return Promise.reject(err);
            });
    },
    state_change({ commit }, { id, active }) {
        console.log(active, 'is_active Update');
        commit(types.STATE_CHANGE_FETCH_REQUEST);
        return endpoint
            .post({
                url: `${types.route}/update`,
                params: {
                    id,
                    is_active: active,
                },
            })
            .then(({ data }) => {
                commit(types.STATE_CHANGE_FETCH_SUCCESS, data);
                return data;
            })
            .catch((err) => {
                commit(types.STATE_CHANGE_FETCH_FAILURE, { err: err.errors });
                return Promise.reject(err);
            });
    },
    setData({ commit }, {
        created_at,
        created_by,
        deleted_at,
        id,
        image,
        is_active,
        key,
        name,
        stock,
        updated_at,
    }) {
        commit(types.SET_DATA, {
            created_at,
            created_by,
            deleted_at,
            id,
            image,
            is_active,
            key,
            name,
            stock,
            updated_at,
        });
    },
    update({ commit }, {
        id,
        name,
        password,
        passwordConfirmation }) {
        try {
            commit(types.UPDATE_FETCH_REQUEST);

            return endpoint
                .post({
                    url: `${types.route}/update`,
                    params: {
                        id: id,
                        name,
                        password,
                        passwordConfirmation,
                        is_active: true,
                    },
                })
                .then(({ data }) => {
                    commit(types.UPDATE_FETCH_SUCCESS, data);
                    return data;
                })
                .catch((err) => {
                    console.log("err", err);
                    commit(types.UPDATE_FETCH_FAILURE, { err: err.errors });
                    return Promise.reject(err);
                });
        } catch (error) {
            console.error(error, 'action Update');
        }

    },
};