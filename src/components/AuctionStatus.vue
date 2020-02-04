<template>
  <div>
    <div class="auction-list-start-date" v-if="status.live">
      <span class="label label-success">Live</span>
      This auction started at {{ auction.start_date }}
    </div>

    <div class="auction-list-start-date" v-if="status.expired">
      <span class="label label-danger">Expired</span>
      This auction ended at {{ auction.end_date }}
    </div>

    <div v-if="status.notstarted" class="auction-list-start-date">
      Auction starts {{ auction.start_date }}
    </div> 
  </div>
</template>

<script>
export default {
  props: {
    auction: {
      default: () => {},
      required: true,
      type: Object
    }
  },

  data () {
    return {
      status: {}
    }
  },

  computed: {
    currentTime () {
      return new Date()
    },

    // status () {
    //   return true
    // }
  },

  methods: {
    isAuctionLive() {
      // Check if auction hasn started yet
      let hasAuctionStarted = this.diffDate(this.auction.start_date);
      
      if(!hasAuctionStarted) {
        return { notstarted: true };
      }

      // Check if Auction has finished yet
      let hasAuctionFinished = this.diffDate(this.auction.end_date);

      if(hasAuctionFinished) {
        // Check if there's a grace period
        let latestBidDate = this.getLatestBidDate(this.auction.bids);

        if(latestBidDate) {
          // check if we've exceeded the countdown (grace period)
          let inGracePeriod = this.checkGracePeriod(latestBidDate, this.auction.countdown);

          if(inGracePeriod) {
            return { live: true };
          }

          return { expired: true };
        }
      }

      return { live: true };
    },

    duration (val) {
      return val
    },

    checkGracePeriod(latestBidDate, countdown) {
        let gracePeriodEnds = latestBidDate.add(countdown, 'minutes');
        let diff = gracePeriodEnds.diff(this.currentTime);

      return this.duration(diff)  >= 0;
    },

    diffDate(thisDate) {
      let diffTime = new Date(thisDate);
      let diff = this.currentTime.diff(diffTime);

      return this.duration(diff) >= 0 ;
    },
    
    getLatestBidDate(bids) {
      // Returns the latest bid date to check if the auction is still 'live'
      let latestBidDate;

      // Check bids exist
      if(bids.length === 0) {
        return false;
      }

      // Sort bids by highest financial value
      bids.sort(function(b1,b2) {
        return b2.value - b1.value;
      });

      // Grab the date of highest bid
      latestBidDate = bids[0].created_at;

      // return the highest bid date
      return new Date(latestBidDate);
    }
  }
}
</script>