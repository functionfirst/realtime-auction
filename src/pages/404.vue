<template>
  <div class="min-h-screen bg-gray-200">
    <div class="max-w-2xl mx-auto pt-6 mb-12 flex items-center justify-center">
      <div class="bg-white flex flex-col items-center justify-center leading-loose p-12 shadow-md">
        <h1 class="text-6xl">404</h1>
        <p class="font-bold">Sorry, we couldn't find it ...</p>
        <p>The page you are looking for doesn't exist</p>

        <p class="mt-6">
          <router-link :to="prevRoute.fullPath" class="bg-blue-300 px-3 py-2 rounded shadow">Go Back</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prevRoute: ""
    };
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from;
    });
  }
};
</script>
