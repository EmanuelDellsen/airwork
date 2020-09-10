//require('dotenv').config()
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue';
import * as VueGoogleMaps from "vue2-google-maps"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios';
import Vuex from 'vuex';

Vue.use(Vuex);

Vue.use(VueAxios, axios)

Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:5000', // Your API domain
  providers: {
    github: {
      clientId: '',
      redirectUri: 'http://localhost:8080/auth/callback' // Your client app URL
    },
    facebook: {
      clientId: '',
      redirectUri: 'http://localhost:8080/auth/callback' // Your client app URL
    },
    google: {
      clientId: '959050314740-tp2715mje7rqf8urc8vgcteruf74ok99.apps.googleusercontent.com',
      redirectUri: 'http://localhost:8080/auth/callback' // Your client app URL
    }
  }
})


Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_API,
    libraries: "places"
  }
});

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');