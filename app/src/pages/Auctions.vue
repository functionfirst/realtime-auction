<template>
  <div>
    <AuctionList />
  </div>
</template>

<script>
export default {
  components: {
    AuctionList: () => import("@/components/AuctionList")
  }
};
</script>
