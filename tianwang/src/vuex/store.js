import Vue from "vue";
import Vuex from "vuex";
import orgpermission from "./orgpermission.module";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    orgpermission
  }
});
