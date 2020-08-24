<template>
  <div>
    <div
      id="myWorkOpportunities"
      :key="key"
      v-for="(item, key) in myWorkOpportunities"
    >
      <h3 class="application-title">
        {{ item.title }}
      </h3>
      <p class="application-info">Where: {{ item.formatted_address }}</p>
      <p class="application-info">Employer: {{ item.company }}</p>
      <p class="application-info">
        When the job starts: {{ item.startDate }} and ends: {{ item.endDate }}
      </p>
      <p class="application-info">Duration: {{ item.jobTimeInHours }} hour</p>
      <p class="application-info">What you recieve: {{ item.payment }} SEK</p>
      <p class="application-info">Description: {{ item.description }}</p>
      <p class="application-info">ID: {{ item.myWorkOpportunityID }}</p>
      <button
        id="removeApplication"
        @click="unapplyFromWorkOpportunity(item, key)"
      >
        Unapply
      </button>
    </div>
  </div>
</template>

<script>
import api from "../services/api.js";

export default {
  data() {
    return {
      alldata: [],
      myWorkOpportunities: [],
      loggedInUser: {},
    };
  },
  computed: {
    user: {
      get() {
        return this.$store.state.user;
      },
    },
  },
  created() {
    this.refreshWorkopportunities();
  },
  methods: {
    refreshWorkopportunities: async function() {
      this.alldata = await api.getAllWorkopportunityWhereUserIsApplicant(
        this.user.id
      );
      /*eslint-disable*/
      console.log(this.alldata, "here is the problem");
      this.parseDataToJSONObject(this.alldata);
    },
    parseDataToJSONObject: function(dataList) {
      for (let i = 0; i < dataList.length; i++) {
        let startDate = Date.parse(dataList[i].start_date_and_time);
        startDate = new Date(startDate);
        let endDate = Date.parse(dataList[i].end_date_and_time);
        endDate = new Date(endDate);

        // In order to convert to the correct time which a person will work you need to subtract the start time from end time and divide by 1000
        // by doing this you get the difference in seconds so you need to divide by 60 and then 60 again to get the hour(s)
        let jobTimeInHours =
          (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60;

        // only keep the year, month and day from date object
        let startDateYear = startDate.getFullYear();
        let startDateMonth = startDate.getMonth() + 1;
        let startDateDay = startDate.getDay();
        let startDateHour = startDate.getHours();
        let startDateMinutes = ("0" + startDate.getMinutes()).slice(-2);
        startDate =
          startDateYear +
          "/" +
          startDateMonth +
          "/" +
          startDateDay +
          " " +
          startDateHour +
          ":" +
          startDateMinutes;

        // only keep the year, month and day from date object
        let endDateYear = endDate.getFullYear();
        let endDateMonth = endDate.getMonth() + 1;
        let endDateDay = endDate.getDay();
        let endDateHour = endDate.getHours();
        let endDateMinutes = ("0" + endDate.getMinutes()).slice(-2);
        endDate =
          endDateYear +
          "/" +
          endDateMonth +
          "/" +
          endDateDay +
          " " +
          endDateHour +
          ":" +
          endDateMinutes;

        console.log(startDate, endDate, jobTimeInHours);
        let myWorkOpportunity = {
          title: dataList[i].title,
          location: dataList[i].coordinates,
          company: dataList[i].company,
          startDate: startDate,
          endDate: endDate,
          jobTimeInHours: jobTimeInHours,
          payment: dataList[i].pay,
          description: dataList[i].description,
          myWorkOpportunityID: dataList[i]._id,
          applicants: dataList[i].applicants,
          formatted_address: dataList[i].formatted_address,
        };
        this.myWorkOpportunities.push(myWorkOpportunity);
      }
      console.log(this.myWorkOpportunities);
    },
    displayWorkOpportunities: function() {},
    unapplyFromWorkOpportunity: function(workOpportunity, index) {
      //classic scope problem
      var self = this;
      var params = {
        $pull: { applicants: this.user.id },
      };
      console.log(params);
      //var params_stringified = JSON.stringify(params);
      api
        .patchWorkopportunity(workOpportunity.myWorkOpportunityID, params)
        .then(function(response) {
          self.$delete(self.myWorkOpportunities, index);
        });
    },
  },
};
</script>

<style>
#myWorkOpportunities {
  padding: 1em;
  border-style: solid;
  border-width: 2px;
  margin: 1em;
}

#removeApplication {
  background-color: #ff312e;
  color: #c4bbaf;
  border-radius: 8px;
}
.application-title {
  font-size: 1.2em;
}
.application-info {
  font-size: 0.8em;
}
</style>
