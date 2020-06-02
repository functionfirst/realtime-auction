<template>
  <div>
    {{ interval.days }}d
    {{ interval.hours }}h
    {{ interval.minutes }}m
  </div>
</template>

<script>
import intervalToDuration from "date-fns/intervalToDuration";

export default {
  props: {
    auction: {
      default: () => {},
      required: true,
      type: Object
    }
  },

  computed: {
    interval() {
      return intervalToDuration({
        start: this.auction.startDate,
        end: new Date()
      });
    }
  }
};
</script>
