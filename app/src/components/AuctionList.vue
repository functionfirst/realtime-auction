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
        >
          <router-link
            v-if="auction.path"
            :to="auction.path"
            class="border block p-4 hover:border-gray-400 hover:bg-gray-100"
          >
            {{ auction.name }}
            <AuctionTimer :auction="auction" />
            <AuctionStatus :auction="auction" />
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

export default {
  components: {
    AuctionStatus,
    AuctionTimer
  },

  computed: {
    auctions() {
      return this.$store.state.auctions;
    }
  },

  mounted() {
    this.$store.dispatch("getAuctions");
  }
};
</script>
