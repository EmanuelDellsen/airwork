import Vue from 'vue';
import Vuex from 'vuex';

import api from "./services/api";

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    access_token: localStorage.getItem('token') || '',
    user: {},
    status: '',
  },

  getters: {
    isUserLoggedIn: function (state) {
      if (state.access_token != '' && state.user != {}) {
        console.log(state.access_token, state.user, "in true in isuserloggedin")
        return true;
      } else {
        console.log(state.access_token, state.user, "in false in isuserloggedin")

        return false;
      }
    },

    authorizedState: state => state.status,
    user: state => state.user,
    access_token: state => state.token
  },

  actions: {
    authenticateUser({ commit }, provider) {
      commit('auth_request');
      console.log(provider, "store");
      let user = {}
      this.$auth.authenticate(provider)
        .then(res => {
          console.log(res, "inside authenticate promise")
          const token = res.data.access_token;
          localStorage.setItem('token', token);
          api.getUserInfo(token).then(res => {
            console.log(res, "inside getuserinfo promise")
            user = res;
          }).catch(err => {
            console.log(err, "error from getuserinfo")
          });
          commit('auth_success', { token, user });
        }).catch(err => {
          console.log(err, "error from authenticate")
          commit('auth_error', err);
          localStorage.removeItem('token');
        })

    },
    logoutUser({ commit }) {
      
        commit('logout');
        localStorage.removeItem('token');
      
    },
    setUser: ({commit, state}, user) =>{
      commit("SET_USER", user)
      return state.user;
    },
    setAuthSuccess: ({commit, state}, token) => {
      commit("SET_AUTH_SUCCESS", token);
      localStorage.setItem('token', token);

      return state.token;
    }

   
  },


  mutations: {
    SET_USER: (state, user ) => {
      state.user = user;
    },
    auth_request(state) {
      state.status = 'loading';
    },
    SET_AUTH_SUCCESS(state,  token ) {
      console.log(token, "inside auth success")

      state.status = 'success';
      state.access_token = token;
    },
    auth_error(state) {
      state.status = 'error';
      state.toast = 'error';
    },
    logout(state) {
      state.access_token = '';
      state.status = '';
      state.user= {}
      console.log(state.access_token)
      console.log(state.status)
      console.log(state.user)


    }
  }
});

 /*login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({
          url: 'http://localhost:3000/api/users-auth/',
          data: user,
          method: 'POST'
        })
          .then(res => {
            console.log(res.data);
            const token = res.data.token;
            const user = res.data.user;

            localStorage.setItem('token', token);
            axios.defaults.headers.common['x-auth-token'] = token;

            commit('auth_success', { token, user });
            Vue.toasted
              .success('Succesfully logged in!', { position: 'bottom-center' })
              .goAway(3000);
            resolve(res);
          })
          .catch(err => {
            commit('auth_error', err);
            localStorage.removeItem('token');
            Vue.toasted
              .error('Failed to login', { position: 'bottom-center' })
              .goAway(3000);
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({
          url: 'http://localhost:3000/api/users/',
          data: user,
          method: 'POST'
        })
          .then(res => {
            const token = res.data.token;
            const user = res.data.user;
            console.log(res.data.user, res.data.token + "inside register then")

            localStorage.setItem('token', token);
            axios.defaults.headers.common['x-auth-token'] = token;
            commit('auth_success', { token, user });
            Vue.toasted
              .success('Succesfully registered user!', {
                position: 'bottom-center'
              })
              .goAway(3000);
            resolve(res);
          })
          .catch(err => {
            commit('auth_error', err);
            localStorage.removeItem('token');
            Vue.toasted
              .error('Failed to register user', { position: 'bottom-center' })
              .goAway(3000);
            reject(err);
          });
      });
    }, 
    
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
        Vue.toasted
          .info('Succesfully logged out!', { position: 'bottom-center' })
          .goAway(3000);
        resolve();
      });
    }
*/