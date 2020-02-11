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
      class="flex flex-col shadow-md items-center text-white bg-gray-900 p-3 hover:bg-gray-800"
    >
      <span class="text-gray-400 text-sm">Place a bid for:</span>
      <span class="text-2xl font-bold">Select a bid amount</span>

      <small>You can review before submitting</small>
    </button>

    <div v-else class>
      <button
        v-if="!showConfirm"
        class="flex flex-col rounded shadow-md justify-center w-full shadow-md items-center text-white bg-gray-900 p-4 hover:bg-gray-800"
        type="button"
        @click="showConfirm = true"
      >
        <span class="text-gray-400 text-sm">Place a bid for:</span>
        <span class="text-2xl font-bold">£{{ bidValue }}</span>

        <small>You can review before submitting</small>
      </button>

      <div v-else class="p-4 bg-gray-800 z-10 flex flex-col justify-center items-center">
        <span class="text-gray-400 text-sm">You are about to submit a bid for:</span>

        <span class="text-2xl font-bold text-white mb-4">£{{ bidValue }}</span>

        <div class="flex items-center justify-between w-full">
          <button
            class="rounded shadow-md flex-1 mr-2 p-5 bg-green-400 hover:bg-green-300"
          >Confirm bid</button>

          <button
            type="button"
            @click="showConfirm = false"
            class="rounded shadow-md flex-1 ml-2 p-5 bg-gray-400 hover:bg-gray-300"
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
      const bidValue = this.auction.current_bid.value
        ? this.auction.current_bid.value
        : this.auction.start_amount;

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
