<template>
  <div id="app">
    <site-header />

    <!-- MAIN CONTENT -->
    <main class="container">
      <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <div>
          <router-view></router-view>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SiteHeader from '@/components/SiteHeader'

export default {
  components: {
    SiteHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
