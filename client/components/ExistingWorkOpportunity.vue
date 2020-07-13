<template>
  <div>
    <div>
      {{ marker.markerInfo }}
    </div>
    <div>
      {{ marker.location }}
    </div>
    <button id="apply-button">Apply</button>
  </div>
</template>

<script>
export default {
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
    },
  },
};
</script>
