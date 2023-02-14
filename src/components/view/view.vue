<template>
    
    <div style="height:100vh;border:0px solid red;margin-top:0em;margin-left:0em;margin-right:0em;">
    <vue-topprogress ref="topProgress" color="#BF8B67"></vue-topprogress>
    
    <!-- ------------------------------------------------------------------------ -->
    <main class="site-wrapper">

         <main id="cesiumContainer" style="height:calc(100vh - 30px);"> </main>
         
    </main>
    <div class="footer" style="height:30px;">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
         
        <p class="heading-page" style="font-size:14px;font-weight:bold;float:right;margin-right:20px;">
           
            <span style="font-weight:bold;">SATELLITE ORBIT SIMULATOR ©2022</span> 
        </p> 

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
   

var viewer=null
var scene=null
var clock_start = false
let cct=0
let current_time=0
let current_czml_date=[]
let current_clock_multiplier = 5

let _cesium_custom_class = null

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
        
         async init(){

              Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZDkxNGFiZS05NDg4LTQyMTgtYWE5Zi1iOGRlYzgwODA2Y2UiLCJpZCI6MTg1NjMsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NzQwNjQ2MzF9._3UL4I-FEDzk_mJK7y-4WmUVN4KcojFHI2iXZw-ZLpk';
  
              viewer = new Cesium.Viewer('cesiumContainer',{
                animation: true, // Whether to display the animation control
                shouldAnimate: true,
                homeButton: true, // Whether to display the Home button
                fullscreenButton: true, // Whether to display the full screen button
                baseLayerPicker: true, // Whether to display the layer selection control
                geocoder: false, // Whether to display the place name lookup control
                timeline: true, // Whether to display the timeline control
                sceneModePicker: true, // Whether to display the projection mode control
                navigationHelpButton: false, // Whether to display the help information control
                infoBox: true, // Whether to display the information displayed after clicking the feature
                requestRenderMode: true, // Enable request rendering mode
                scene3DOnly: false, // Each geometry instance will only be rendered in 3D to save GPU memory
                sceneMode: 3, // Initial scene mode 1 2D mode 2 2D loop mode 3 3D mode Cesium.SceneMode
                fullscreenElement: document.body,
                
                
              });
              
              
              scene = viewer.scene;
              scene.postUpdate.addEventListener(icrf);

              viewer.cesiumWidget.creditContainer.style.display = 'none'  // remove Logo

              viewer.entities.add({
                        name : 'ดอนเมือง',
                    
                        position: Cesium.Cartesian3.fromDegrees(100.5658954,13.9040277),
                        ellipse : {
                            // semiMinorAxis : 1000000.0,
                            // semiMajorAxis : 800000.0,
                            // material : Cesium.Color.RED.withAlpha(0.8),
                            // outline : true,
                            // outlineColor:Cesium.Color.RED.withAlpha(0.3),
                            // show:false,
                            // fill:false
                            semiMinorAxis : 100000.0,
                            semiMajorAxis : 100000.0,
                            material : Cesium.Color.RED.withAlpha(0.5)
                            
                        }
              });
              
              let extent = Cesium.Rectangle.fromDegrees(97.363442,4.883486,106.083065,21.013188);
              Cesium.Camera.DEFAULT_VIEW_RECTANGLE = extent;
              Cesium.Camera.DEFAULT_VIEW_FACTOR = 3;

              viewer.scene.debugShowFramesPerSecond = true;
                
              viewer.camera.flyHome(0)

              // -------------------------------------------------------------------------------------------
              let handler_1 = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
              handler_1.setInputAction((movement) => {
                
                let pickedObject = viewer.scene.pick(movement.position); 

                this.fn_handler_1( pickedObject )

              }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
              

         },
         fn_handler_1( obj ){

          //  console.log( obj )
          this.process_ok = true

         }
         
    
    },
    mounted() {

         
         this.init()
         
        
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

function icrf(scene, time) {
  
    if (scene.mode !== Cesium.SceneMode.SCENE3D) {
        return;
    }

    let icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time);
    if (Cesium.defined(icrfToFixed)) {
        let camera = viewer.camera;
        let offset = Cesium.Cartesian3.clone(camera.position);
        let transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed);
        camera.lookAtTransform(transform, offset);
    }
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
  background-color: navy;
  
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