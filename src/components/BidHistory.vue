<template>
  <div class="mt-4" v-if="bids">
    <button
      class="flex justify-between items-center px-3 py-2 bg-gray-300 hover:bg-gray-200 font-bold w-full text-lg"
      @click="show = !show"
      type="button"
    >
      Bid History
      <span v-show="show">&uarr;</span>
      <span v-show="!show">&darr;</span>
    </button>

    <div class="border p-4" v-show="show">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-900 text-white">
            <th class="px-3 py-3 text-left">Date</th>
            <th class="px-3 py-3 text-right w-1/2">Bid Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in sortedBids"
            :key="index"
            :class="index % 2 === 0 ? '' : 'bg-gray-200'"
          >
            <td class="py-2 px-3">{{ item.created_at }}</td>
            <td class="py-2 px-3 text-right">£{{ item.value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import orderBy from "lodash/orderBy";

export default {
  props: {
    bids: {
      default: () => [],
      required: true,
      type: Array
    }
  },

  data() {
    return {
      show: false
    };
  },

  computed: {
    sortedBids() {
      return orderBy(this.bids, "value", "desc");
    }
  }
};
</script>
