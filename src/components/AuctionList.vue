<template>
    <data-auction v-slot="{ auctions }">
      <div>
        <h1 v-if="!auctions.length">No Auctions available</h1>

        <div class="auction" v-for="(auction, _id) in auctions" :key="_id">
          <router-link :to="{ name: 'auction', params: { id: auction._id } }">
            <div>{{ auction.name }}</div>

            <span class="auction-list-arrow glyphicon glyphicon-chevron-right"></span>

            <auction-status
              class="auction-list-start-date"
              :auction="auction"
            />
          </router-link>

          <!-- {{ auction.name }}
          {{ auction._id }}
          {{ auction.start_date }}
          {{ auction.end_date }}
          {{ auction.description }}
          {{ auction.start_amount }}
          {{ auction.bids }}
          {{ auction.autobids }}
          {{ auction.countdown }}
          {{ auction.enabled }} -->

          <!-- <pre>{{ auction }}</pre> -->
        </div>
      </div>
    </data-auction>
</template>

<script>
import AuctionStatus from '@/components/AuctionStatus'
import DataAuction from '@/components/data/Auction'

export default {
  components: {
    AuctionStatus,
    DataAuction
  }
}
</script>

<style scoped>
.auction {
  border: 1px solid #eee;
  padding: 1rem;
  text-decoration: none;
}
</style>