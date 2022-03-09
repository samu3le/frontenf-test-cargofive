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

    listParams: computed(() => store.getters[`${module}/listParams`]),
    setParams: (e) => store.dispatch(`${module}/setParams`, e),

    createFetchingData: computed(() => store.getters[`${module}/createFetchingData`],),
    createErrors: computed(() => store.getters[`${module}/createErrors`]),
    create: (e) => store.dispatch(`${module}/create`, e),

    updateFetchingData: computed(() => store.getters[`${module}/updateFetchingData`],),
    updateErrors: computed(() => store.getters[`${module}/updateErrors`]),
    update: (e) => store.dispatch(`${module}/update`, e),

    findOne: (e) => store.dispatch(`${module}/find`, e),
    setStateChange: (e) => store.dispatch(`${module}/state_change`, e),

    setFetchingData: (e) => store.dispatch(`${module}/setFetchingData`, e),
  };
};
