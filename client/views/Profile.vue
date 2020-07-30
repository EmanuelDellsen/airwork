<template>
  <div>
    <div class="card-header text-white bg-secondary">
      <br />
      <UserProfile />
    </div>

    <button @click="authenticate('google')">auth Google</button>
    <button @click="getUserInfo()">showUserinfo</button>
  </div>
</template>

<script>
import UserProfile from "../components/UserProfile.vue";
import api from "../services/api";

export default {
  data() {
    return {
      alldata: "",
      authResponse: ""
    };
  },
  components: {
    UserProfile,
  },
  methods: {
    async authenticate(provider) {
      this.authResponse = await this.$auth.authenticate(provider);
    },
    async getUserInfo(){
      const data = await api.getUserInfo(this.authResponse.data.access_token);

      /*eslint-disable*/
      console.log(data);
    }
    /*
    authenticate: function(provider) {
      this.$auth
        .authenticate(provider)
        .then(response => {
          // Execute application logic after successful social authentication
          await console.log(api.getUserInfo(response.data.access_token))
        })
        .catch((err) => {console.log(err)});
    },
    */
  },
};
</script>
