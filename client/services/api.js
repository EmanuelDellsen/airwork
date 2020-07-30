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
  getAllWorkopportunity_withinLocation(box) {
    //construct parameters
    var params = {
      coordinates: { $geoWithin: { $box: [box.point1, box.point2] } },
    };
    //stringify required for proper format
    var params_stringified = JSON.stringify(params);
    return this.execute("get", `/workopportunity`, null, params_stringified);
  },
  getWorkopportunity(id) {
    return this.execute("get", `/workopportunity/${id}`, null, null);
  },
  postWorkopportunity(payload) {
    return this.execute("post", "/workopportunity", payload, null, null);
  },
  patchWorkopportunity(id, payload) {
    return this.execute("put", `/workopportunity/${id}`, payload, null, null);
  },
  getUserInfo(access_token){
    return this.execute("get",`/auth/userinfo/${access_token}`,null,null,null)
  }
}