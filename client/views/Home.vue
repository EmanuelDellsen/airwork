<template>
  <div id="home">
    <div class="map">
      <SearchBar v-on:goToSearchResult="goToSearchResult"></SearchBar>
      <Map v-bind:searchResult="searchResult"></Map>
    </div>
  </div>
</template>

<script>
  import Map from "../components/Map.vue";
  import SearchBar from "../components/SearchBar.vue";

  export default {
    name: "Home",
    props: {
      searchResult: Object,
    },
    components: {
      Map,
      SearchBar,
    },
    methods: {
      goToSearchResult: function (searchResult) {
        console.log(searchResult);
        this.searchResult = searchResult;
      },
    },
  };
</script>

<style></style>