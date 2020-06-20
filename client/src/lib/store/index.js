import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
});

export {
  store
}
