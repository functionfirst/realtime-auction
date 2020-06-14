<template>
  <form
    class="border p-4 bg-gray-100"
    @submit.prevent="signup"
  >
    <h1 class="text-lg font-bold text-center">
      Create an Account
    </h1>

    <div class="mb-4">
      <label
        class="cursor-pointer mb-2 inline-block"
        for="name"
      >
        Name
      </label>
      <input
        id="name"
        v-model="user.name"
        class="border w-full px-3 py-2"
        required
        type="text"
      >
    </div>

    <div class="mb-4">
      <label
        class="cursor-pointer mb-2 inline-block"
        for="email"
      >
        Email
      </label>
      <input
        id="email"
        v-model="user.email"
        class="border w-full px-3 py-2"
        required
        type="email"
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
        v-model="user.password"
        class="border w-full px-3 py-2"
        required
        type="password"
      >
    </div>

    <div class="mb-4">
      <label
        class="cursor-pointer mb-2 inline-block"
        for="confirm_password"
      >
        Confirm Password
      </label>
      <input
        id="confirm_password"
        ref="confirm_password"
        v-model="user.confirm_password"
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
      Register
    </button>

    <p class="mt-4 text-center">
      Already Registered ?
      <router-link
        class="text-blue-700 hover:text-blue-900"
        to="/login"
      >
        Sign-in
      </router-link>
    </p>
  </form>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        confirm_password: ""
      },
      error: ""
    };
  },

  methods: {
    async signup() {
      const response = await this.$store.dispatch("register", this.user);

      if (response.success) {
        this.$router.push("/register/success");
      } else {
        this.error = response.message;
      }
    }
  }
};
</script>
