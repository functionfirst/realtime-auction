<template>
  <header class="bg-gray-900 text-white py-3 lg:py-6">
    <div class="max-w-2xl mx-auto w-full">
      <div class="flex flex-col lg:flex-row lg:justify-between items-center">
        <router-link class="font-bold text-lg" to="/">Real-time Auctions</router-link>

        <div class="flex flex-1 items-center justify-center lg:justify-end mt-3 lg:mt-0">
          <ul v-if="user && user.admin" class="flex justify-between items-center nav navbar-nav">
            <li>
              <router-link class="rounded p-2 block hover:bg-gray-700" to="/users">Users</router-link>
            </li>
            <li>
              <router-link class="rounded p-2 block hover:bg-gray-700" to="/auctions">Auctions</router-link>
            </li>
          </ul>

          <ul v-if="user && user.token" class="flex justify-between items-center">
            <li>
              <p class="mr-4">You are logged in as {{ user.name }}</p>
            </li>
            <li>
              <router-link class="rounded p-2 block hover:bg-gray-700" to="/logout">Logout</router-link>
            </li>
          </ul>

          <ul v-else>
            <li class="flex justify-between items-center">
              <router-link class="rounded p-2 block hover:bg-gray-700" to="/login">Login</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>
