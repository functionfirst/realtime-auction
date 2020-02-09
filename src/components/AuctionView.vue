<template>
  <div class="p-8">
    <h1 class="text-2xl font-thin text-center mb-6">{{ auction.name }}</h1>
    <p class="leading-loose">{{ auction.description }}</p>
    <p>Start Date: {{ auction.start_date }}</p>
    <p>End Date: {{ auction.end_date }}</p>

    <div v-if="auction.bids && auction.bids.length"></div>

    <p class="text-center font-medium my-6" v-else>This auction currently has no bids</p>

    <div class="text-center">
      Bidding for this auction will start at
      <div class="font-bold text-xl">{{ auction.start_amount }}</div>
    </div>

    <SubmitBid :auction="auction" />

    <BidHistory :bids="auction.bids" />
  </div>
</template>

<script>
import { xhrFactory } from "@/lib/xhrFactory";
import { auctionFactory } from "@/lib/auctionFactory";
import BidHistory from "@/components/BidHistory";
import SubmitBid from "@/components/SubmitBid";

export default {
  data() {
    return {
      loading: true,
      auction: [],
      bid: {
        value: 0
      }
    };
  },

  components: {
    BidHistory,
    SubmitBid
  },

  sockets: {
    "bid:send": function(data) {
      console.log("bid:send", data);
      // Don't push to stack. Do something more robust here with auction data
      this.auction.bids.push(data.bid);
    }
  },

  computed: {
    token() {
      return this.$store.state.user.token;
    }
  },

  created() {
    auctionFactory(xhrFactory(this.token))
      .get(this.$route.params.id)
      .then(auction => {
        this.auction = auction;
        this.loading = false;
      });
  }
};
</script>
