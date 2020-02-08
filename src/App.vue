<template>
  <div id="app" class="min-h-screen">
    <site-header />

    <!-- MAIN CONTENT -->
    <main class="max-w-2xl mx-auto">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import SiteHeader from "@/components/SiteHeader";

export default {
  components: {
    SiteHeader
  }
};
</script>
