//Based on: https://developer.okta.com/blog/2018/02/15/build-crud-app-vuejs-node

//import Vue from 'vue'
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:5000/",
  json: true
});

//Centralizing API integrations
export default {
  async execute(method, resource, data) {

    //inject the accessToken for each request
    //let accessToken = await Vue.prototype.$auth.getAccessToken()

    return client({
      method,
      url: resource,
      data
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
    return this.execute("get", "/workopportunity");
  },
  getWorkopportunity(id) {
    return this.execute("get", `/workopportunity/${id}`);
  },
  postWorkopportunity(payload) {
    return this.execute("post", "/workopportunity", payload);
  },
  patchWorkopportunity(id, payload) {
    return this.execute("put", `/workopportunity/${id}`, payload);
  },
};
