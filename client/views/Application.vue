<template>
  <div>
    <p>hello manne it was the break u know it</p>
    <p>open the console and take a look at the data</p>
  </div>
</template>

<script>
import api from "../services/api.js";

export default {
  data() {
    return {
      alldata: [],
    };
  },
  created() {
    this.refreshWorkopportunities();
  },
  methods: {
    //add possibility to use form gte and other options
    async refreshWorkopportunities() {
      var box = {
        point1 : [0,0],
        point2 : [9,9]
      }
      this.alldata = await api.getAllWorkopportunity_withinLocation(box);
      /*eslint-disable*/
      console.log(this.alldata);
    },
  },
};
</script>
