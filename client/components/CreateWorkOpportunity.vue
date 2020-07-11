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
        <label for="timeOfStart">Time you will start</label>
        <input id="timeOfStart" type="timeOfStart" placeholder="Time you will start" name="timeOfStart"
          v-model="timeOfStart" class="form-control" />
      </div>
      <div class="form-group">
        <label for="hoursOfWork">Hours of work</label>
        <input id="hoursOfWork" type="hoursOfWork" placeholder="Hours of work" name="hoursOfWork" v-model="hoursOfWork"
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

  import api from "../services/api.js";

  export default {
    name: "CreateWorkOpportunity",
    props: {
      marker: {
        markerInfo: {
          type: String,
        },
        location: {
          type: Object,
        },
        newMarker: {
          type: Boolean
        }
      },
    },
    data() {
      return {
        typeOfWork: "",
        paymentAmount: "",
        dateOfWork: "",
        timeOfStart: "",
        hoursOfWork: "",
        workDescription: "",
        geoLocation: {},
      };
    },

    methods: {
      createWorkOpportunity: function () {
        console.log(this.marker)

        let workOpportunity = {
          typeOfWork: this.typeOfWork,
          paymentAmount: this.paymentAmount,
          dateOfWork: this.dateOfWork,
          timeOfStart: this.timeOfStart,
          hoursOfWork: this.hoursOfWork,
          workDescription: this.workDescription,
          geoLocation: this.marker.location,
        };
        console.log(workOpportunity)
        console.log(this.marker)

        api.postWorkopportunity(workOpportunity)

      },
    },
  };
</script>