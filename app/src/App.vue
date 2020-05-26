<template>
  <div
    id="app"
    class="min-h-screen flex flex-col"
  >
    <site-header />

    <main class="flex-1">
      <router-view />
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
