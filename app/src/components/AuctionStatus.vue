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
import { isInThePast } from "@/lib/dates";

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
      if (this.hasStarted && !this.hasFinished) {
        return status.live;
      } else if (this.hasFinished) {
        return status.expired;
      }

      return status.pending;
    },

    hasStarted() {
      return isInThePast(this.auction.startDate);
    },

    hasFinished() {
      return isInThePast(this.auction.endDate);
    }
  },

  methods: {}
};
</script>
