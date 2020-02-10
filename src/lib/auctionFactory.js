import Auction from "@/models/auction";
import { apiHost } from '@/lib/env'

const auctionFactory = http => {
  return {
    get: get,
    all: all,
    create: create,
    update: update,
    bid: bid,
    delete: remove
  };

  // get single auction
  async function get(id, filter) {
    const { data } = await http.get(`${apiHost}/api/auctions/${id}`, { params: filter });
    return new Auction(data);
  }

  // get all auctions
  async function all() {
    const { data } = await http.get(`${apiHost}/api/auctions`);
    return data.map(auction => new Auction(auction));
  }

  // create an auction
  function create(auctionData) {
    return http.post(`${apiHost}/api/auctions`, auctionData);
  }

  // update auction
  function update(id, auctionData) {
    return http.put(`${apiHost}/api/auctions/${id}`, auctionData);
  }

  // submit a bid
  async function bid(id, bidData) {
    const { data } = await http.put(`${apiHost}/api/auctions/${id}/bid`, bidData);
    return data
  }

  // delete auction
  function remove(id) {
    return http.delete(`${apiHost}/api/auctions/${id}`);
  }
}

export default auctionFactory
