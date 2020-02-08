<script>
import Auction from "@/models/auction";
import { xhrFactory } from "@/lib/xhrFactory";
import { auctionFactory } from "@/lib/auctionFactory";

export default {
  data() {
    return {
      loading: true,
      auctions: []
    };
  },

  created() {
    auctionFactory(xhrFactory())
      .all()
      .then(response => {
        this.auctions = response.data.map(auction => new Auction(auction));
        this.loading = false;
      });
  },

  render() {
    return this.$scopedSlots.default({
      auctions: this.auctions,
      loading: this.loading
    });
  }
};
</script>
