<template>
  <div v-if="showCountdown">
    <span class="font-bold">{{ countdown.days }}</span>d
    <span class="font-bold">{{ countdown.hours }}</span>h
    <span class="font-bold">{{ countdown.minutes }}</span>min
    <span class="font-bold">{{ countdown.seconds }}</span>sec
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

  data() {
    return {
      countdown: null,
      interval: null
    };
  },

  computed: {
    showCountdown() {
      return (
        this.countdown &&
        (!this.auction.hasFinished || !this.auction.hasStarted)
      );
    }
  },

  mounted() {
    this.interval = setInterval(this.getCountdown, 1000);
  },

  destroyed() {
    this.countdown = null;
    this.interval = null;
  },

  methods: {
    getCountdown() {
      if (!this.auction.endDate) return;

      const countdown = intervalToDuration({
        start: this.auction.endDate,
        end: new Date()
      });

      this.countdown = countdown;
    }
  }
};
</script>
