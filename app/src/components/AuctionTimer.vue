<template>
  <div v-if="showTimer">
    <span class="font-bold">{{ timer.days }}</span>d
    <span class="font-bold">{{ timer.hours }}</span>h
    <span class="font-bold">{{ timer.minutes }}</span>min
    <span class="font-bold">{{ timer.seconds }}</span>sec
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
      timer: null,
      interval: null
    };
  },

  computed: {
    showTimer() {
      return (
        this.timer && (!this.auction.hasFinished || !this.auction.hasStarted)
      );
    }
  },

  mounted() {
    this.interval = setInterval(this.countdown, 1000);
  },

  destroyed() {
    this.timer = null;
    this.interval = null;
  },

  methods: {
    countdown() {
      if (!this.auction.endDate) return;

      const timer = intervalToDuration({
        start: this.auction.endDate,
        end: new Date()
      });

      this.timer = timer;
    }
  }
};
</script>
