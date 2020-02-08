<template>
  <form class="border p-4 bg-gray-100" @submit.prevent="login">
    <h1 class="text-lg font-bold">Login..</h1>

    <div class="mb-4">
      <label class="mb-2 inline-block" for="username">User name</label>
      <input class="border w-full px-3 py-2" id="username" required v-model="username" type="text" />
    </div>

    <div class="mb-4">
      <label class="mb-2 inline-block" for="password">Password</label>
      <input
        class="border w-full px-3 py-2"
        id="password"
        required
        v-model="password"
        type="password"
      />
    </div>
    <button class="bg-blue-300 px-3 py-2 w-full hover:bg-blue-400" type="submit">Login</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },

  methods: {
    login() {
      const { username, password } = this;

      this.$store.dispatch("login", { username, password }).then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>
