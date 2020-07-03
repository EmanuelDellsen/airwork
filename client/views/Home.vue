<template>
  <div id="home">
    <div class="map">
      <SearchBar />
      <Map />
    </div>
  </div>
</template>

<script>

  import Map from '../components/Map.vue';
  import SearchBar from '../components/SearchBar.vue';



  export default {
    components: {
      Map,
      SearchBar
    }
  };
</script>

<style>

</style>