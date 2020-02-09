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

    <form v-if="user.token" class="flex flex-col" @submit.prevent="submitBid">
      <label for="bidValue" class="cursor-pointer mb-2">Submit a Single Bid</label>

      <div class="mb-4">
        <input id="bidValue" type="text" v-model="bid.value" class="border px-3 py-2 w-full" />
      </div>

      <button class="flex flex-col items-center bg-blue-400 p-3">
        Place Bid
        <span>£{{ bid.value }}</span>

        <small>You can review before submitting</small>
      </button>
    </form>

    <p v-else class="font-bold">You must be logged in to submit a bid</p>

    <!-- <p>{{ auction.enabled }}</p> -->
    <!-- <p>{{ auction.countdown }}</p> -->
    <!-- <p>{{ auction.bids }}</p> -->
    <!-- <p>{{ auction.autobids }}</p> -->
    <BidHistory :bids="auction.bids" />
  </div>
</template>

<script>
import { xhrFactory } from "@/lib/xhrFactory";
import { auctionFactory } from "@/lib/auctionFactory";
import BidHistory from "@/components/BidHistory";

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
  },

  sockets: {
    "bid:send": function(data) {
      console.log("bid:send", data);
    }
  },

  computed: {
    token() {
      return this.$store.state.user.token;
    },

    user() {
      return this.$store.state.user;
    }
  },

  methods: {
    async submitBid() {
      const bid = {
        ...this.user,
        value: this.bid.value
      };

      const response = await auctionFactory(xhrFactory(this.token)).bid(
        this.$route.params.id,
        bid
      );

      if (response.success) {
        this.$socket.client.emit("bid:send", response.auction);
      }
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
