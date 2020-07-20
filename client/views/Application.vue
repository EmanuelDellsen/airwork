<template>
  <div>
    <div id="myWorkOpportunities" :key="key" v-for="(item, key) in myWorkOpportunities">
      <div>
        {{item.title}}
      </div>
      <div>
        {{item.location}}
      </div>
      <div>
        {{item.company}}
      </div>
      <div>
        {{item.startDate}} {{item.endDate}}
      </div>
      <div>
        {{item.jobTimeInHours}}
      </div>
      <div>
        {{item.pay}}
      </div>
      <div>
        {{item.description}}
      </div>
      <div>
        {{item._id}}
      </div>
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
          startDate = startDateYear + '/' + startDateMonth + '/' + startDateDay

          // only keep the year, month and day from date object
          let endDateYear = endDate.getFullYear()
          let endDateMonth = endDate.getMonth() + 1
          let endDateDay = endDate.getDay()
          endDate = endDateYear + '/' + endDateMonth + '/' + endDateDay

          console.log(startDate, endDate, jobTimeInHours)
          let myApplication = {
            title: dataList[i].title,
            location: dataList[i].coordinates,
            company: dataList[i].company,
            startDate: startDate,
            endDate: endDate,
            jobTimeInHours: jobTimeInHours,
            payment: dataList[i].pay,
            description: dataList[i].description,
            myApplicationID: dataList[i]._id
          }
          this.myWorkOpportunities.push(myApplication)

        }
        console.log(this.myWorkOpportunities)

      },
      displayWorkOpportunities: function () {


      }
    },
  };
</script>