<template>
  <div>
    <div
      v-if="auctions"
      class="mt-6 mb-12 max-w-2xl mx-auto"
    >
      <ul>
        <li
          v-for="(auction, _id) in auctions"
          :key="_id"
          class="mb-4"
        >
          <router-link
            v-if="auction.path"
            :to="auction.path"
            class="rounded-lg shadow-sm bg-white block p-4 hover:shadow-md"
          >
            {{ auction.name }}
            <AuctionTimer :auction="auction" />
            <AuctionStatus :auction="auction" />

            <div v-if="auction.currentBid.value">
              Highest bid<br>
              £{{ auction.currentBid.value }}
            </div>
          </router-link>
        </li>
      </ul>
    </div>

    <div
      v-else
      class="bg-gray-200 border-b border-gray-300 flex items-center justify-center"
    >
      <div class="max-w-2xl mx-auto text-center leading-loose py-12">
        <div class="flex justify-center items-center">
          <img
            src="@/assets/icons/auction.svg"
            width="100"
          >
        </div>

        <h1 class="text-3xl font-thin text-center mb-4">
          No auctions available
        </h1>

        <p>
          Sorry, we were unable to find any currently active auctions at this time.
        </p>

        <p>
          Please check back in a while for updates.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AuctionStatus from "@/components/AuctionStatus";
import AuctionTimer from "@/components/AuctionTimer";
import { isAfter, subWeeks } from "@/lib/dates";

export default {
  components: {
    AuctionStatus,
    AuctionTimer
  },

  computed: {
    filter() {
      return this.$route.params.filter;
    },

    auctions() {
      let auctions = this.$store.state.auctions;

      if (this.filter) {
        auctions = auctions.filter(this[this.filter]);
      }

      return auctions;
    }
  },

  mounted() {
    this.$store.dispatch("getAuctions");
  },

  methods: {
    featured(auction) {
      return auction.featured;
    },

    recent(auction) {
      const createdAt = new Date(auction.createdAt);
      const dateLimit = subWeeks(new Date(), 1);
      return isAfter(createdAt, dateLimit);
    }
  }
};
</script>
