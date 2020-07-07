<template>
  <div class="card-body">
    <div>{{ marker }}</div>
    <form @submit.prevent="createWorkOpportunity">
      <div class="form-group">
        <label for="typeOfWork">Type of work</label>
        <input id="typeOfWork" type="text" placeholder="What type of work is this?" name="typeOfWork"
          v-model="typeOfWork" class="form-control" />
      </div>
      <div class="form-group">
        <label for="paymentAmount">Payment in SEK</label>
        <input id="paymentAmount" type="number" placeholder="Payment in SEK" name="paymentAmount"
          v-model="paymentAmount" class="form-control" />
      </div>
      <div class="form-group">
        <label for="dateOfWork">Date</label>
        <input id="dateOfWork" type="date" placeholder="Date" name="date" v-model="dateOfWork" class="form-control" />
      </div>
      <div class="form-group">
        <label for="timeOfWork">Time you will work</label>
        <input id="timeOfWork" type="timeOfWork" placeholder="Time of work" name="timeOfWork" v-model="timeOfWork"
          class="form-control" />
      </div>
      <div class="form-group">
        <label for="workDescription">Work description</label>
        <input id="workDescription" type="text" placeholder="Work description" name="workDescription"
          v-model="workDescription" class="form-control" />
      </div>

      <!--- default value of button without type will be a submit button
               preferably specify what kind of button it is -->
      <button type="submit" class="btn btn-secondary">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
  export default {
    name: "WorkOpportunityInformation",
    props: {
      marker: {
        markerInfo: {
          type: String,
        },
        position: {
          type: Object,
        },
      },
    },
    data() {
      return {
        typeOfWork: "",
        paymentAmount: "",
        dateOfWork: "",
        timeOfWork: "",
        workDescription: "",
        geoPosition: {},
      };
    },

    methods: {
      createWorkOpportunity() {
        let workOpportunity = {
          typeOfWork: this.typeOfWork,
          paymentAmount: this.paymentAmount,
          dateOfWork: this.dateOfWork,
          timeOfWork: this.timeOfWork,
          workDescription: this.workDescription,
          geoPosition: this.marker.position,
        };
        console.log(workOpportunity);
        console.log(this.currentMarker);
      },
    },
  };
</script>