<script>
// import axios from 'axios'
import { xhrFactory } from '@/lib/xhrFactory'
import { auctionFactory } from '@/lib/auctionFactory'

export default {
  data () {
    return {
      auctions: []
    }
  },

  created () {
    auctionFactory(xhrFactory()).all().then(response => {
      this.auctions = response.data
    });
  },

  render () {
    return this.$scopedSlots.default({
      auctions: this.auctions
    })
  }  
}
</script>