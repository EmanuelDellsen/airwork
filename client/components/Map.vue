<template>
  <div>
    <h1>Search bar component here?</h1>

    <GmapMap ref="map" :center="{lat:10, lng:10}" :zoom="7" map-type-id="terrain" style="width: 500px; height: 300px"
      @click="getClickinfo">
      <gmap-marker :key="key" v-for="(item, key) in markers" :position="getPosition(item)" :clickable="true"
        @click="openApplicationInfo()" />
      <application-info v-model="applicationInfoWindowOpen" v-bind:value="applicationInfoWindowOpen"></application-info>

    </GmapMap>

  </div>
</template>

<script>

  import { gmapApi } from 'vue2-google-maps'
  //import GmapCustomMarker from 'vue2-gmap-custom-marker';
  import ApplicationInfo from './ApplicationInfo.vue'

  export default {
    components: {
      ApplicationInfo
    },
    computed: {
      google: gmapApi

    },
    data() {
      return {
        map: null,
        markers: [],
        places: [],
        currentLocation: null,
        currentMarkerIndex: null,
        currentMarker: null,
        infoWindowPos: null,
        applicationInfoWindowOpen: false,
        infoContent: '',
        infoOptions: {
          pixelOffset: {
            width: 20,
            height: 40
          }
        }


      }

    }
    ,
    methods: {
      getClickinfo: function (location) {
        this.currentLocation = location;
        this.addMarker()
        console.log(this.currentLocation.latLng.lat())
        console.log(this.currentLocation.latLng.lng())


      },
      addMarker: function () {
        let marker = {
          lat: this.currentLocation.latLng.lat(),
          lng: this.currentLocation.latLng.lng()
        };
        //this.markers.push({ position: marker });
        //this.places.push(this.currentLocation);
        this.markers.push(marker)
        console.log(this.markers)
        console.log(marker.lat)
        console.log("after this.markers")

      },
      getPosition: function (marker) {
        console.log("in getposition")
        console.log(marker)
        console.log(marker.lat)
        this.currentMarker = marker;
        return {
          lat: marker.lat,
          lng: marker.lng

        }

      },
      openApplicationInfo: function () {
        this.applicationInfoWindowOpen = !this.applicationInfoWindowOpen;
        console.log(this.applicationInfoWindowOpen)
      }
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