<template>
  <div class="p-8">
    <h1 class="text-2xl font-thin text-center mb-6">{{ auction.name }}</h1>
    <p class="leading-loose">{{ auction.description }}</p>
    <p>Start Date: {{ auction.start_date }}</p>
    <p>End Date: {{ auction.end_date }}</p>

    <div
      v-if="auction.current_bid"
      class="p-4 bg-green-300 text-center"
    >Current Bid is....£{{ auction.current_bid.value }}</div>
    <div v-else>
      <p class="text-center font-medium my-6">This auction currently has no bids</p>

      <div class="text-center">
        Bidding for this auction will start at
        <div class="font-bold text-xl">£{{ auction.start_amount }}</div>
      </div>
    </div>

    <SubmitBid :auction="auction" :event-name="eventName" />
  </div>
</template>

<script>
import { xhrFactory } from "@/lib/xhrFactory";
import { auctionFactory } from "@/lib/auctionFactory";
import SubmitBid from "@/components/SubmitBid";

export default {
  data() {
    return {
      loading: true,
      auction: {},
      bid: {
        value: 0
      }
    };
  },

  components: {
    SubmitBid
  },

  computed: {
    eventName() {
      return `bid_send_${this.auction.id}`;
    },

    token() {
      return this.$store.state.user.token;
    }
  },

  methods: {
    receivedBid(payload) {
      console.log("event received", this.eventName);
      console.log(payload);
    },

    registerSocket() {
      // console.log("register socket", this.eventName);
      this.$socket.$subscribe(this.eventName, this.receiveBid);
    },

    async getAuction() {
      const auction = await auctionFactory(xhrFactory(this.token)).get(
        this.$route.params.id
      );

      if (auction) {
        this.auction = auction;
        this.loading = false;
      }
    }
  },

  beforeDestroy() {
    this.$socket.$unsubscribe(this.eventName);
  },

  created() {
    this.getAuction();
  },

  watch: {
    auction() {
      if (this.auction) {
        this.registerSocket();
      }
    }
  }
};
</script>
