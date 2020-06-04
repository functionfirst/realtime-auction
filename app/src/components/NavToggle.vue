<template>
  <button
    class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
    @click="$store.dispatch('toggleNav')"
  >
    <svg
      class="block h-6 w-6"
      :class="$store.state.nav ? 'hidden' : ''"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
    <svg
      class="block h-6 w-6"
      :class="$store.state.nav ? '' : 'hidden'"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
</template>
