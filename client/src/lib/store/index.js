import Vue from 'vue'
import Vuex from 'vuex'
import auctionFactory from "@/lib/auctionFactory";
import authFactory from '@/lib/authFactory';
import xhrFactory from "@/lib/xhrFactory";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    nav: false,
    user: null,
    auctions: []
  },

  actions: {
    async getAuction({ dispatch, state }, id) {
      const auction = await auctionFactory(xhrFactory()).get(id);

      dispatch('updateAuction', auction);
    },

    async submitBid({ dispatch, state }, { id, value }) {
      const bid = {
        userid: state.user.userid,
        name: state.user.name,
        value
      };

      try {
        const auction = await auctionFactory(xhrFactory(state.user.token)).bid(id, bid);
        dispatch("updateAuction", auction);
        this._vm.$socket.client.emit('newBid', auction)
      } catch (err) {
        // @todo throw this out as a visible message to the user
        // console.log(err.message);
        throw new Error(err.message);
        // throw err;
        // throw new Error('Something went wrong here....')
      }
    },

    socket_newBid({ commit, getters }, auction) {
      const index = getters.auctionIndex(auction.id);
      commit('UPDATE_AUCTION', { index, auction })
    },

    updateAuction({ commit, getters }, auction) {
      const index = getters.auctionIndex(auction.id)

      commit('UPDATE_AUCTION', { index, auction })
    },

    async getAuctions({ state, commit }) {
      const auctions = await auctionFactory(xhrFactory()).all()
      commit('auctions', auctions);
      return auctions
    },

    async login({ commit }, { email, password }) {
      const user = await authFactory(xhrFactory()).authenticate(email, password);
      commit('user', user)
      return user
    },

    async register({ commit }, credentials) {
      const user = await authFactory(xhrFactory()).register(credentials);

      commit('user', user)
      return user
    },

    toggleNav({ commit, state }) {
      commit('TOGGLE_NAV', !state.nav)
    },

    logout({ commit }) {
      commit('user', null)
    }
  },

  getters: {
    auction: state => id => state.auctions.find(auction => auction.id === id),

    auctionIndex: state => id => state.auctions.findIndex(auction => auction.id === id),

    isLoggedIn(state) {
      return state.user.token
    }
  },

  mutations: {
    user(state, user) {
      state.user = user
    },

    TOGGLE_NAV(state, payload) {
      state.nav = payload
    },

    UPDATE_AUCTION(state, { index, auction }) {
      state.auctions.splice(index, 1, auction);
    },

    auctions(state, auctions) {
      state.auctions = auctions
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
