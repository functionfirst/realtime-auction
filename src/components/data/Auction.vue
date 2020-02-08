<script>
// import axios from 'axios'
import { xhrFactory } from '@/lib/xhrFactory'
import { auctionFactory } from '@/lib/auctionFactory'
import Auction from "@/models/auction";

export default {
  data () {
    return {
      loading: true,
      auctions: []
    }
  },

  created () {
    auctionFactory(xhrFactory()).all().then(response => {
      this.auctions = response.data
      this.loading = false
    });
        this.auctions = response.data.map(auction => new Auction(auction));
  },

  render () {
    return this.$scopedSlots.default({
      auctions: this.auctions,
      loading: this.loading
    })
  }  
}
</script>