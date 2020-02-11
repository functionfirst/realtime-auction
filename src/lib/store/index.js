import Vue from 'vue'
import Vuex from 'vuex'
import auctionFactory from "@/lib/auctionFactory";
import authFactory from '@/lib/authFactory';
import xhrFactory from "@/lib/xhrFactory";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {},
    auctions: []
  },

  actions: {
    async getAuction({ dispatch, state }, id) {
      const auction = await auctionFactory(xhrFactory(state.user.token)).get(id);

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

        const eventName = `bid_send_${auction.id}`

        dispatch("updateAuction", auction);

        console.log("emit event", eventName, auction);
        this._vm.$socket.client.emit(eventName, auction);
      } catch (err) {
        // @todo throw this out as a visible message to the user
        // console.log(err.message);
        throw new Error(err.message);
        // throw err;
        // throw new Error('Something went wrong here....')
      }
    },

    updateAuction({ state }, auction) {
      console.log('update auction')
      // let auctions = state.auctions
      console.log(auction);
      const index = state.auctions.findIndex(item => item.id === auction.id)

      console.log(state.auctions);
      console.log(index);
      Vue.set(state.auctions[index], auction)

      // auctions.splice(index, 1, auction);

      // commit('auctions', auctions)
    },

    async getAuctions({ state, commit }) {
      const auctions = await auctionFactory(xhrFactory(state.user.token)).all()
      commit('auctions', auctions);
    },

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

  getters: {
    auction: state => id => state.auctions.find(auction => auction.id === id),

    auctionIndex: state => id => state.auctions.findIndex(auction => auction.id === id),

    isLoggedIn(state) {
      return state.user.token
    }
  },

  mutations: {
    user(state, user) {
      this.state.user = user
    },

    auctions(state, auctions) {
      this.state.auctions = auctions
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
