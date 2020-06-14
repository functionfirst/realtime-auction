<template>
  <div
    class="rounded px-2 py-1 text-sm"
    :class="`bg-${status.colour}-300`"
  >
    {{ status.label }}
  </div>
</template>

<script>
import { status } from "@/lib/status";

export default {
  props: {
    hasStarted: {
      default: false,
      required: true,
      type: Boolean
    },

    hasFinished: {
      default: false,
      required: true,
      type: Boolean
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
    }
  }
};
</script>
