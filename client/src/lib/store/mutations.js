const mutations = {
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
}

export default mutations
