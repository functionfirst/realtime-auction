<template>
  <header>
    <div class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
          <div class="navbar-header">
            <button
              type="button"
              class="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#nav"
            >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <router-link class="navbar-brand" to="/">Real-time Auctions</router-link>
          </div>

          <div id="nav" class="collapse navbar-collapse" v-if="user">
            <ul class="nav navbar-nav" v-if="user.admin">
              <li>
                <a href="/users">
                  <span class="glyphicon glyphicon-user"></span> Users
                </a>
              </li>
              <li>
                <a href="/auctions">
                  <span class="glyphicon glyphicon-sort-by-alphabet"></span> Auctions
                </a>
              </li>
            </ul>

            <ul class="nav navbar-nav navbar-right">
              <li>
                <p class="navbar-text">You are logged in as {{ user.name }}</p>
              </li>
              <li>
                <a href="#" @click="doLogout()">
                  <span class="glyphicon glyphicon-log-out"></span> Logout
                </a>
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
