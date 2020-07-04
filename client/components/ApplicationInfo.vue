<template>
  <div class="card-body">
    <div>{{ marker }}</div>
    <form @submit.prevent="createJobOpportunity">
      <div class="form-group">
        <label for="typeOfJob">Type of job</label>
        <input
          id="typeOfJob"
          type="text"
          placeholder="What type of job is this?"
          name="typeOfJob"
          v-model="typeOfJob"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="paymentAmount">Payment in SEK</label>
        <input
          id="paymentAmount"
          type="number"
          placeholder="Payment in SEK"
          name="paymentAmount"
          v-model="paymentAmount"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="dateOfWork">Date</label>
        <input
          id="dateOfWork"
          type="date"
          placeholder="Date"
          name="date"
          v-model="dateOfWork"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="timeOfWork">Time you will work</label>
        <input
          id="timeOfWork"
          type="timeOfWork"
          placeholder="Time of work"
          name="timeOfWork"
          v-model="timeOfWork"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="jobDescription">Job description</label>
        <input
          id="jobDescription"
          type="text"
          placeholder="Job description"
          name="jobDescription"
          v-model="jobDescription"
          class="form-control"
        />
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
  name: "ApplicationInfo",
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
      typeOfJob: "",
      paymentAmount: "",
      dateOfWork: "",
      timeOfWork: "",
      jobDescription: "",
      geoPosition: {},
    };
  },

  methods: {
    createJobOpportunity() {
      let jobOpportunity = {
        typeOfJob: this.typeOfJob,
        paymentAmount: this.paymentAmount,
        dateOfWork: this.dateOfWork,
        timeOfWork: this.timeOfWork,
        jobDescription: this.jobDescription,
        geoPosition: this.marker.position,
      };
      console.log(jobOpportunity);
      console.log(this.currentMarker);
    },
  },
};
</script>
