<template>
  <div>
    <div class="row justify-content-center">
      <div class="card-mx-auto">
        <div class="card-header text-white bg-secondary">
          <h4>Register</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="registerUser">
            <div class="form-group">
              <label for="forname">Forename</label>
              <input
                id="forename"
                type="text"
                placeholder="Forename"
                name="forename"
                v-model="name"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="Surname">Surname</label>
              <input
                id="surname"
                type="text"
                placeholder="Surname"
                name="surname"
                v-model="name"
                class="form-control"
              />
            </div>
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
              <label for="telephone_number">Telephone number</label>
              <input
                id="telephone_number"
                type="numbers"
                placeholder="Telephone number"
                name="telephone_number"
                v-model="value"
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
            <div class="form-group">
              <label for="confirm_password">Confirm Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Confirm Password"
                name="confirm_password"
                id="confirm_password"
                v-model="confirm_password"
              />
            </div>
            <!--- default value of button without type will be a submit button
               preferably specify what kind of button it is -->
            <button type="submit" class="btn btn-secondary">
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*  import axios from 'axios';

  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        confirm_password: ''
      };
    },
    methods: {
      async registerUser() {
        let user = {
          name: this.name,
          email: this.email,
          password: this.password,
          confirm_password: this.confirm_password
        };
        this.$store
          .dispatch('register', user)
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err));
      }
    }
  }; */
</script>

<style>
.row {
  margin: 5%;
}

</style>
