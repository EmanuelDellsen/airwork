<template>
  <div>
    <div class="row justify-content-center">
      <div class="card-mx-auto">
        <div class="card-header text-white bg-secondary">
          <h4>Login</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="loginUser">
            <div class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                type="text"
                placeholder="Email"
                name="email"
                v-model="email"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                v-model="password"
                class="form-control"
              />
            </div>
            <input type="submit" class="btn btn-secondary" value="Login" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async loginUser() {
        let userToLogin = {
          email: this.email,
          password: this.password
        };
        this.$store
          .dispatch('login', userToLogin)
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err));
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
