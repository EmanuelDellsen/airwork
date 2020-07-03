<template>
  <div>
    <h1>Search bar component here?</h1>

    <GmapMap ref="map" :center="{lat:10, lng:10}" :zoom="7" map-type-id="terrain" style="width: 500px; height: 300px"
      @click="getClickinfo">
      <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen"
        @closeclick="infoWinOpen=false">
        <button type="button" style="background-color: pink;">
          {{this.infoContent}}
        </button>
        <ApplicationInfo></ApplicationInfo>
      </gmap-info-window>
      <gmap-marker :key="key" v-for="(item, key) in markers" :position="getPosition(item)" :clickable="true"
        @click="toggleInfoWindow(item, key)"></gmap-marker>
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
        infoWinOpen: false,
        applicationInfoWindowOpen: false,
        infoContent: '',
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
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
          position: {
            lat: this.currentLocation.latLng.lat(),
            lng: this.currentLocation.latLng.lng()
          },
          markerInfo: "Here detailed info will be"
        };
        //this.markers.push({ position: marker });
        //this.places.push(this.currentLocation);
        this.markers.push(marker)
        console.log(this.markers)
      },
      getPosition: function (marker) {

        this.currentMarker = marker;
        return {
          lat: this.currentMarker.position.lat,
          lng: this.currentMarker.position.lng

        }

      },
      toggleInfoWindow: function (marker, idx) {

        console.log(marker)
        this.infoWindowPos = marker.position;
        this.infoContent = marker.markerInfo;
        console.log(this.infoWindowPos)

        //check if its the same marker that was selected if yes toggle
        if (this.currentMarkerIndex == idx) {
          this.infoWinOpen = !this.infoWinOpen;
        }
        //if different marker set infowindow to open and reset current marker index
        else {
          this.infoWinOpen = true;
          this.currentMarkerIndex = idx;

        }
        console.log("inside toggleinfowindow")
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