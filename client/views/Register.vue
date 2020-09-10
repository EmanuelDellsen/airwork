<template>
  <div>
    <div class="row justify-content-center">
      <div class="card-mx-auto">
        <div class="card-header text-white bg-secondary">
          <h4>Become a member of the AirWork community</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="registerUser">
            <div class="form-group">
              <label for="forename">Forename</label>
              <input
                id="forename"
                type="text"
                placeholder="Forename"
                name="forename"
                v-model="givenName"
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
                v-model="familyName"
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
              <vue-tel-input
                id="telephone_number"
                type="numbers"
                placeholder="Telephone number"
                name="telephone_number"
                v-model="number"
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
// import axios from 'axios';
import api from "../services/api";

import { VueTelInput } from "vue-tel-input";

export default {
  components: {
    VueTelInput,
  },
  data() {
    return {
      name: "",
      familyName: "",
      givenName: "",
      email: "",
      password: "",
      confirm_password: "",
      idFromParams: "",
    };
  },
  created() {
    this.getParams(this.$route.query.id);
    this.checkIfUserExistsInDB();
  },
  methods: {
    getParams(idFromParams) {
      console.log(idFromParams);
      this.idFromParams = idFromParams;
    },
    checkIfUserExistsInDB() {
      api
        .checkIfUserExists(this.idFromParams)
        .then((value) => {
          console.log(value, "value");

          if (value.isActive === true) {
            this.$router.push("/login");
          } else if (value.isActive === false) {
            console.log("create an acount or use your google account");
          }
        })
        .catch((error) => console.log(error, "error"));
    },
    async registerUser() {
      let user = {
        name: this.givenName + " " + this.familyName,
        given_name: this.givenName,
        family_name: this.familyName,
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password,
      };
      api.createUser(user);
      /*
        this.$store
          .dispatch('register', user)
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err));
          */
    },
  },
};
</script>

<style>
.row {
  padding: 2%;
}
.card-body {
  background-color: #ffffff;
}
.form-group {
  margin: 0;
  float: none;
}
.card-header.text-white.bg-secondary {
  background-color: #66809b !important;
  color: #ffffff !important;
}
.btn.btn-secondary {
  background-color: #66809b;
  color: #ffffff !important;
}
</style>
