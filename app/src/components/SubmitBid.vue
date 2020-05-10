<template>
  <form class="flex flex-col" @submit.prevent="submitBid">
    <label
      for="bidValue"
      v-if="bidBlocker && bid.value == 0"
      class="cursor-pointer my-2 text-red-600"
    >Please select a bid increment</label>

    <label v-else for="bidValue" class="cursor-pointer my-2">Select a bid increment</label>

    <div class="mb-4">
      <select
        id="bidValue"
        v-model="bid.value"
        required
        class="appearance-none border px-4 py-3 w-full text-lg"
        style="-webkit-appearance: none"
      >
        <option value="0">Click to select</option>
        <option
          :value="increment"
          v-for="(increment, index) in bidIncrements"
          :key="index"
        >+ £{{ increment}}</option>
      </select>
    </div>

    <div v-if="error" class="bg-red-500 text-white p-4">{{ error }}</div>

    <button
      type="button"
      v-if="bid.value == 0"
      @click="bidBlocker = !bidBlocker"
      v-palette
      class="btn btn--primary flex flex-col shadow-md items-center"
    >
      <span class="text-gray-400 text-sm">Place a bid for:</span>
      <span class="text-2xl font-bold">Select a bid amount</span>

      <small>You can review before submitting</small>
    </button>

    <div v-else class>
      <button
        v-if="!showConfirm"
        v-palette
        class="btn btn--primary flex flex-col rounded shadow-md justify-center items-center"
        type="button"
        @click="showConfirm = true"
      >
        <span class="text-gray-400 text-sm">Place a bid for:</span>
        <span class="text-2xl font-bold">£{{ bidValue }}</span>

        <small>You can review before submitting</small>
      </button>

      <div v-else v-palette class="panel panel--primary flex flex-col justify-center items-center">
        <span class="text-gray-400 text-sm">You are about to submit a bid for:</span>

        <span class="text-2xl font-bold text-white mb-4">£{{ bidValue }}</span>

        <div class="flex items-center justify-between w-full">
          <button v-palette class="btn btn--success flex-1 mr-2">Confirm bid</button>

          <button
            type="button"
            @click="showConfirm = false"
            v-palette
            class="btn btn--default flex-1 ml-2"
          >Cancel</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import bidIncrements from "@/lib/bidIncrements";

export default {
  data() {
    return {
      bidBlocker: false,
      bid: {
        value: 0
      },
      error: "",
      showConfirm: false
    };
  },

  computed: {
    auction() {
      return this.$store.getters.auction(this.$route.params.id);
    },

    bidIncrements() {
      return bidIncrements;
    },

    bidValue() {
      const bidValue = this.auction.currentBid.value
        ? this.auction.currentBid.value
        : this.auction.startAmount;

      return bidValue + this.bid.value;
    }
  },

  methods: {
    submitBid() {
      try {
        this.$store.dispatch("submitBid", {
          id: this.$route.params.id,
          value: this.bidValue
        });

        this.showConfirm = false;
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>
