import { computed } from "vue";
import { useStore } from "vuex";

export default () => {
  const module = "article";

  const store = useStore();

  return {
    listFetchingData: computed(() => store.getters[`${module}/listFetchingData`],),
    listErrors: computed(() => store.getters[`${module}/listErrors`]),
    listData: computed(() => store.getters[`${module}/listData`]),
    getList: () => store.dispatch(`${module}/getList`),

    getListByCategory: (e) => store.dispatch(`${module}/getListByCategory`, e),

    getListByAuthor: (e) => store.dispatch(`${module}/getListByAuthor`, e),

    scrappArticles: () => store.dispatch(`${module}/scrappArticles`),
    listScrappArticle: computed(() => store.getters[`${module}/listScrappArticle`],),

    categoriesFetchingData: computed(() => store.getters[`${module}/categoriesFetchingData`],),
    listCategoriesErrors: computed(() => store.getters[`${module}/listCategoriesErrors`]),
    listCategoriesData: computed(() => store.getters[`${module}/listCategoriesData`]),
    getCategories: () => store.dispatch(`${module}/getCategories`),

    authorsFetchingData: computed(() => store.getters[`${module}/authorsFetchingData`],),
    listAuthorsErrors: computed(() => store.getters[`${module}/listAuthorsErrors`]),
    listAuthorsData: computed(() => store.getters[`${module}/listAuthorsData`]),
    getAuthors: () => store.dispatch(`${module}/getAuthors`),
  };
};
