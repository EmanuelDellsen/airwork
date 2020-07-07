<template>
  <div>
    <h1>Search bar component here?</h1>

    <GmapMap id="map" ref="map" :center="this.center" :zoom="11" map-type-id="terrain"
      style="width: 500px; height: 300px" @click="getClickinfo" @bounds_changed="addMarkerFromList">
      <gmap-info-window id="info_window" :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen"
        @closeclick="infoWinOpen = false">
        <button type="button" style="background-color: pink;">
          {{ this.infoContent }}
        </button>
        <ApplicationInfo v-bind:marker="currentMarker"></ApplicationInfo>
      </gmap-info-window>
      <gmap-marker :key="key" v-for="(item, key) in markers" :position="item.position" :clickable="true"
        @click="toggleInfoWindow(item, key)"></gmap-marker>
    </GmapMap>
  </div>
</template>

<script>
  import { gmapApi } from "vue2-google-maps";

  //import GmapCustomMarker from 'vue2-gmap-custom-marker';
  import ApplicationInfo from "./ApplicationInfo.vue";

  export default {
    name: "Map",
    props: {
      searchResult: Object,
    },
    components: {
      ApplicationInfo,
    },
    computed: {
      google: gmapApi,
    },
    watch: {
      searchResult: function () {
        console.log("searchResult changed and is now: ")
        console.log(this.searchResult)
        this.goToSearchResult(this.searchResult)

      }

    },
    data() {
      return {
        map: null,
        markers: [],
        places: [],
        center: { lat: 10, lng: 10 },
        currentLocation: null,
        currentMarkerIndex: null,
        currentMarker: null,
        infoWindowPos: null,
        infoWinOpen: false,
        applicationInfoWindowOpen: false,
        infoContent: "",
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35,
          },
        },
      };
    },
    mounted() {
      this.geolocate();
    },


    methods: {
      // after a user clicks on the map the information stored on from that location is stored in local variables
      getClickinfo: function (location) {
        this.currentLocation = location;
        this.addMarker();
        console.log("inside getClickInfo")
      },
      // add a markers on the current location which is set when a user clickes the map
      addMarker: function () {
        let marker = {
          position: {
            lat: this.currentLocation.latLng.lat(),
            lng: this.currentLocation.latLng.lng(),
          },
          markerInfo: "Here detailed info will be",
        };
        //this.markers.push({ position: marker });
        //this.places.push(this.currentLocation);
        this.markers.push(marker);
        console.log("inside addMarker")
        console.log(this.markers.length)

      },
      addMarkerFromList: function () {
        console.log("moved the map now")
      },
      // gets the position of the marker the user has clicked on
      getPosition: function (marker) {
        this.currentMarker = marker;
        console.log(marker.position.lat)
        console.log("inside getPosition")
        console.log(this.markers.length)

        return {
          lat: this.currentMarker.position.lat,
          lng: this.currentMarker.position.lng,
        };
      },
      // this methods gets called when a user presses a marker to open that markers information
      toggleInfoWindow: function (marker, index) {
        console.log(marker);
        this.infoWindowPos = marker.position;
        this.infoContent = marker.markerInfo;
        console.log(this.infoWindowPos);

        //check if its the same marker that was selected if yes toggle
        if (this.currentMarkerIndex == index) {
          this.infoWinOpen = !this.infoWinOpen;
        }
        //if different marker set infowindow to open and reset current marker index
        else {
          this.infoWinOpen = true;
          this.currentMarkerIndex = index;
        }
      },
      //prompts the user to use the location of his/her device and moves to that position if allowed
      geolocate: function () {
        navigator.geolocation.getCurrentPosition((position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        });
      },
      // method gets called when a user searches using the search bar
      goToSearchResult: function (searchResult) {
        this.currentLocation = searchResult;
        console.log(this.currentLocation)
        console.log("above is current location after search")
        let currentLat = this.currentLocation.geometry.location.lat()
        let currentLng = this.currentLocation.geometry.location.lng()
        this.$refs.map.$mapPromise.then((map) => {
          map.panTo({ lat: currentLat, lng: currentLng })
        })
      },
      // write method to load all workopportunities where the map


    }
  }
</script>

<style>
  .vue-map-container {
    height: 450px;
    max-width: 992px;
    width: 100%;
  }

  #info_window {
    position: relative;
  }
</style>