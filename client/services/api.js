//Based on: https://developer.okta.com/blog/2018/02/15/build-crud-app-vuejs-node
//https://stackoverflow.com/questions/40947650/axios-get-in-url-works-but-with-second-parameter-as-object-it-doesnt

//import Vue from 'vue'
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:5000/",
  json: true,
});

//Centralizing API integrations
export default {
  async execute(method, resource, data, params) {
    return client({
      method,
      url: resource,
      data,
      params,
      /*
            headers : {
                Authorization: `Bearer ${accessToken}`
            }
            */
    }).then((req) => {
      return req.data;
    });
  },

  //Calls from client to server
  getAllWorkopportunity() {
    return this.execute("get", `/workopportunity`, null, null);
  },
  //Calls from client to server
  getAllWorkopportunityWhereUserIsApplicant(userId) {
    console.log(userId, "user id in api.js");
    var params = {
      applicants: {
        $elemMatch: {
          id: userId

        }
      },
    };
    var params_stringified = JSON.stringify(params);
    return this.execute("get", `/workopportunity`, null, params_stringified);
  },
  getAllWorkopportunity_withinLocation(box) {
    //construct parameters
    var params = {
      coordinates: {
        $geoWithin: {
          $box: [box.point1, box.point2],
        },
      },
    };
    //stringify required for proper format
    var params_stringified = JSON.stringify(params);
    return this.execute("get", `/workopportunity`, null, params_stringified);
  },
  getWorkopportunity(id) {
    return this.execute("get", `/workopportunity/${id}`, null, null);
  },
  postWorkopportunity(payload) {
    console.log(payload, "in api.js");
    let start_date_and_time = new Date(payload.dateOfWork + "Z");
    var splitTimeOfStart = payload.timeOfStart.split(":");
    start_date_and_time.setHours(
      splitTimeOfStart[0],
      splitTimeOfStart[1],
      0,
      0
    );
    let workOpportunityHoursInMinutes = Number(payload.hoursOfWork) * 60;
    let end_date_and_time = this.addMinutes(
      start_date_and_time,
      workOpportunityHoursInMinutes
    );
    let newWorkOpportunity = {
      title: payload.typeOfWork,
      start_date_and_time: start_date_and_time,
      end_date_and_time: end_date_and_time,
      coordinates: {
        lng: payload.geoLocation.lng,
        lat: payload.geoLocation.lat,
      },
      formatted_address: payload.formattedAddress,
      pay: Number(payload.paymentAmount),
      description: payload.workDescription,
      creator: payload.creator,
    };
    return this.execute(
      "post",
      "/workopportunity",
      newWorkOpportunity,
      null,
      null
    );
  },
  patchWorkopportunity(id, payload) {
    console.log(payload, "payload");
    console.log(id, "ID");
    return this.execute("patch", `/workopportunity/${id}`, payload, null, null);
  },
  getUserInfo(access_token) {
    return this.execute(
      "get",
      `/auth/userinfo/${access_token}`,
      null,
      null,
      null
    );
  },
  inviteNewUserToAirWork(newUser, loggedInUser) {
    console.log(newUser, " postInviteNewUser");
    let newAndLoggedInUser = {
      newUser: newUser,
      loggedInUser: loggedInUser
    }
    console.log(newAndLoggedInUser, "new and logged in user")
    return this.execute("post", "/user", newAndLoggedInUser, null, null)
  },
  addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  },
};