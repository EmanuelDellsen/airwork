<template>
  <div>
    <div id="myWorkOpportunities" :key="key" v-for="(item, key) in myWorkOpportunities">
      <h3>
        {{item.title}}
      </h3>
      <p>
        Where: {{item.location}}
      </p>
      <p>
        Employer: {{item.company}}
      </p>
      <p>
        When the job starts: {{item.startDate}} and ends: {{item.endDate}}
      </p>
      <p>
        Duration: {{item.jobTimeInHours}} hour
      </p>
      <p>
        What you recieve: {{item.payment}} SEK
      </p>
      <p>
        Description: {{item.description}}
      </p>
      <p>
        ID: {{item.myWorkOpportunityID}}
      </p>
      <button id="removeApplication" @click="unapplyFromWorkOpportunity(item.myWorkOpportunityID)">Unapply</button>
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
      };
    },
    created() {
      this.refreshWorkopportunities();
    },
    methods: {
      refreshWorkopportunities: async function () {
        this.alldata = await api.getAllWorkopportunity();
        /*eslint-disable*/
        console.log(this.alldata);
        this.parseDataToJSObject(this.alldata)
      },
      parseDataToJSObject: function (dataList) {

        for (let i = 0; i < dataList.length; i++) {
          let startDate = Date.parse(dataList[i].start_date_and_time)
          startDate = new Date(startDate)
          let endDate = Date.parse(dataList[i].end_date_and_time)
          endDate = new Date(endDate)

          // In order to convert to the correct time which a person will work you need to subtract the start time from end time and divide by 1000
          // by doing this you get the difference in seconds so you need to divide by 60 and then 60 again to get the hour(s) 
          let jobTimeInHours = ((endDate.getTime() - startDate.getTime()) / 1000) / 60 / 60;

          // only keep the year, month and day from date object
          let startDateYear = startDate.getFullYear()
          let startDateMonth = startDate.getMonth() + 1
          let startDateDay = startDate.getDay()
          let startDateHour = startDate.getHours()
          let startDateMinutes = ('0' + startDate.getMinutes()).slice(-2);
          startDate = startDateYear + '/' + startDateMonth + '/' + startDateDay + ' ' + startDateHour + ':' + startDateMinutes

          // only keep the year, month and day from date object
          let endDateYear = endDate.getFullYear()
          let endDateMonth = endDate.getMonth() + 1
          let endDateDay = endDate.getDay()
          let endDateHour = endDate.getHours()
          let endDateMinutes = ('0' + endDate.getMinutes()).slice(-2);
          endDate = endDateYear + '/' + endDateMonth + '/' + endDateDay + ' ' + endDateHour + ':' + endDateMinutes

          console.log(startDate, endDate, jobTimeInHours)
          let myWorkOpportunity = {
            title: dataList[i].title,
            location: dataList[i].coordinates,
            company: dataList[i].company,
            startDate: startDate,
            endDate: endDate,
            jobTimeInHours: jobTimeInHours,
            payment: dataList[i].pay,
            description: dataList[i].description,
            myWorkOpportunityID: dataList[i]._id
          }
          this.myWorkOpportunities.push(myWorkOpportunity)

        }
        console.log(this.myWorkOpportunities)

      },
      displayWorkOpportunities: function () {


      },
      unapplyFromWorkOpportunity: function (workOpportunityID) {
        console.log(workOpportunityID)
      }
    },
  };
</script>

<style>
  #myWorkOpportunities {
    padding: 1em;
    border-style: solid;
    border-width: 2px;
    margin: 1em
  }

  #removeApplication {
    background-color: red;

  }
</style>