import Vue from 'vue'
import Vuex from 'vuex'
import authFactory from '@/lib/authFactory';
import xhrFactory from "@/lib/xhrFactory";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {}
  },

  actions: {

    async login({ commit }, { email, password }) {
      const data = await authFactory(xhrFactory()).authenticate(email, password);
      commit('user', data.user)
      return data
    },

    async register({ commit }, credentials) {
      const data = await authFactory(xhrFactory()).register(credentials);

      commit('user', data.user)
      return data
    },

    logout({ commit }) {
      commit('user', {})
    }
  },

  mutations: {
    user(state, user) {
      this.state.user = user
    },

    initialiseStore(state) {
      if (localStorage.getItem('store')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        );
      }
    }
  },
})

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
});

export {
  store
}
