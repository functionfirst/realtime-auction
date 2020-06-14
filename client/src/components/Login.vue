<template>
  <form
    class="border p-4 bg-gray-100"
    @submit.prevent="login"
  >
    <h1 class="text-center text-lg font-bold">
      Login
    </h1>

    <div class="mb-4">
      <label
        class="cursor-pointer mb-2 inline-block"
        for="email"
      >
        Email
      </label>

      <input
        id="email"
        v-model="email"
        class="border w-full px-3 py-2"
        required
        type="text"
      >
    </div>

    <div class="mb-4">
      <label
        class="cursor-pointer mb-2 inline-block"
        for="password"
      >
        Password
      </label>

      <input
        id="password"
        v-model="password"
        class="border w-full px-3 py-2"
        required
        type="password"
      >
    </div>

    <p
      v-if="error"
      class="text-red-800 py-2"
    >
      {{ error }}
    </p>

    <button
      class="bg-blue-300 px-3 py-2 w-full hover:bg-blue-400"
      type="submit"
    >
      Login
    </button>

    <p class="mt-4 text-center">
      Not Registered?
      <router-link
        class="text-blue-700 hover:text-blue-900"
        to="/register"
      >
        Create an Account
      </router-link>
    </p>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },

  methods: {
    async login() {
      const { email, password } = this;

      try {
        await this.$store.dispatch("login", {
          email,
          password
        });

        this.$router.push("/");
      } catch (error) {
        this.error = error;
      }
    }
  }
};
</script>
