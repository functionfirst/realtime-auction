<template>
  <div class="p-4 md:p-8">
    <h1 class="text-2xl font-thin text-center mb-6">
      {{ auction.name }}
    </h1>

    <p class="leading-loose">
      {{ auction.description }}
    </p>

    <div class="flex flex-col items-center">
      <p class="uppercase text-xs flex flex-col items-center mb-4">
        Time Remaining
      </p>

      <auction-timer
        class="text-2xl"
        :auction="auction"
      />

      <p class="text-gray-700">
        Auction ends on
        {{ auction.endDate | formatDate }}
        at
        {{ auction.endDate | formatDate('hh:mma') }}
      </p>
    </div>

    <div
      v-if="auction.currentBid.value"
      class="p-4 bg-green-300 text-center"
    >
      <div>Highest Bid</div>
      £{{ auction.currentBid.value }}
    </div>

    <div v-else>
      <p class="text-center font-medium my-6">
        This auction currently has no bids
      </p>

      <div class="text-center">
        Bidding for this auction will start at
        <div class="font-bold text-xl">
          £{{ auction.startAmount }}
        </div>
      </div>
    </div>

    <SubmitBid />
  </div>
</template>

<script>
import SubmitBid from "@/components/SubmitBid";
import { formatDate } from "@/lib/dates";

export default {
  components: {
    AuctionTimer: () => import("@/components/AuctionTimer"),
    SubmitBid
  },

  filters: {
    formatDate
  },

  data() {
    return {
      loading: true,
      bid: {
        value: 0
      }
    };
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
