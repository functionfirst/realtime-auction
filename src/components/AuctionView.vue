<template>
  <div class="border bg-gray-200 p-8">
    <h1 class="text-2xl font-thin text-center mb-6">{{ auction.name }}</h1>
    <p class="leading-loose">{{ auction.description }}</p>
    <p>Start Date: {{ auction.start_date }}</p>
    <p>End Date: {{ auction.end_date }}</p>

    <div v-if="auction.bids.length"></div>

    <p class="text-center font-medium my-6" v-else>This auction currently has no bids</p>

    <div class="text-center">
      Bidding for this auction will start at
      <div class="font-bold text-xl">{{ auction.start_amount }}</div>
    </div>

    <!-- <p>{{ auction.enabled }}</p> -->
    <!-- <p>{{ auction.countdown }}</p> -->
    <!-- <p>{{ auction.bids }}</p> -->
    <!-- <p>{{ auction.autobids }}</p> -->
  </div>
</template>

<script>
import { xhrFactory } from "@/lib/xhrFactory";
import { auctionFactory } from "@/lib/auctionFactory";

export default {
  data() {
    return {
      loading: true,
      auction: []
    };
  },

  created() {
    auctionFactory(xhrFactory())
      .get(this.$route.params.id)
      .then(auction => {
        this.auction = auction;
        this.loading = false;
      });
  }
};
</script>
