<template>
  <div class="max-w-2xl mx-auto mt-6 mb-12">
    <h1 class="text-xl font-bold">Welcome to the auction site</h1>

    <AuctionList v-if="user.token" />

    <p v-else>
      You must
      <router-link to="login" class="underline">sign-in</router-link>&nbsp;or
      <router-link to="/register" class="underline">register an account</router-link>&nbsp;before you can view real-time auctions
    </p>
  </div>
</template>

<script>
import AuctionList from "@/components/AuctionList";

export default {
  components: {
    AuctionList
  },

  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>
