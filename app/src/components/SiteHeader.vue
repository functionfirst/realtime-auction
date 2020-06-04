<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <router-link
              to="/"
              class="block"
            >
              <logo class="h-8 w-8" />
            </router-link>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline text-sm font-medium">
              <nav-link
                v-for="(item, index) in nav"
                :key="index"
                :item="item"
                class="mr-4 "
              />
            </div>
          </div>
        </div>

        <div
          v-if="$store.state.user"
          class="hidden md:block"
        >
          <div class="ml-4 flex items-center md:ml-6">
            <notifications />

            <profile-dropdown />
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <nav-toggle />
        </div>
      </div>
    </div>

    <div
      class="bg-gray-800 fixed md:hidden min-h-screen w-full z-10"
      :class="$store.state.nav ? '' : 'hidden'"
      @click="$store.dispatch('toggleNav')"
    >
      <div class="px-2 pt-2 pb-3 sm:px-3 text-base font-medium">
        <nav-link
          v-for="(item, index) in nav"
          :key="index"
          :item="item"
          class="block mb-1"
        />
      </div>

      <div
        v-if="$store.state.user"
        class="pt-4 pb-3 border-t border-gray-700"
      >
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              src="https://avatars.dicebear.com/api/identicon/realtime-auctions.svg?colors[]=amber"
              alt=""
            >
          </div>
          <div class="ml-3">
            <div class="text-base font-medium leading-none text-white">
              {{ $store.state.user.name }}
            </div>
            <div class="mt-1 text-sm font-medium leading-none text-gray-400">
              {{ $store.state.user.email }}
            </div>
          </div>
        </div>
        <div class="mt-3 px-2">
          <router-link
            to="/profile"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Your Profile
          </router-link>

          <router-link
            to="/settings"
            class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Settings
          </router-link>

          <router-link
            to="/logout"
            class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Logout
          </router-link>
        </div>
      </div>
      <div
        v-else
        class="pt-4 pb-3 border-t border-gray-700"
      >
        <router-link
          to="/login"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          Login
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
const nav = [
  {
    label: "All Listings",
    url: "/auctions"
  },
  {
    label: "Recently Added",
    url: "/auctions/recent"
  },
  {
    label: "Featured",
    url: "/auctions/featured"
  }
];
export default {
  components: {
    Logo: () => import("@/components/Logo"),
    ProfileDropdown: () => import("@/components/ProfileDropdown"),
    NavToggle: () => import("@/components/NavToggle"),
    NavLink: () => import("@/components/NavLink"),
    Notifications: () => import("@/components/Notifications")
  },

  data() {
    return {
      nav
    };
  },

  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>
