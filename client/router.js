import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Home from './views/Home'
import Register from './views/Register'
import Profile from './views/Profile'
import EditUserProfile from './views/EditUserProfile'
import Application from './views/Application'

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
      component: Application
    },
    {
      path: '/edituserprofile',
      name: 'EditUserProfile',
      component: EditUserProfile
    }
  ]
});

export default router;