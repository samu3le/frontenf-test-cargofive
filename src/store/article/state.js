export default {
  fetchingData: false,
  errors: null,
  data: {},
  create: {
    fetchingData: false,
    message: null,
    errors: {

    },
  },
  update: {
    fetchingData: false,
    message: null,
    errors: {

    },
  },
  list: {
    fetchingData: false,
    errors: null,
    data: {
      // example response backend
      page: 0,
      current_page: 0,
      per_page: 10,
      last_page: 1,
      next_page: 1,
      prev_page: null,
      data: [

      ],
    },
    params: {
      // Example of what the backend expects
      page: 1,
      per_page: 10,
      sort_by: "created_at",
      sort: "desc",
      filter: "",
      filter_by: "",
    },
  },
  scrapp: {
    fetchingData: false,
    errors: null,
    data: {
      // example response backend
      data: [

      ],
    },
  },
  categories: {
    fetchingData: false,
    errors: null,
    data: {

      data: [

      ],
    },
  },
  authors: {
    fetchingData: false,
    errors: null,
    data: {

      data: [

      ],
    },
  },

};
