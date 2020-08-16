import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Home from './views/Home'
import Register from './views/Register'
import Profile from './views/Profile'
import EditUserProfile from './views/EditUserProfile'
import Applications from './views/Applications'
import LoggedOut from './views/LoggedOut'


Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/applications',
      name: 'Applications',
      component: Applications
    },
    {
      path: '/edituserprofile',
      name: 'EditUserProfile',
      component: EditUserProfile
    },
    {
      path: '/loggedout',
      name: 'LoggedOut',
      component: LoggedOut
    }
  ]
});

export default router;