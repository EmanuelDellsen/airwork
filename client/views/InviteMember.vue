<template>
  <div>
    <form @submit.prevent="inviteNewUser">
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
      <button type="submit" class="btn btn-secondary">Invite</button>
    </form>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  data() {
    return {
      email: "",
    };
  },
  computed: {
    user: {
      get() {
        return this.$store.state.user;
      },
    },
  },
  methods: {
    async inviteNewUser() {
      console.log("inside invitenewuser invitemember.vue");
      let newUser = {
        email: this.email,
      };
      console.log(newUser);
      console.log(this.user);

      api
        .inviteNewUserToAirWork(newUser, this.user)
        .then((res) => {
          console.log(res, "res in store after invite");
        })
        .catch((err) => {
          console.log(err, "err in inviteNewUser store");
        });
    },
  },
};
</script>

<style>
.form-group {
  position: center;
}
</style>
