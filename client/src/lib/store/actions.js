import auctionFactory from "@/lib/auctionFactory";
import authFactory from "@/lib/authFactory";
import xhrFactory from "@/lib/xhrFactory";

const actions = {
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
}

export default actions
