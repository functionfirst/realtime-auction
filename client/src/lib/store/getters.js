const getters = {
  auction: state => id => state.auctions.find(auction => auction.id === id),

  auctionIndex: state => id => state.auctions.findIndex(auction => auction.id === id),

  isLoggedIn(state) {
    return state.user && state.user.token
  }
}

export default getters
