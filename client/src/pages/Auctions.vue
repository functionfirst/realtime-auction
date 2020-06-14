<template>
  <div>
    <AuctionList :filter="$route.params.filter" />
  </div>
</template>

<script>
export default {
  components: {
    AuctionList: () => import("@/components/AuctionList")
  }
};
</script>
