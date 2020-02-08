import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {}
  },

  actions: {
    async login({ commit }, { username, password }) {
      const { data } = await axios.post('http://localhost:8888/api/authenticate', { username, password });

      commit('user', data.user)
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
