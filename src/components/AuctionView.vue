<template>
  <div class="p-8">
    <h1 class="text-2xl font-thin text-center mb-6">{{ auction.name }}</h1>
    <p class="leading-loose">{{ auction.description }}</p>
    <p>Start Date: {{ auction.start_date }}</p>
    <p>End Date: {{ auction.end_date }}</p>

    <div
      v-if="auction.current_bid.value"
      class="p-4 bg-green-300 text-center"
    >Current Bid is....£{{ auction.current_bid.value }}</div>

    <div v-else>
      <p class="text-center font-medium my-6">This auction currently has no bids</p>

      <div class="text-center">
        Bidding for this auction will start at
        <div class="font-bold text-xl">£{{ auction.start_amount }}</div>
      </div>
    </div>

    <SubmitBid :auction="auction" :event-name="eventName" @updateAuction="updateAuction" />
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
    auction() {
      return this.$store.getters.auction(this.$route.params.id);
    }
  },

  created() {
    this.$store.dispatch("getAuction", this.$route.params.id);
  }
};
</script>
