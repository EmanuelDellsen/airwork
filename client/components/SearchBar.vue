<template>
  <div>
    <div>
      <label>
        <gmap-autocomplete placeholder="Write an address" @place_changed="setPlace"> </gmap-autocomplete>
        <button v-on:click="goToSearchResult">Go here</button>
      </label>
      <br />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchResult: "",
      };
    },
    methods: {
      // receives a place object via the autocomplete component
      setPlace(place) {
        console.log(place);
        this.searchResult = place;
        console.log(this.searchResult);
        console.log("line 30");
      },
      goToSearchResult() {
        this.$emit("goToSearchResult", this.searchResult);
        console.log(this.searchResult);
        console.log("in gotosearchresult");
      },
    },
  };
</script>