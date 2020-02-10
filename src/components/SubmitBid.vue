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
        @change="setIncrement"
      >
        <option value="0" selected>Click to select a bid increment</option>
        <option
          :value="increment"
          v-for="(increment, index) in bidIncrements"
          :checked="currentIncrement == increment"
          :key="index"
        >+ £{{ increment}}</option>
      </select>
    </div>

    <button
      class="flex flex-col shadow-md items-center text-white bg-gray-900 p-3 hover:bg-gray-800"
    >
      Place Bid
      <span>£{{ bid.value }}</span>

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
      currentIncrement: 0
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
    setIncrement(event) {
      this.currentIncrement = event.target.value;
      this.bidBlocker = false;
    },

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

    async submitBid() {
      const valid = await this.checkBidAmount();

      if (!valid) return;

      const value = this.incrementValue(this.bid.value);

      const bid = {
        ...this.user,
        value
      };

      const response = await auctionFactory(xhrFactory(this.token)).bid(
        this.$route.params.id,
        bid
      );

      if (response.success) {
        this.$emit("updateAuction", response.auction); // @todo replace this with vuex state update
        console.log("emit event", this.eventName, response.auction);
        this.$socket.client.emit(this.eventName, response.auction);
        console.log(this.$socket.client);
      }
    }
  }
};
</script>
