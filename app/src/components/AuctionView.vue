<template>
  <div class="p-4 md:p-8">
    <h1 class="text-2xl font-thin text-center mb-6">
      {{ auction.name }}
    </h1>

    <p class="leading-loose">
      {{ auction.description }}
    </p>

    <p>
      Start Date: {{ auction.startDate }}
    </p>

    <p>
      End Date: {{ auction.endDate }}
    </p>

    <div
      v-if="auction.currentBid.value"
      class="p-4 bg-green-300 text-center"
    >
      Current Bid is....£{{ auction.currentBid.value }}
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

export default {
  components: {
    SubmitBid
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
