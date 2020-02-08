<script>
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
      .then(auctions => {
        this.auctions = auctions;
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
