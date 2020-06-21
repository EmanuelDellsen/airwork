<template>
  <div class="center" style="background-color:white;">
       <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
          <ul class="navbar-nav">
<!--            <li class="nav-item" v-if="isUserLoggedIn"> -->
              <router-link to="/" class="nav-link">AirWork</router-link>
<!--            </li> -->
<!--            <li class="nav-item" v-if="isUserLoggedIn"> -->
              <router-link to="/applications" class="nav-link">Applications</router-link>
<!--            </li> -->
<!--            <li class="nav-item" v-if="isUserLoggedIn"> -->
              <router-link to="/profile" class="nav-link">Profile</router-link>
<!--           </li> -->
          </ul>
          <ul class="navbar-nav ml-auto">
<!--            <li class="nav-item" v-if="!isUserLoggedIn"> -->
              <router-link to="/register" class="nav-link"
                >Register</router-link>
<!--            </li> -->
<!--            <li class="nav-item" v-if="!isUserLoggedIn"> -->
              <router-link to="/login" class="nav-link">Login</router-link>
<!--            </li> -->
<!--            <li class="nav-item" v-if="isUserLoggedIn" @click="logoutUser()"> -->
              <router-link to="/" class="nav-link">Logout</router-link>
            
          </ul>
        </nav>
        <br />
        <transition name="bounce">
          <router-view></router-view>
        </transition>
  </div>
</template>

<script>
/*  import { mapGetters } from 'vuex';
  export default {
    computed: {
      ...mapGetters(['isUserLoggedIn'])
    },
    methods: {
      async logoutUser() {
        this.$store
          .dispatch('logout')
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err));
      }
    }
  }; */
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  
  .center {
    position:absolute;
    width:50%;
    left:0;
    right:0;
    margin-left:auto;
    margin-right:auto;
  }
</style>