<template>
  <data-auction v-slot="{ auctions, loading }">
    <div class="auction-list">
      <div v-if="loading">LOADING.....</div>

      <div v-else>
        <h1 v-if="!auctions.length">No Auctions available</h1>

        <div class="auction-list-item" v-for="(auction, _id) in auctions" :key="_id">
          <router-link :to="auction.path">
            <div>{{ auction.name }}</div>

            <span class="auction-list-arrow glyphicon glyphicon-chevron-right"></span>

            <auction-status class="auction-list-start-date" :auction="auction" />
          </router-link>
        </div>
      </div>
    </div>
  </data-auction>
</template>

<script>
import AuctionStatus from "@/components/AuctionStatus";
import DataAuction from "@/components/data/Auction";

export default {
  components: {
    DataAuction
  }
};
</script>

<style scoped>
.auction {
  border: 1px solid #eee;
  padding: 1rem;
  text-decoration: none;
}
</style>
