<template>
  <header class="bg-gray-200 mb-12 py-6">
    <div class>
      <div class="container-fluid max-w-2xl mx-auto w-full">
        <div class="flex justify-between items-center">
          <router-link class="font-bold text-lg mr-4" to="/">Real-time Auctions</router-link>

          <div class="flex flex-1 items-center justify-end">
            <ul v-if="user.admin" class="flex justify-between items-center nav navbar-nav">
              <li>
                <router-link class="rounded p-2 block hover:bg-gray-300" to="/users">Users</router-link>
              </li>
              <li>
                <router-link class="rounded p-2 block hover:bg-gray-300" to="/auctions">Auctions</router-link>
              </li>
            </ul>

            <ul v-if="user" class="flex justify-between items-center">
              <li>
                <p class="mr-4">You are logged in as {{ user.name }}</p>
              </li>
              <li>
                <router-link class="rounded p-2 block hover:bg-gray-300" to="/logout">Logout</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "Alan"
      }
    };
  },
  methods: {
    logout() {
      // do something
    }
  }
};
</script>
