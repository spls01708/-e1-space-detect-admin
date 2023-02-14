<template>
    
    <div style="height:100vh;border:0px solid red;margin-top:0em;margin-left:0em;margin-right:0em;">
    <vue-topprogress ref="topProgress" color="#BF8B67"></vue-topprogress>
    <div id="navbar">  

        <b-row  >
        
            <nav class="nav-top" >       
            
                <a class="nav__link"> 
                    
                    <span class="heading-page" style="font-size:1.5em;color:#FFFFFF;"> SATELLITE ORBIT SIMULATOR </span>
                     
                </a>

            </nav>
        </b-row>
    </div>
    <!-- ------------------------------------------------------------------------ -->
    <main class="site-wrapper">

         <!-- <main id="cesiumContainer" style="height:calc(100vh - 30px);"> </main> -->
         
    </main>
     

    <div class="footer">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <nav class="nav" style="height:80px;" >
 

        <div class="nav__link" > 
           <i class="material-icons nav__icon nav__link--active" >satellite_alt</i>
            
           <span class="nav__text text-danger font-weight-bold" >Satellite</span>
        </div> 

        <div class="nav__link" style="cursor:pointer;"> 
           <i class="material-icons nav__icon" >cloud_upload</i>
            
           <span class="nav__text" >Upload</span>
        </div>

        <div class="nav__link" > 
           <i class="material-icons nav__icon" style="color:#b5b5b5;" >do_not_touch </i>
            
           <span class="nav__text" style="color:#b5b5b5;" >Wait</span>
        </div>       
         
        <div class="nav__link"> 
           <i class="material-icons nav__icon" style="color:#b5b5b5;" >do_not_touch</i>
            
           <span class="nav__text" style="color:#b5b5b5;" >Wait</span>
        </div>

        <router-link to="/" class="nav__link">
            <i class="material-icons nav__icon" >logout</i>
            <span class="nav__text">Logout</span>
        </router-link>
        
        
       
        </nav>
    </div>

    <!-- --------------------------------------------------------------------------------------------------------------------- -->

        <b-modal v-model="login_error" size="sm"  centered no-close-on-backdrop hide-header hide-header-close  title="Login" 
            
        
        >
            <div class="row text-center text-danger" style="margin-top:2em;"> 
              
                <span style="font-size:4em;"><i class="fa fa-exclamation-triangle" ></i></span>
                <span style="font-size:1em;margin-top:0.5em;"> Error, {{error_log}} </span>

              
            </div>

            <template v-slot:modal-footer="{ }"> 
                <b-button variant="danger" @click="login_error=false" block class="rounded-0 ">
                    <i class="fa fa-window-close" aria-hidden="true"></i> Exit
                </b-button>
            </template>
        </b-modal>

         

    <!-- -----------------------------------------------------------------------------------------------------------------------------------     -->
    <b-modal v-model="data_open" dialog-class="modal-xl-1" centered  hide-footer hide-header hide-header-close  title="info"   >
        
      <b-row>
         
         
      </b-row>

      <template v-slot:modal-footer="{ }">  
        <b-row  class="w-100" style="margin-bottom:1em;">  
          <b-col cols="3">
             
            <!-- <button class=" mt-1 btn btn-outline-success rounded-0 w-100 border-2" @click="change_user_pass_open=true" ><i class="fa fa-key" aria-hidden="true"></i><span style="margin-left:5px;"> Change Secret key  </span></button> -->
          </b-col>
          <b-col  cols="3"></b-col>
          <b-col  cols="3">
             
          </b-col>

          <b-col  cols="3">
           
            <!-- <button class="mt-1 btn btn-outline-dark rounded-0 w-100 border-2" @click="data_open=false" ><i class="fa fa-window-close"></i><span style="margin-left:5px;"> Close </span></button> -->
          </b-col>
        </b-row>
      </template>


    </b-modal> 
    <b-modal v-model="progress_open" size="lg"  centered no-close-on-backdrop hide-header hide-footer  hide-header-close  title="info">

      <div class="row text-center" >
        <div class="col-xl-12 col-sm-12 col-12" >

          <!-- <img :src="require('@/assets/gozila.gif')" height="60"/> -->
          
        </div>
      </div>
      <div class="row text-center mt-1" >
        <div class="col-xl-12 col-sm-12 col-12" >
          
          <span> Wait Until Data Progress Finished</span>

        </div>
      </div>

      
    </b-modal>

    <b-modal v-model="process_ok" size="sm"  centered no-close-on-backdrop hide-header hide-header-close  title="Login"  >
            <div class="row text-center text-success" style="margin-top:2em;"> 
              
                <span style=" font-size:4em;"><i class="far fa-check-circle" ></i></span>
                <span style=" font-size:1em;margin-top:0.5em;"> Process-Complete </span>

                <span style=" font-size:1em;margin-top:0em;"> ref : {{process_pass_data}} </span>
                 
              
            </div>

            <template v-slot:modal-footer="{ }"> 
                <b-button variant="success" @click="process_ok=false" block class="rounded-0 ">
                    <i class="fa fa-window-close" aria-hidden="true"></i> Close
                </b-button>
            </template>
    </b-modal>
    

    </div>

</template>



<script>

/* eslint-disable */
 

import moment from 'moment'
import Vue from 'vue'
 

var Cesium = require('cesium/Cesium');
require('cesium/Widgets/widgets.css');
 
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'  

const { encrypt_js } = require('../encrypt_modules_js');
const { server_publicKey } = require('../server_publicKey');

import {socket_io} from '../socket_io_modules'
  

import { vueTopprogress } from 'vue-top-progress'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
import axios from 'axios'
import myConfig from '../config.js'
   
 

export default {
  name: 'calendar',
  components: {
		vueTopprogress,
     

	},
  data() {
            return { 
                  socket:[],  
                  currentPage: 1,
                  perPage: 8,
                  totalRows:0,
                  login_ok:false,
                  process_ok:false,
                  process_pass_data:'',
                  login_error:false,
                  regiter_ok:false,
                  logs_error:false,
                  logs_error_messages:'',
                  register_open:false,
                   
                  
                  sat_entities : [

                    { name : "thaicom4", tle : false, path : false, footprints : false, cc : 0 , click_position : null },
                    { name : "thaicom6", tle : false, path : false, footprints : false, cc : 0 , click_position : null },
                    { name : "thaicom8", tle : false, path : false, footprints : false, cc : 0 , click_position : null }

                  ],
                  data_open : false, 
               
            }
              
    },
        
    
    methods: {
        
          
         
    
    },
    mounted() {
 
         
        
    },
    watch: {

         
         
        
    },
    computed: {
        
         

    },
    created() {
      
    },
    beforeDestroy() {
        
        setTimeout(() => {

            this.socket.forEach((_socket) => {

                _socket.client_disconnect()

            })

        } , 100);

    },
    
    
}
 
function generateChallenge(){
    let text = "";
    let possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";

    for (var i = 0; i < 20; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

</script>

<!-- menu design will like this concept. The creator has used a hexagon => https://codepen.io/uiswarup/pen/dyyqaGR -->
<style scoped>
 

#navbar {
  overflow: hidden;
   
}
 

</style>

<style lang="scss">
/* bootstrap-vue modal border-radius */

.modal-dialog {
  
   

  .modal-content {
    
    border-radius: 0px;
    // border: 2px solid #979595; 
  } 

}

.modal-xl-1 {
    max-width: 98% !important;
    
}

</style>
  

<style>
    @import "../../assets/style.css";

</style>

<style>
    @import "https://pro.fontawesome.com/releases/v5.10.0/css/all.css";
</style>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
 
.new_job_btn{
  position: relative;
  padding: 10px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 1);
  margin: 40px;
  text-decoration: none;
  transition: 1s;
  border-radius: 0px;
  overflow: hidden;
  -webkit-box-reflect: below 1px linear-gradient(transparent, transparent, #0004);
  width: 100%; 
  
  /* left:37%; */
}
.new_job_btn:hover{
  background: var(--clr);
  box-shadow: 0 0 10px var(--clr),
              0 0 30px var(--clr),
              0 0 60px var(--clr),
              0 0 0px var(--clr);
}
.new_job_btn:before{
  content: '';
  position: absolute;
  width: 40px;
  /* height: 40000%; */
  background: var(--clr);
  transition: 1s;
  animation: animate 2s linear infinite;
  animation-delay: calc(0.33s * var(--1));
}
.new_job_btn:hover:before{
  width: 120%;
}
@keyframes animate{
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
.new_job_btn:after{
  content: '';
  position: absolute;
  inset: 4px;
  background: #0A75AD;
}
.new_job_btn:hover:after{
  background: var(--clr);
}
.new_job_btn span{
  position: relative;
  z-index: 1;
  font-size: 1em;
  color: #fff;
  opacity: 0.5;
  text-transform: uppercase;
  letter-spacing: 5px;
  transition: 0.5s;
}
.new_job_btn:hover span{
  opacity: 1;
}
</style>