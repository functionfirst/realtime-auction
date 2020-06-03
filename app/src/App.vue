<template>
  <layout id="app">
    <router-view :key="$route.fullPath" />
  </layout>
</template>

<script>
export default {
  components: {
    Layout: () => import("@/layouts/Default")
  }
};
</script>
