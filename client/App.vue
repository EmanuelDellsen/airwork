<template>
  <div id="app">
    <div id="inner">
      <Navbar id="navbar" />
    </div>
  </div>
</template>


<script>

  import Navbar from "./components/Navbar.vue";

  export default {
    components: {
      Navbar
    }
  };
</script>

<style>
  #navbar {
    padding: 1em
  }
</style>