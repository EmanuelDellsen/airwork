<template>
  <div id="wrapper">
    <GmapMap id="map" ref="map" :center="this.center" :zoom="11" map-type-id="terrain" style="position:relative"
      @click="getClickinfo" :options="mapOptions">
      <gmap-marker :key="key" v-for="(item, key) in markers" :position="item.location" :clickable="true"
        @click="toggleInfoWindow(item, key)"></gmap-marker>
      <gmap-info-window id="info_window" :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen"
        @closeclick="infoWinOpen = false">
        <CreateWorkOpportunity v-if="currentMarker !== null && currentMarker.newMarker" v-bind:marker="currentMarker">
        </CreateWorkOpportunity>
        <ExistingWorkOpportunity v-else v-bind:marker="currentMarker"></ExistingWorkOpportunity>
      </gmap-info-window>
    </GmapMap>

    <button id="getWorkOpportunities" @click="getWorkOpportunities">
      Search area
    </button>
  </div>
</template>

<script>
  import { gmapApi } from "vue2-google-maps";
  import api from "../services/api.js";
  import CreateWorkOpportunity from "./CreateWorkOpportunity.vue";
  import ExistingWorkOpportunity from "./ExistingWorkOpportunity.vue";

  export default {
    name: "Map",
    props: {
      searchResult: Object,
    },
    components: {
      CreateWorkOpportunity,
      ExistingWorkOpportunity,
    },
    computed: {
      google: gmapApi,
    },
    watch: {
      searchResult: function () {
        console.log("searchResult changed and is now: ");
        console.log(this.searchResult);
        this.goToSearchResult(this.searchResult);
      },
    },
    data() {
      return {
        map: null,
        mapOptions: {
          disableDefaultUI: true,
        },
        markers: [],
        markersWithinBoundary: [],
        places: [],
        center: { lat: 10, lng: 10 },
        newMarker: null,
        currentLocation: null,
        currentMarkerIndex: null,
        currentMarker: null,
        infoWindowPos: null,
        infoWinOpen: false,
        workOpportunityInformation: false,
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
        console.log(location)
        this.currentLocation = location;
        this.addMarker();
        console.log(this.currentLocation, "inside getClickInfo");
      },
      // add a markers on the current location which is set when a user clickes the map
      addMarker: function () {
        var geocoder = new this.google.maps.Geocoder();
        var location = this.currentLocation.latLng;
        var formatted_address = "";
        let marker = {};
        let markers = this.markers;
        geocoder.geocode({ 'location': location }, function (results, status) {
          if (status == 'OK') {
            formatted_address = results[0].formatted_address;
            marker = {
              location: {
                lng: location.lng(),
                lat: location.lat()
              },
              formattedAddress: formatted_address,
              markerInfo: "Here detailed info will be",
              newMarker: true,
            };
            //crazy problem unless double declaration this=that level
            markers.push(marker);
            this.markers = markers;
            this.currentMarker = marker;
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });

      },
      getWorkOpportunities: async function () {
        console.log("moved the map now");
        let bounds = this.$refs.map.$mapObject.getBounds();
        console.log(bounds);
        let southWest = bounds.getSouthWest();
        let northEast = bounds.getNorthEast();
        // will be used to query the correct workopportunities to then be plotted on the map within these boundaries
        let southWestLng = southWest.lng();
        let southWestLat = southWest.lat();
        let northEastLat = northEast.lat();
        let northEastLng = northEast.lng();
        // this "box" will be used as parameters to get the WO's that is located where the user is

        var boundingBox = {
          point1: [southWestLng, southWestLat],
          point2: [northEastLng, northEastLat],
        };
        try {
          this.markersWithinBoundary = await api.getAllWorkopportunity_withinLocation(
            boundingBox
          );
          console.log(this.markersWithinBoundary);
          console.log(boundingBox);
          this.updateWorkOpportunities();
        } catch (error) {
          //add more error reponse checks and provide user with correct toast/message
          if (error.response.status === 404) {
            console.log("no WOs found");
          }
        }
      },
      updateWorkOpportunities: function () {
        for (let i = 0; i < this.markers.length; i++) {
          this.markers[i] = null;
        }
        this.markers = [];
        console.log(this.markersWithinBoundary);

        for (let i = 0; i < this.markersWithinBoundary.length; i++) {
          if (this.markersWithinBoundary[i].coordinates !== undefined) {
            console.log(this.markersWithinBoundary[i]);
            console.log("marker got location");
            let marker = {
              location: {
                lng: this.markersWithinBoundary[i].coordinates.lng,
                lat: this.markersWithinBoundary[i].coordinates.lat,
              },
              markerInfo: this.markersWithinBoundary[i].title,
              newMarker: false,
              markerID: this.markersWithinBoundary[i]._id,
            };
            this.markers.push(marker);
            console.log("marker after push");
            console.log(this.markersWithinBoundary[i]);
          } else {
            console.log(this.markersWithinBoundary[i]);
            console.log("marker is unfinished");
          }
        }
        console.log("after adding new markers");
        console.log(this.markers);
      },
      // gets the location of the marker the user has clicked on
      getLocation: function (marker) {
        console.log(marker.location.lat);
        console.log("inside getlocation");
        console.log(this.markers.length);

        return {
          lng: this.currentMarker.location.lng,
          lat: this.currentMarker.location.lat,
        };
      },
      // this methods gets called when a user presses a marker to open that markers information
      toggleInfoWindow: function (marker, index) {
        this.currentMarker = marker;
        console.log(marker);
        this.infoWindowPos = marker.location;
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
        console.log(this.currentLocation);
        console.log("above is current location after search");
        let currentLat = this.currentLocation.geometry.location.lat();
        let currentLng = this.currentLocation.geometry.location.lng();
        this.$refs.map.$mapPromise.then((map) => {
          map.panTo({ lat: currentLat, lng: currentLng });
          map.setZoom(15);
        });
      },
      // write method to load all workopportunities where the map
    },
  };
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

  #wrapper {
    position: relative;
  }

  #getWorkOpportunities {
    position: absolute;
    top: 10px;
    left: 25%;
    z-index: 5;
    background-color: #fff;
    padding: 5px;
    border: 1px solid #999;
    text-align: center;
    font-family: "Roboto", "sans-serif";
    line-height: 30px;
    padding-left: 10px;
  }
</style>