<template>
  <div>
    <div>
      {{ marker.markerInfo }}
    </div>
    <div>
      {{ marker.location }}
    </div>
    <div>
      {{ marker.markerID }}
    </div>
    <button id="apply-button" @click="applyToWorkOpportunity">Apply</button>
  </div>
</template>

<script>
//eslint-disable-next-line
import api from "../services/api.js";

export default {
  data() {
    return {
      currentUser: {},
    };
  },
  computed: {
    user: {
      get() {
        return this.$store.getters.getUser;
      },
    },
  },
  name: "ExistingWorkOpportunity",
  props: {
    marker: {
      markerInfo: {
        type: String,
      },
      location: {
        type: Object,
      },
      newMarker: {
        type: Boolean,
      },
      markerID: {
        type: String,
      },
    },
  },
  methods: {
    //here we should patch the WO which the user wants to apply to in order to add that user to a collection of "people who have applied for this WO"
    // in the DB, and the payload needs to be the user ID and info with what it needs to patch??
    applyToWorkOpportunity: function() {
      //api.patchWorkopportunity(marker.markerID, userID)
      console.log("PATCHING PATCHING...");
      if (this.user.id !== undefined) {
        console.log(this.user.id, "is true");
        console.log(this.marker.markerID);
        console.log(this.user, "get user");
        let payload = {
          $addToSet: {
            applicants: this.user,
          },
        };

        //let payload_stringified = JSON.stringify(payload);
        api.patchWorkopportunity(this.marker.markerID, payload);
      } else {
        console.log(this.user, "is false");
      }
    },
  },
};
</script>
