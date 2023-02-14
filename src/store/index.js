/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    open_upload : false,  
    tle_data : {},  
    tle_content : {},
    open_footprint_upload : false,

  },
  mutations: {

    set_open_upload(state, data) {
      state.open_upload = data;
    }, 
    set_tle_data(state, data) {
      state.tle_data = data;
    },
    set_tle_content(state, data) {
      state.tle_content = data;
    },

    set_open_footprint_upload(state, data) {
      state.open_footprint_upload = data;
    },

  },
  actions: {},
  getters: {}
});

