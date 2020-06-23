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
//import apiKeys from './client/static/api_key.js'



Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAnZzhFFG1iWdYFeKE4NsZgcb4z1KQkVG0",
    libraries: "places"
  }
});


/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');