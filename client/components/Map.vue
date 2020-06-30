<template>
  <div>
    <h1>Search bar component here?</h1>

<GmapMap ref="map" :center="{lat:10, lng:10}"
  :zoom="7"
  map-type-id="terrain"
  style="width: 500px; height: 300px" @click="getClickinfo"></GmapMap>
  <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
  </div>
</template>

<script>

import {gmapApi} from 'vue2-google-maps'

  export default {
    computed: {
      google: gmapApi
    },
      data(){
        return{
 map: null,
      markers: [],
      places: [],
        }
     
      }
      ,
		methods: {
			getClickinfo(location) {
        this.location = location;
        addMarker(location)
        

      },
      addMarker(location) {
        const marker = {
          lat: this.location.latLng.lat(),
          lng: this.location.latLng.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.location);
        this.center = marker;
      }
		},
		mounted() {
			this.$refs.map.$mapPromise.then((map) => {
      map.panTo({lat: 22.38, lng: 103.80})
			})
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