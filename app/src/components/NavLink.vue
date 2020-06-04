<template functional>
  <router-link
    v-slot="{ href, navigate, isExactActive }"
    :to="props.item.url"
  >
    <a
      :href="href"
      class="block px-3 py-2 mb-1 rounded-md focus:outline-none"
      :class="[data.staticClass, isExactActive ? 'text-white bg-gray-900 focus:text-white focus:bg-gray-700' : 'text-gray-300 hover:text-white hover:bg-gray-700 focus:text-white focus:bg-gray-700']"
      @click="navigate"
    >
      {{ props.item.label }}
    </a>
  </router-link>
</template>
