<template>
  <div class="ml-3 relative">
    <button
      id="user-menu"
      class="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
      aria-label="User menu"
      aria-haspopup="true"
      @click="$store.dispatch('toggleNav')"
    >
      <img
        class="h-8 w-8 rounded-full"
        src="https://avatars.dicebear.com/api/identicon/realtime-auctions.svg?colors[]=amber"
        alt=""
      >
    </button>

    <div
      v-show="$store.state.nav"
      class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
      @click="$store.dispatch('toggleNav')"
    >
      <div
        class="py-1 rounded-md bg-white shadow-xs"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        <router-link
          to="/profile"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          Your Profile
        </router-link>
        <router-link
          to="/settings"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          Settings
        </router-link>
        <router-link
          to="/logout"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          Logout
        </router-link>
      </div>
    </div>
  </div>
</template>
