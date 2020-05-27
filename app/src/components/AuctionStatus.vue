<template>
  <div
    v-if="auction"
    class="text-sm mt-2"
  >
    <div v-if="hasStarted && !hasFinished">
      <span class="bg-green-300 rounded px-2 py-1">Live</span>
      This auction started at {{ auction.startDate | formatDate("hh:mma MMM dd, yyyy") }}
    </div>

    <div v-else-if="hasFinished">
      <span class="bg-red-300 rounded px-2 py-1">Expired</span>
      This auction ended at {{ auction.endDate | formatDate("hh:mma MMM dd, yyyy") }}
    </div>

    <div v-else-if="!hasStarted">
      Auction starts at {{ auction.startDate | formatDate("hh:mma MMM dd, yyyy") }}
    </div>
  </div>
</template>

<script>
import { differenceInSeconds } from "date-fns";
import { formatDate } from "@/lib/filters";

export default {
  filters: {
    formatDate
  },

  props: {
    auction: {
      default: () => {},
      required: true,
      type: Object
    }
  },

  computed: {
    hasStarted() {
      return differenceInSeconds(new Date(), this.auction.startDate) > 0;
    },

    hasFinished() {
      return differenceInSeconds(new Date(), this.auction.endDate) > 0;
    }
  }
};
</script>
