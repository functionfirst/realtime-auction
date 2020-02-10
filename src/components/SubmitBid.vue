<template>
  <form class="flex flex-col" @submit.prevent="submitBid">
    <label
      for="bidValue"
      v-if="bidBlocker"
      class="cursor-pointer my-2 text-red-600"
    >Please select an amount before Placing a bid</label>

    <label v-else for="bidValue" class="cursor-pointer my-2">Submit a Single Bid</label>

    <div class="mb-4">
      <select
        id="bidValue"
        v-model="bid.value"
        required
        class="appearance-none border px-4 py-3 w-full text-lg"
        style="-webkit-appearance: none"
      >
        <option value="0">Click to select a bid increment</option>
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

    <button
      v-else
      class="flex flex-col shadow-md items-center text-white bg-gray-900 p-3 hover:bg-gray-800"
    >
      <span class="text-gray-400 text-sm">Place a bid for:</span>
      <span class="text-2xl font-bold">£{{ bid.value }}</span>

      <small>You can review before submitting</small>
    </button>
  </form>
</template>

<script>
import { auctionFactory } from "@/lib/auctionFactory";
import { xhrFactory } from "@/lib/xhrFactory";
import bidIncrements from "@/lib/bidIncrements";

export default {
  props: {
    auction: {
      default: () => {},
      required: true,
      type: Object
    },

    eventName: {
      default: "",
      required: true,
      type: String
    }
  },

  data() {
    return {
      bidBlocker: false,
      bid: {
        value: 0
      },
    };
  },

  computed: {
    token() {
      return this.$store.state.user.token;
    },

    bidIncrements() {
      return bidIncrements;
    },

    }
  },

  methods: {
    checkBidAmount() {
      if (this.bid.value == 0) {
        this.bidBlocker = !this.bidBlocker;
        return false;
      }
      return true;
    },

    incrementValue(inc) {
      if (this.auction.current_bid.value) {
        return this.auction.current_bid.value + inc;
      }

      return this.auction.start_amount + inc;
    },

    submitBid() {
      try {
        this.$store.dispatch("submitBid", {
          id: this.$route.params.id,
          value: this.bidValue
        });
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>
