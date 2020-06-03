<template>
  <div
    class="rounded px-2 py-1 text-sm mt-2"
    :class="`bg-${status.colour}-300`"
  >
    {{ status.label }}
  </div>
</template>

<script>
import { status } from "@/lib/status";

export default {
  props: {
    auction: {
      default: () => {},
      required: true,
      type: Object
    }
  },

  computed: {
    status() {
      if (this.auction.hasStarted && !this.auction.hasFinished) {
        return status.live;
      } else if (this.auction.hasFinished) {
        return status.expired;
      }

      return status.pending;
    }
  },

  methods: {}
};
</script>
