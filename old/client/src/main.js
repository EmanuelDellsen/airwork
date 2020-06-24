
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

console.log(process.env)
console.log(Vue.version)

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_KEY,
    libraries: "places"
  }
});

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');