<template>
  <div></div>
</template>
<script>
export default {
  mounted() {
    this.$store.dispatch("logout").then(() => {
      this.$router.push("/");
    });
  }
};
</script>
