export default {
  fetchingData(state) {
    return state.fetchingData;
  },
  errors(state) {
    return state.errors;
  },

  listFetchingData(state) {
    return state.list.fetchingData;
  },
  listErrors(state) {
    return state.list.errors;
  },
  listData(state) {
    return state.list.data;
  },
  listParams(state) {
    return state.list.params;
  },

  createFetchingData(state) {
    return state.create.fetchingData;
  },
  createErrors(state) {
    return state.create.message;
  },
  getData(state) {
    return state.data;
  },

  updateFetchingData(state) {
    return state.update.fetchingData;
  },
  updateErrors(state) {
    return state.update.message;
  },

  listScrappArticle(state) {
    return state.scrapp.fetchingData;
  },

  categoriesFetchingData(state) {
    return state.categories.fetchingData;
  },
  listCategoriesErrors(state) {
    return state.categories.errors;
  },
  listCategoriesData(state) {
    return state.categories.data;
  },

  authorsFetchingData(state) {
    return state.authors.fetchingData;
  },
  listAuthorsErrors(state) {
    return state.authors.errors;
  },
  listAuthorsData(state) {
    return state.authors.data;
  },
};
