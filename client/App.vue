<template>
  <div id="app">
    <Navbar id="navbar" />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
};
</script>

<style>
#navbar {
  padding: 1em;
}
</style>
