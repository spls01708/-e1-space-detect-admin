/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'

import index from './components/main'
 
import admin from './components/users/admin'
 

import manage_users from './components/users/manage'

import view from './components/view/index'
import dashboard from './components/view/dashboard'

import tle from './components/tle/index'
import tle_upload from './components/tle/upload'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'index',
      component: index
    },   
    // {
    //   path: '/users/admin',
    //   name: 'admin',
    //   component: admin
    // }, 
    
     

    // {
    //   path: '/users/manage',
    //   name: 'manage_users',
    //   component: manage_users
    // }, 

    // {
    //   path: '/view',
    //   name: 'view',
    //   component: view
    // }, 

    {
      path: '/tle',
      name: 'tle',
      component: tle
    },

    {
      path: '/tle/upload',
      name: 'tle_upload',
      component: tle_upload
    },

    // {
    //   path: '/dashboard',
    //   name: 'dashboard',
    //   component: dashboard
    // },

    
              

  ]
})