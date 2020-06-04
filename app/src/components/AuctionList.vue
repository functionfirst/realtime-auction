<template>
  <div>
    <div
      v-if="auctions"
      class="mt-6 mb-12"
    >
      <ul
        class="flex flex-wrap"
        role="list"
      >
        <li
          v-for="(auction, id) in auctions"
          :key="id"
          class="mb-4 md:w-1/3 lg:w-1/4"
        >
          <router-link
            v-if="auction.path"
            :to="auction.path"
            class="rounded m-2 overflow-hidden shadow-sm bg-white block hover:shadow-md"
          >
            <div class="relative">
              <AuctionStatus
                :auction="auction"
                class="absolute right-0 top-0 mt-2 mr-2"
              />

              <img
                :src="auction.image"
                :alt="auction.name"
              >

              <div class="flex items-center justify-center z-10 absolute mb-2 left-0 ml-2 bottom-0">
                <div class="bg-white px-3 py-2 rounded">
                  <AuctionTimer :auction="auction" />
                </div>
              </div>
            </div>

            <div class="p-4">
              {{ auction.name }}

              <template v-if="auction.currentBid.value">
                <p class="text-gray-700 text-sm mt-4">
                  Highest bid
                </p>
                <p class="text-xl">
                  £{{ auction.currentBid.value }}
                </p>
              </template>
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
