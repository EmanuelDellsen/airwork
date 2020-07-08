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
    async refreshWorkopportunities() {
      this.alldata = await api.getAllWorkopportunity();
      /*eslint-disable*/
      console.log(this.alldata);
    },
  },
};
</script>
