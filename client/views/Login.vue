<template>
  <div>
    <div>
      <button @click="authenticate('google')">auth Google</button>
    </div>

  </div>
</template>

<script>
  import api from "../services/api";

  export default {
    data() {
      return {
        authResponse: ""

      };
    },
    methods: {
      authenticate(provider) {

        this.$auth.authenticate(provider).then(res => {
          console.log(res, "res in profile")
          this.authResponse = res.data;
          this.$store.dispatch("setAuthSuccess", this.authResponse.access_token);
          this.getUserInfo();
          this.$router.push('/');

        }).catch(err => {
          console.log(err.message, "err in profile")
        })
        console.log(this.authResponse, "authresponse")
        /*this.$store.dispatch('authenticateUser', provider).then(() =>
        */
      },
      getUserInfo() {
        api.getUserInfo(this.$store.state.access_token).then(res => {
          console.log(res)
          let user = res;
          this.$store.dispatch("setUser", user);
        }).catch(err => {
          console.log(err, "getuserinfo error")
        })



      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  h1,
  h2 {
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