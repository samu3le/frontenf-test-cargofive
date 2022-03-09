import { createStore, createLogger } from "vuex";

import config from "./config";
import auth from "./auth";
import user from "./user";
import article from "./article";

import { debug } from "@/helpers/getVars.js";

export default createStore({
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  modules: {
    config,
    auth,
    user,
    article,
  },
});
