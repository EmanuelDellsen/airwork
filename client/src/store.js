/*import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    user: {},
    status: ''
  },

  getters: {
    isUserLoggedIn: function(state) {
      if (state.token != '') {
        return true;
      } else {
        return false;
      }
    },

    authorizedState: state => state.status,
    user: state => state.user
  },

  actions: {
    login({ commit }, user) {
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
  },

  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, { token, user }) {
      console.log(token, user + "inside auth success") 

      state.status = 'success';
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = 'error';
      state.toast = 'error';
    },
    logout(state) {
      state.token = '';
      state.status = '';
    }
  }
});
*/