<template>
  <div>
    <h1>Search bar component here?</h1>

    <GmapMap :center="center" :map-type-id="mapTypeId" :zoom="8">
      <GmapMarker v-for="(item, index) in markers" :key="index" :position="item.position"
        @click="center = item.position" />
    </GmapMap>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        center: { lat: 57.708870, lng: 11.974560 },
        mapTypeId: "terrain",
        markers: [
          { position: { lat: 57.359541, lng: 12.085396 } }
        ]
      };
    }
  };
</script>

<style>
  .vue-map-container {
    height: 450px;
    max-width: 992px;
    width: 100%;
  }
</style>