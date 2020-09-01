import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Home from './views/Home'
import Register from './views/Register'
import Profile from './views/Profile'
import EditUserProfile from './views/EditUserProfile'
import Applications from './views/Applications'
//import LoggedOut from './views/LoggedOut'
import InviteMember from './views/InviteMember'

import store from './store.js'


Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/applications',
    name: 'Applications',
    component: Applications,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edituserprofile',
    name: 'EditUserProfile',
    component: EditUserProfile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/invitemember',
    name: 'InviteMember',
    component: InviteMember,
    meta: {
      requiresAuth: true
    }
  }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isUserLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router;