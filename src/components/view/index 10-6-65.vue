<template>

    <div style="height:100vh;border:0px solid red;margin-top:0em;margin-left:0em;margin-right:0em;">
    <vue-topprogress ref="topProgress" color="#FF0000"></vue-topprogress>
    <!-- <div id="navbar">
        <b-row  >
        
            <nav class="nav-top" >       
            
                <a class="nav__link">
                    
                    
                    <span class="heading-page " style="font-size:1.5em;color:#FFFFFF"> SSA </span>

                </a>

            </nav>
        </b-row>
    </div> -->
    <!-- ------------------------------------------------------------------------ -->
    <!-- <b-sidebar id="sidebar-1" title="Sidebar" shadow visible no-header lazy>
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        
      </div>
    </b-sidebar> -->
    
    <main id="cesiumContainer" style="height:calc(100% - 30px);"> </main>
    <!-- ------------------------------------------------------------------------ -->
    <div class="footer" style="height:30px;">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <!-- <nav class="nav" style="height:22px;" > -->
        <p class="heading-page" style="font-size:14px;font-weight:bold;float:right;margin-right:10px;">©2022</p> 
        <!-- <router-link to="/users/admin" class="nav__link">
            <i class="material-icons nav__icon" >arrow_back</i>
            
            
        </router-link>

        
        <a class="nav__link" @click="tabs=0"> 
           <i :class="tabs == 0 ? 'material-icons nav__icon nav__link--active' : 'material-icons nav__icon'" >people_alt</i>
            
        </a>

        
 
        
        <router-link to="/" class="nav__link">
            <i class="material-icons nav__icon" >logout</i>
             
        </router-link> -->

       
        <!-- </nav> -->
    </div>

    <!-- --------------------------------------------------------------------------------------------------------------------- -->

          

    </div>

</template>



<script>

/* eslint-disable */

var Cesium = require('cesium/Cesium');
require('cesium/Widgets/widgets.css');
 

// window.CESIUM_BASE_URL = '/';

import moment from 'moment'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// import * as Cesium from 'cesium';
// import "cesium/Build/Cesium/Widgets/widgets.css";
 
import * as tlejs from "tle.js";
var satellite = require('satellite.js');
var czml = require("czml-writer");
var TLE = require( 'tle' )

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

export default {
  name: 'calendar',
  components: {
		vueTopprogress
	},
  data() {
            return {    
                 

                currentPage: 1,
                perPage: 8,
                totalRows:0,
                login_ok:false,
                login_error:false,
                regiter_ok:false,
                logs_error:false,
                logs_error_messages:'',
                register_open:false,
                 
                process_ok:false,
                 
                 
               
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
                  name : 'หอดูดาวดอยอินทนนท์',
                  position: Cesium.Cartesian3.fromDegrees(98.485591343893248, 18.589976828998569),            
                  ellipse : {
                      semiMinorAxis : 100000.0,
                      semiMajorAxis : 100000.0,
                      material : Cesium.Color.RED.withAlpha(0.5)
                  }
              });
        
              viewer.entities.add({
                    name : 'หอดูดาวสมุย',
                    position: Cesium.Cartesian3.fromDegrees(99.989915136340997,9.4860943174077992),
                    ellipse : {
                        semiMinorAxis : 100000.0,
                        semiMajorAxis : 100000.0,
                        material : Cesium.Color.RED.withAlpha(0.5)
                    }
                });

              viewer.entities.add({
                        name : 'ดอนเมือง',
                    
                        position: Cesium.Cartesian3.fromDegrees(100.5658954,13.9040277),
                        ellipse : {
                            semiMinorAxis : 1000000.0,
                            semiMajorAxis : 800000.0,
                            material : Cesium.Color.RED.withAlpha(0.8),
                            outline : true,
                            outlineColor:Cesium.Color.RED.withAlpha(0.3),
                            show:false,
                            fill:false
                        }
              });
              
              let extent = Cesium.Rectangle.fromDegrees(97.363442,4.883486,106.083065,21.013188);
              Cesium.Camera.DEFAULT_VIEW_RECTANGLE = extent;
              Cesium.Camera.DEFAULT_VIEW_FACTOR = 3;

              viewer.scene.debugShowFramesPerSecond = true;
                
              viewer.camera.flyHome(0)


              cct =new Date().toISOString()

              current_time = Cesium.JulianDate.fromIso8601( cct );


              clock_start=true  
              viewer.clock.onTick.addEventListener( this.onTimeTrick_2 );

              let cc = color_items[Math.floor(Math.random()*color_items.length)];              
              let timesp = new Date().getTime()

              try{
              
                let ssl = JSON.parse( localStorage.getItem('$tle-seclection-data') )
 
                for(let i=0;i<ssl.length;i++){

                  this.fn_make_path( cc, ssl[i].name, ssl[i].line1, ssl[i].line2 )
                  this.add_satellite_by_tle ( cc, ssl[i].name, ssl[i].line1, ssl[i].line2, timesp )

                }
                

              }catch(e){}

              // --------------------------------------------------------------------------------
              

              // var kmlContent = `<?xml version="1.0" encoding="UTF-8"?>
              //                   <kml xmlns="http://www.opengis.net/kml/2.2">
              //                     <Document>
              //                       <name>61E-Ku-EastH.kml</name>
              //                       <Folder>
              //                         <Snippet maxLines="2"><![CDATA[Copyright <A href="http://www.satbeams.com">www.satbeams.com</A>]]></Snippet>
              //                         <name>61E-Ku-EastH</name>
              //                         <Placemark>
              //                           <name>58.4</name>
              //                           <Point>
              //                             <coordinates>31.62900000000001,26.788,0</coordinates>
              //                           </Point>
              //                         </Placemark>
              //                         <Placemark>
              //                           <name>48</name>
              //                           <ExtendedData>
              //                             <Data name="LevelPointLocation">
              //                               <value>28.93799881278,33.23799922824,0</value>
              //                             </Data>
              //                           </ExtendedData>
              //                           <Polygon>
              //                             <outerBoundaryIs>
              //                               <LinearRing>
              //                                 <coordinates>
              //                   38.602,35.735,0 38.608,35.733,0 39.615,35.021,0 39.717,34.924,0 40.353,34.146,0 40.781,33.389,0 41.027,32.741,0 41.062,32.647,0 41.133,32.339,0 41.229,31.919,0 41.298,31.204,0 41.265,30.5,0 41.105,29.808,0 41.07,29.715,0 40.792,29.129,0 40.573,28.83,0 40.26,28.464,0 40.013,28.224,0 39.643,27.808,0 39.461,27.587,0 39.229,27.151,0 39.014,26.516,0 39.009,26.494,0 38.946,25.836,0 38.915,25.183,0 38.869,24.535,0 38.829,24.249,0 38.773,23.894,0 38.576,23.261,0 38.418,22.954,0 38.18,22.638,0 37.863,22.339,0 37.25,22.036,0 37.243,22.033,0 36.586,21.891,0 35.902,21.853,0 35.201,21.863,0 34.492,21.882,0 33.781,21.882,0 33.07,21.851,0 32.36,21.793,0 31.646,21.724,0 30.925,21.656,0 30.719,21.633,0 30.205,21.557,0 29.492,21.41,0 28.796,21.18,0 28.592,21.084,0 28.141,20.789,0 27.741,20.489,0 27.52,20.265,0 27.111,19.888,0 26.912,19.674,0 26.535,19.288,0 26.31,19.042,0 26.056,18.687,0 25.746,18.247,0 25.665,18.084,0 25.308,17.483,0 25.203,17.341,0 24.87300000000001,16.887,0 24.602,16.603,0 24.228,16.3,0 23.928,16.106,0 23.189,15.813,0 22.808,15.74,0 22.399,15.669,0 21.56,15.652,0 20.669,15.761,0 20.429,15.822,0 19.714,16.012,0 18.675,16.44,0 18.557,16.502,0 17.498,17.149,0 17.482,17.161,0 16.689,17.814,0 16.073,18.465,0 15.93,18.674,0 15.618,19.114,0 15.345,19.76,0 15.323,20.031,0 15.312,20.398,0 15.667,21.021,0 15.807,21.13,0 16.613,21.529,0 16.843,21.606,0 17.469,21.79,0 18.295,22.079,0 18.466,22.17,0 18.785,22.802,0 18.516,23.468,0 18.07,24.148,0 17.625,24.835,0 17.284,25.521,0 17.114,26.204,0 17.115,26.222,0 17.141,26.881,0 17.38,27.478,0 17.42,27.548,0 17.979,28.156,0 18.039,28.199,0 18.712,28.596,0 19.304,28.815,0 19.523,28.891,0 20.361,29.119,0 21.197,29.328,0 21.383,29.385,0 21.991,29.593,0 22.749,29.904,0 22.944,29.993,0 23.471,30.269,0 24.208,30.594,0 24.278,30.62000000000001,0 24.951,30.893,0 25.729,31.11,0 26.197,31.219,0 26.513,31.3,0 27.278,31.514,0 28,31.803,0 28.042,31.831,0 28.598,32.347,0 28.701,32.518,0 28.938,33.238,0 28.962,33.379,0 29.034,33.974,0 29.169,34.715,0 29.17,34.718,0 29.527,35.457,0 29.614,35.564,0 30.26,36.014,0 30.731,36.155,0 31.022,36.229,0 31.852,36.292,0 32.715,36.264,0 33.583,36.204,0 34.433,36.156,0 35.259,36.145,0 36.064,36.165,0 36.87,36.165,0 37.707,36.057,0 38.602,35.735,0 
              //                   </coordinates>
              //                               </LinearRing>
              //                             </outerBoundaryIs>
              //                           </Polygon>
              //                         </Placemark>
              //                         <Placemark>
              //                           <name>50</name>
              //                           <ExtendedData>
              //                             <Data name="LevelPointLocation">
              //                               <value>37.95900080281,35.34199700733,0</value>
              //                             </Data>
              //                           </ExtendedData>
              //                           <Polygon>
              //                             <outerBoundaryIs>
              //                               <LinearRing>
              //                                 <coordinates>
              //                   38.717,34.968,0 38.902,34.846,0 39.617,34.177,0 40.062,33.543,0 40.142,33.414,0 40.455,32.671,0 40.626,31.942,0 40.659,31.366,0 40.666,31.227,0 40.582,30.525,0 40.338,29.836,0 40.332,29.825,0 39.915,29.16,0 39.815,29.04,0 39.358,28.496,0 39.265,28.39,0 38.888,27.835,0 38.756,27.584,0 38.607,27.174,0 38.478,26.512,0 38.433,26.011,0 38.422,25.854,0 38.392,25.2,0 38.325,24.553,0 38.197,23.993,0 38.173,23.913,0 37.861,23.28300000000001,0 37.706,23.084,0 37.175,22.67,0 37.115,22.634,0 36.472,22.412,0 35.797,22.318,0 35.102,22.293,0 34.394,22.293,0 33.68,22.29,0 32.964,22.269,0 32.246,22.228,0 32.06,22.215,0 31.527,22.165,0 30.804,22.093,0 30.075,22.013,0 29.348,21.902,0 28.634,21.726,0 28.60300000000001,21.715,0 27.95,21.425,0 27.424,21.13,0 27.28900000000001,21.031,0 26.643,20.568,0 26.589,20.535,0 26.005,20.06,0 25.851,19.937,0 25.408,19.398,0 25.368,19.333,0 25.1,18.722,0 24.926,18.316,0 24.86,18.114,0 24.554,17.51,0 24.408,17.311,0 24.061,16.915,0 23.772,16.68,0 23.118,16.338,0 23.053,16.311,0 22.266,16.143,0 21.423,16.125,0 20.52,16.253,0 19.837,16.455,0 19.541,16.554,0 18.451,17.093,0 18.399,17.125,0 17.523,17.78,0 17.093,18.214,0 16.887,18.43,0 16.473,19.076,0 16.285,19.716,0 16.329,20.02,0 16.425,20.345,0 16.941,20.833,0 17.145,20.95,0 17.75,21.183,0 18.59,21.428,0 18.864,21.508,0 19.385,21.745,0 19.783,22.106,0 19.7,22.756,0 19.302,23.427,0 18.831,24.108,0 18.409,24.791,0 18.117,25.474,0 18.011,26.152,0 18.04,26.354,0 18.149,26.821,0 18.467,27.335,0 18.598,27.477,0 19.133,27.885,0 19.572,28.106,0 19.898,28.246,0 20.71,28.505,0 21.366,28.689,0 21.526,28.735,0 22.317,28.993,0 23.053,29.285,0 23.075,29.295,0 23.798,29.648,0 24.358,29.909,0 24.521,29.99,0 25.255,30.297,0 25.958,30.521,0 26.013,30.54,0 26.775,30.762,0 27.53600000000001,30.972,0 27.956,31.118,0 28.262,31.242,0 28.915,31.663,0 29.023,31.775,0 29.411,32.425,0 29.431,32.476,0 29.585,33.2,0 29.665,33.701,0 29.707,33.935,0 29.935,34.672,0 29.998,34.791,0 30.558,35.395,0 30.564,35.399,0 31.278,35.7,0 32.073,35.82,0 32.91,35.832,0 33.761,35.791,0 34.608,35.737,0 35.441,35.691,0 36.264,35.646,0 37.094,35.56,0 37.959,35.342,0 38.717,34.968,0 
              //                   </coordinates>
              //                               </LinearRing>
              //                             </outerBoundaryIs>
              //                           </Polygon>
              //                         </Placemark>
              //                         <Placemark>
              //                           <name>52</name>
              //                           <ExtendedData>
              //                             <Data name="LevelPointLocation">
              //                               <value>39.88900326967,31.25699890031,0</value>
              //                             </Data>
              //                           </ExtendedData>
              //                           <Polygon>
              //                             <outerBoundaryIs>
              //                               <LinearRing>
              //                                 <coordinates>
              //                   35.854,35.104,0 36.503,35.007,0 37.367,34.792,0 38.285,34.376,0 38.505,34.226,0 39.27,33.45,0 39.412,33.203,0 39.67,32.702,0 39.864,31.972,0 39.881,31.554,0 39.889,31.257,0 39.749,30.556,0 39.544,30.098,0 39.43,29.869,0 39.032,29.305,0 38.955,29.196,0 38.501,28.588,0 38.463,28.529,0 38.117,27.864,0 38.036,27.62,0 37.927,27.198,0 37.848,26.535,0 37.81,25.875,0 37.8,25.724,0 37.758,25.222,0 37.64,24.576,0 37.477,24.122,0 37.383,23.939,0 36.943,23.412,0 36.812,23.31800000000001,0 36.326,23.06,0 35.666,22.887,0 34.978,22.81,0 34.274,22.78,0 34.087,22.775,0 33.56,22.763,0 32.841,22.738,0 32.119,22.701,0 31.391,22.654,0 30.659,22.602,0 29.92000000000001,22.543,0 29.18,22.461,0 28.567,22.352,0 28.448,22.327,0 27.735,22.112,0 27.039,21.821,0 26.952,21.783,0 26.357,21.469,0 25.766,21.198,0 25.661,21.137,0 24.949,20.828,0 24.41,20.624,0 24.244,20.479,0 23.93,20.015,0 23.952,19.388,0 23.963,18.807,0 23.965,18.766,0 23.836,18.152,0 23.525,17.547,0 23.523,17.545,0 22.848,17.022,0 22.698,16.964,0 22.077,16.792,0 21.23,16.766,0 20.306,16.931,0 19.928,17.066,0 19.268,17.365,0 18.684,17.733,0 17.983,18.362,0 17.96,18.385,0 17.586,19.028,0 17.536,19.473,0 17.533,19.66,0 18.006,20.272,0 18.12,20.342,0 18.928,20.647,0 19.714,20.829,0 19.768,20.842,0 20.604,21.012,0 21.369,21.324,0 21.454,21.387,0 21.334,22.032,0 20.842,22.7,0 20.759,22.793,0 20.298,23.377,0 19.789,24.057,0 19.385,24.738,0 19.15,25.416,0 19.138,26.087,0 19.148,26.117,0 19.457,26.745,0 19.654,26.958,0 20.238,27.38,0 20.346,27.439,0 21.12,27.753,0 21.773,27.975,0 21.909,28.018,0 22.69,28.28,0 23.39,28.571,0 23.43700000000001,28.59,0 24.157,28.94000000000001,0 24.651,29.192,0 24.865,29.3,0 25.584,29.625,0 26.073,29.81,0 26.32,29.902,0 27.07,30.136,0 27.822,30.351,0 27.995,30.406,0 28.553,30.599,0 29.241,30.932,0 29.391,31.038,0 29.832,31.481,0 29.984,31.72200000000001,0 30.235,32.431,0 30.239,32.45,0 30.369,33.156,0 30.49800000000001,33.734,0 30.546,33.886,0 30.947,34.593,0 30.966,34.611,0 31.593,35.026,0 32.339,35.235,0 32.737,35.27,0 33.145,35.297,0 33.979,35.276,0 34.82,35.214,0 35.659,35.13,0 35.854,35.104,0 
              //                   </coordinates>
              //                               </LinearRing>
              //                             </outerBoundaryIs>
              //                           </Polygon>
              //                         </Placemark>
              //                         <Placemark>
              //                           <name>54</name>
              //                           <ExtendedData>
              //                             <Data name="LevelPointLocation">
              //                               <value>20.85400033543,17.93000011494,1</value>
              //                             </Data>
              //                           </ExtendedData>
              //                           <Polygon>
              //                             <outerBoundaryIs>
              //                               <LinearRing>
              //                                 <coordinates>
              //                   21.27,19.498,0 22.086,18.84,0 21.98,18.223,0 21.694,18.014,0 20.854,17.93,0 19.856,18.307,0 19.822,18.351,0 19.484,18.947,0 19.546,19.099,0 20.156,19.545,0 20.267,19.577,0 21.169,19.533,0 21.27,19.498,0 
              //                   </coordinates>
              //                               </LinearRing>
              //                             </outerBoundaryIs>
              //                           </Polygon>
              //                         </Placemark>
              //                         <Placemark>
              //                           <name>54</name>
              //                           <ExtendedData>
              //                             <Data name="LevelPointLocation">
              //                               <value>37.22200466344,27.89800387368,0</value>
              //                             </Data>
              //                           </ExtendedData>
              //                           <Polygon>
              //                             <outerBoundaryIs>
              //                               <LinearRing>
              //                                 <coordinates>
              //                   36.041,34.341,0 36.83,34.094,0 37.765,33.618,0 37.917,33.509,0 38.564,32.748,0 38.841,32.013,0 38.869,31.297,0 38.691,30.597,0 38.685,30.586,0 38.32,29.913,0 38.193,29.73,0 37.861,29.238,0 37.681,28.953,0 37.464,28.568,0 37.234,27.936,0 37.222,27.898,0 37.105,27.229,0 37.063,26.564,0 37.033,25.971,0 37.028,25.904,0 36.927,25.251,0 36.71,24.608,0 36.677,24.548,0 36.188,23.981,0 36.122,23.929,0 35.488,23.628,0 34.816,23.468,0 34.302,23.406,0 34.12,23.388,0 33.407,23.34700000000001,0 32.685,23.316,0 31.957,23.28300000000001,0 31.221,23.249,0 30.477,23.216,0 29.725,23.183,0 28.968,23.139,0 28.213,23.062,0 27.953,23.018,0 27.467,22.931,0 26.734,22.737,0 26.011,22.491,0 25.919,22.465,0 25.271,22.273,0 24.482,22.162,0 23.61,22.245,0 22.713,22.611,0 22.583,22.675,0 21.768,23.303,0 21.167,23.915,0 21.104,23.989,0 20.706,24.668,0 20.594,25.136,0 20.556,25.339,0 20.764,25.996,0 20.971,26.243,0 21.459,26.631,0 21.647,26.732,0 22.397,27.055,0 22.807,27.233,0 23.149,27.358,0 23.881,27.683,0 24.153,27.84,0 24.583,28.058,0 25.268,28.457,0 25.28,28.464,0 25.966,28.815,0 26.563,29.085,0 26.677,29.132,0 27.409,29.388,0 28.148,29.615,0 28.37,29.683,0 28.88200000000001,29.841,0 29.593,30.108,0 29.964,30.3,0 30.253,30.488,0 30.728,30.967,0 30.814,31.103,0 31.058,31.664,0 31.177,32.19,0 31.217,32.378,0 31.379,33.099,0 31.486,33.394,0 31.737,33.819,0 32.008,34.097,0 32.684,34.447,0 32.941,34.501,0 33.451,34.577,0 34.264,34.58,0 35.099,34.504,0 35.948,34.363,0 36.041,34.341,0 
              //                   </coordinates>
              //                               </LinearRing>
              //                             </outerBoundaryIs>
              //                           </Polygon>
              //                         </Placemark>
              //                         <Placemark>
              //                           <name>55</name>
              //                           <ExtendedData>
              //                             <Data name="LevelPointLocation">
              //                               <value>32.58700392398,23.67200393847,0</value>
              //                             </Data>
              //                           </ExtendedData>
              //                           <Polygon>
              //                             <outerBoundaryIs>
              //                               <LinearRing>
              //                                 <coordinates>
              //                   36.792,33.561,0 37.07,33.395,0 37.788,32.782,0 38.167,32.041,0 38.214,31.32400000000001,0 38.025,30.624,0 37.969,30.52,0 37.641,29.94,0 37.474,29.686,0 37.201,29.265,0 36.981,28.846,0 36.856,28.592,0 36.67,27.92,0 36.627,27.51,0 36.597,27.249,0 36.566,26.583,0 36.522,25.922,0 36.445,25.484,0 36.387,25.271,0 36.053,24.63200000000001,0 35.972,24.538,0 35.369,24.106,0 35.151,24.018,0 34.71,23.887,0 34.018,23.776,0 33.308,23.71300000000001,0 32.587,23.672,0 31.855,23.637,0 31.116,23.606,0 30.366,23.582,0 30.026,23.574,0 29.605,23.566,0 28.834,23.552,0 28.06,23.522,0 27.28900000000001,23.451,0 26.53,23.319,0 25.785,23.126,0 25.736,23.116,0 25.015,22.977,0 24.188,22.948,0 23.25,23.168,0 23.113,23.238,0 22.136,23.937,0 21.922,24.233,0 21.678,24.617,0 21.64,24.857,0 21.612,25.283,0 21.996,25.929,0 22.027,25.954,0 22.729,26.368,0 23.03900000000001,26.544,0 23.455,26.715,0 24.163,27.082,0 24.26300000000001,27.154,0 24.852,27.479,0 25.277,27.779,0 25.515,27.917,0 26.19000000000001,28.32,0 26.343,28.406,0 26.888,28.658,0 27.604,28.942,0 27.82,29.017,0 28.336,29.177,0 29.069,29.394,0 29.713,29.612,0 29.786,29.638,0 30.472,29.947,0 30.921,30.25,0 31.092,30.413,0 31.461,30.929,0 31.574,31.224,0 31.699,31.63,0 31.831,32.345,0 31.866,32.498,0 32.062,33.062,0 32.29,33.438,0 32.661,33.769,0 32.911,33.91,0 33.651,34.089,0 34.45,34.11,0 35.285,34.013,0 36.15,33.805,0 36.792,33.561,0 
              //                   </coordinates>
              //                               </LinearRing>
              //                             </outerBoundaryIs>
              //                           </Polygon>
              //                         </Placemark>
              //                         <Placemark>
              //                           <name>56</name>
              //                           <ExtendedData>
              //                             <Data name="LevelPointLocation">
              //                               <value>24.57900110787,24.10899852448,1</value>
              //                             </Data>
              //                           </ExtendedData>
              //                           <Polygon>
              //                             <outerBoundaryIs>
              //                               <LinearRing>
              //                                 <coordinates>
              //                   36.68,32.832,0 37.274,32.08,0 37.38,31.359,0 37.199,30.659,0 37.191,30.644,0 36.796,29.975,0 36.698,29.815,0 36.37,29.299,0 36.22,28.935,0 36.089,28.624,0 35.979,27.948,0 35.974,27.274,0 35.974,27.245,0 35.956,26.606,0 35.89,25.94600000000001,0 35.743,25.431,0 35.684,25.297,0 35.208,24.735,0 35.112,24.667,0 34.572,24.416,0 33.893,24.243,0 33.19,24.142,0 32.803,24.107,0 32.469,24.085,0 31.734,24.053,0 30.986,24.035,0 30.226,24.031,0 29.451,24.046,0 28.66,24.077,0 27.857,24.113,0 27.046,24.139,0 26.234,24.134,0 25.421,24.099,0 24.579,24.109,0 23.579,24.464,0 23.503,24.524,0 23.482,24.692,0 23.454,25.187,0 23.94,25.64,0 24.077,25.819,0 24.588,26.132,0 24.885,26.446,0 25.214,26.664,0 25.64,27.08,0 25.828,27.209,0 26.459,27.706,0 26.471,27.715,0 27.136,28.085,0 27.641,28.337,0 27.83,28.413,0 28.553,28.657,0 29.27700000000001,28.885,0 29.434,28.933,0 30.002,29.098,0 30.708,29.346,0 31.125,29.54,0 31.375,29.684,0 31.968,30.197,0 31.972,30.203,0 32.33,30.884,0 32.395,31.174,0 32.489,31.589,0 32.628,32.303,0 32.687,32.47,0 33.025,33.011,0 33.21,33.178,0 33.903,33.457,0 34.682,33.507,0 35.528,33.355,0 36.438,32.983,0 36.68,32.832,0 
              //                   </coordinates>
              //                               </LinearRing>
              //                             </outerBoundaryIs>
              //                           </Polygon>
              //                         </Placemark>
              //                         <Placemark>
              //                           <name>57</name>
              //                           <ExtendedData>
              //                             <Data name="LevelPointLocation">
              //                               <value>27.47100351269,27.27999954333,0</value>
              //                             </Data>
              //                           </ExtendedData>
              //                           <Polygon>
              //                             <outerBoundaryIs>
              //                               <LinearRing>
              //                                 <coordinates>
              //                   35.731,32.15,0 36.112,31.415,0 35.869,30.717,0 35.736,30.497,0 35.345,30.038,0 35.208,29.792,0 34.904,29.362,0 34.89,28.675,0 34.975,28.143,0 34.997,27.989,0 35.089,27.31,0 35.12,26.639,0 35.026,25.98,0 34.931,25.766,0 34.62,25.338,0 34.372,25.153,0 33.721,24.865,0 33.232,24.739,0 33.03,24.706,0 32.308,24.636,0 31.569,24.60000000000001,0 30.813,24.593,0 30.037,24.62,0 29.237,24.69000000000001,0 28.405,24.818,0 27.68700000000001,24.979,0 27.517,25.058,0 26.639,25.69,0 26.666,26.355,0 26.897,26.66,0 27.113,27.004,0 27.471,27.28,0 27.959,27.638,0 28.117,27.715,0 28.819,28,0 29.488,28.243,0 29.527,28.254,0 30.258,28.438,0 30.978,28.634,0 31.581,28.826,0 31.682,28.861,0 32.372,29.115,0 32.993,29.45,0 33.02,29.476,0 33.537,30.121,0 33.547,30.179,0 33.68,30.818,0 33.702,31.528,0 33.76,31.749,0 34.076,32.23,0 34.31,32.391,0 35.078,32.433,0 35.731,32.15,0 
              //                   </coordinates>
              //                               </LinearRing>
              //                             </outerBoundaryIs>
              //                           </Polygon>
              //                         </Placemark>
              //                       </Folder>
              //                     </Document>
              //                   </kml>`;

                  var kmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
<Document>
	<name>thaicom6-1.kml</name>
	<Style id="sn_ylw-pushpin">
		<IconStyle>
			<scale>1.1</scale>
			<Icon>
				<href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href>
			</Icon>
			<hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/>
		</IconStyle>
		<BalloonStyle>
		</BalloonStyle>
		<LineStyle>
			<color>ff0000ff</color>
		</LineStyle>
		<PolyStyle>
			<color>8f0000ff</color>
		</PolyStyle>
	</Style>
	<Style id="sh_ylw-pushpin">
		<IconStyle>
			<scale>1.3</scale>
			<Icon>
				<href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href>
			</Icon>
			<hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/>
		</IconStyle>
		<BalloonStyle>
		</BalloonStyle>
		<LineStyle>
			<color>ff0000ff</color>
		</LineStyle>
		<PolyStyle>
			<color>8f0000ff</color>
		</PolyStyle>
	</Style>
	<StyleMap id="msn_ylw-pushpin">
		<Pair>
			<key>normal</key>
			<styleUrl>#sn_ylw-pushpin</styleUrl>
		</Pair>
		<Pair>
			<key>highlight</key>
			<styleUrl>#sh_ylw-pushpin</styleUrl>
		</Pair>
	</StyleMap>
	<Placemark>
		<name>thaicom6-1</name>
		<LookAt>
			<longitude>119.6300037567031</longitude>
			<latitude>11.01641983703994</latitude>
			<altitude>0</altitude>
			<heading>2.542009251783365</heading>
			<tilt>0</tilt>
			<range>7683002.296817446</range>
			<gx:altitudeMode>relativeToSeaFloor</gx:altitudeMode>
		</LookAt>
		<styleUrl>#msn_ylw-pushpin</styleUrl>
		<Polygon>
			<tessellate>1</tessellate>
			<outerBoundaryIs>
				<LinearRing>
					<coordinates>
						88.61749012836283,31.88159802277619,0 83.74999065728332,29.84547692991161,0 82.17694133799439,26.78019594135139,0 81.47781304989248,23.74545823051756,0 83.62766338040642,19.22647928383861,0 86.49788387153126,16.3137007483398,0 88.89612576504634,11.89091771793644,0 92.94717565337892,4.203370028328556,0 95.76772505060876,-2.197922812826426,0 100.5763667428605,-4.956971226016874,0 105.016429845741,-8.323460181934474,0 109.9832320211262,-9.046452286731501,0 115.0281953644748,-9.326248218261908,0 120.6061673354805,-10.5465045508914,0 127.2821259035888,-12.82366446107019,0 134.2320810431133,-13.55323022887287,0 139.9794254259284,-13.21204853717133,0 146.0892514297313,-12.75993146765942,0 153.2159392776987,-11.29181357054707,0 163.0902721881614,-10.64689137396681,0 160.7686584031204,-6.706825182851889,0 133.9106711662381,3.985680592246027,0 129.440735801812,12.19595376671702,0 128.0736670355078,16.19411575038,0 119.1771322626393,20.84958212648752,0 111.1213904004826,27.19045194179399,0 99.64080999660851,30.7725107001619,0 88.61749012836283,31.88159802277619,0 
					</coordinates>
				</LinearRing>
			</outerBoundaryIs>
		</Polygon>
	</Placemark>
</Document>
</kml>`;

                  var options = {
                      camera : viewer.scene.camera,
                      canvas : viewer.scene.canvas 
                  };

                  var parser = new DOMParser();
                  var kmlDoc = parser.parseFromString(kmlContent, "text/xml");
                    
 
                   let promise = Cesium.KmlDataSource.load(kmlDoc, options);
                   promise.then(function(dataSource) {
                      
                      viewer.dataSources.add(dataSource);  

                      let entities = dataSource.entities.values; 

                      for(let i =0; i < entities.length; i++) {

                        try{

                          let e = entities[i];
                          // e.polygon.material = Cesium.Color.SALMON.withAlpha(0.1);
                          e.polygon.material = Cesium.Color.fromCssColorString( cc ).withAlpha(0.1)
                           

                        }catch(e){
                          console.log( e )
                        }
                          
                      }

                      

                   })

                    

                  // var startLatitude = 26.788;
                  // var startLongitude = 31.62900000000001;

                  // var geosatellite = viewer.entities.add({
                  //     id:"geo",
                  //         position : Cesium.Cartesian3.fromDegrees(startLongitude, startLatitude, 30000000),
                  // });

                  // var groundstation = viewer.entities.add({
                  //     id:"gs",
                  //     position : Cesium.Cartesian3.fromDegrees(startLongitude, startLatitude, 0),
                  //     polyline : {
                  //         //toggling to true results in no polyline artefacts
                  //         arcType: Cesium.ArcType.NONE,
                  //         // This callback updates positions each frame.
                  //         positions : new Cesium.PositionPropertyArray([
                  //             new Cesium.ReferenceProperty(viewer.entities, 'gs', ['position']),
                  //             new Cesium.ReferenceProperty(viewer.entities, 'geo', ['position']),
                  //           ]),
                  //         width : 1,
                  //         material : Cesium.Color.RED
                  //     }
                  // });


                  // let handler_3 = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
                  // handler_3.setInputAction(function(movement) {
          
                  //             let pickedObject = viewer.scene.pick(movement.position);
                              
                  //             // console.log( pickedObject )

                  // }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

                   

               
              
           },
           async add_satellite_by_tle ( cc, name, line_1, line_2, timesp, type='PAYLOAD'){
                
                // let cc = color_items[Math.floor(Math.random()*color_items.length)]; 
                // let timesp = new Date().getTime()

                let tle_tmp = name+'\n' +
                              line_1+'\n' +
                              line_2; 

                // var tle = TLE.parse( tle_tmp )
                // console.log( tle )

                let satInfo = tlejs.getSatelliteInfo(
                                                              tle_tmp,         // Satellite TLE string or array.
                                                              timesp,          // Timestamp (ms)
                                                              18.589976828998569,      // Observer latitude (degrees)
                                                              98.485591343893248,    // Observer longitude (degrees)
                                                              0               // Observer elevation (km)
                );  
                
                let longitude = satInfo.lng
                let latitude = satInfo.lat
                let height = satInfo.height*100
                // ------------------------------------------------------------------------------------------------------ 
                  var startLatitude = 26.788;
                  var startLongitude = 31.62900000000001;

                  var geosatellite = viewer.entities.add({
                      id:"geo",
                          position : Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
                  });

                  var groundstation = viewer.entities.add({
                      id:"gs",
                      position : Cesium.Cartesian3.fromDegrees(startLongitude, startLatitude, 0),
                      polyline : {
                          //toggling to true results in no polyline artefacts
                          arcType: Cesium.ArcType.NONE,
                          // This callback updates positions each frame.
                          positions : new Cesium.PositionPropertyArray([
                              new Cesium.ReferenceProperty(viewer.entities, 'gs', ['position']),
                              new Cesium.ReferenceProperty(viewer.entities, 'geo', ['position']),
                            ]),
                          width : 1,
                          material : Cesium.Color.fromCssColorString( cc ) 
                      }
                  }); 
                // ------------------------------------------------------------------------------------------------------

                let svg = '<svg width="10px" height="13px" preserveAspectRatio="xMaxYMid meet" version="1.1" xmlns="http://www.w3.org/2000/svg">';
                if(type=='PAYLOAD'){
                                      svg += '<polygon points="0,12  4,0  8,12" style="fill:'+cc+';stroke:'+cc+';" />';  
                }else if(type=='DEBRIS'){
                                      svg += '<circle cx="5" cy="6" r="4" style="fill:'+cc+';stroke:'+cc+';"/>';  
                }else if(type=='ROCKET BODY'){
                                      svg += '<rect x="1" y="1" width="9" height="13" style="fill:'+cc+';stroke:'+cc+';"/>'; 
                }
                                                                                                                            
                svg += '</svg>';  
                
                let image = new Image();
                svg = 'data:image/svg+xml;base64,' + window.btoa(svg);
                image.src=svg


                    let label = new Cesium.LabelGraphics();
                    
                    label.text = name       
                    label.show=true    
                    label.font = "0.8em Lucida Console"         
                    label.fillColor = Cesium.Color.fromBytes(hexToRgb(cc).r,hexToRgb(cc).g,hexToRgb(cc).b,255)
                    

                    label.showBackground=true
                    label.scale='0.8'
                    label.backgroundColor = Cesium.Color.fromBytes( 112, 89, 57, 70 )
                    label.horizontalOrigin = Cesium.HorizontalOrigin.LEFT
                    label.verticalOrigin =  Cesium.VerticalOrigin.CENTER
                    label.style = Cesium.LabelStyle.FILL
                    label.pixelOffset =  new Cesium.Cartesian2(12,0)

                let path = new Cesium.PathGraphics();
                path.show=false

                viewer.entities.add({
                                      id: 1,  
                                      name: name,    
                                                                        
                                      position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
                                      billboard:{
                                                  image:image,
                                                  scale: 0.7,
                                                  show: true,
                                                },

                                      path : path,
                                      label : label,
                                    });


             

           },
           async fn_make_path( cc, name, line_1, line_2 ){
 

                  let tle_tmp = name+'\n' +
                                  line_1+'\n' +
                                  line_2; 

                  let meanMotion = tlejs.getMeanMotion(tle_tmp);
                  let period=( ( 1 / Number(meanMotion) )*24 ).toFixed(2)
                  let norad_id=tlejs.getCatalogNumber(tle_tmp)
                  let Epoch=(new Date( tlejs.getEpochTimestamp(tle_tmp) )).toUTCString()

                  let tle = TLE.parse( tle_tmp )
                   
                  
                  let orbit = new czml.orbit.fromTle( tle_tmp );
                  let time=Math.round((new Date( current_time )).getTime() / 1000);
 
                  
                  orbit.setEpoch( time ); //override TLE epoch
                  let time_diff=1

                  if(current_czml_date.length==2){

                    time_diff=get_time_diff(current_czml_date[0] , current_czml_date[1])
                    if(time_diff==0){ time_diff=1 }

                    orbit.setDuration(60*60*24*time_diff)
                    

                  }else{

                    orbit.setDuration(60*60*24*5)

                  }

                  let e  = orbit.czml();
                  let tmp=''
                  let myID = 1

                  try{

                  
                    let timesp = new Date(current_time).getTime()
                    let satInfo = tlejs.getSatelliteInfo(
                                                            tle_tmp,         // Satellite TLE string or array.
                                                            timesp,  // Timestamp (ms)
                                                            18.589976828998569,      // Observer latitude (degrees)
                                                            98.485591343893248,    // Observer longitude (degrees)
                                                            0               // Observer elevation (km)
                                      );

                    tmp="<table style='font-size: 0.9em;border: 0px solid #ddd;'>"+
                                  "<tr><td>NORAD </td><td> "+tle.number+"</td></tr>"+

                                  "<tr><td>International </td><td> "+tle.id+"</td></tr>"+
                                  "<tr><td style='border-bottom: 1px solid #ddd;'></td><td style='border-bottom: 1px solid #ddd;'></td></tr>"+
                                  
                                  "<tr><td>Period  </td><td> "+addCommas( period )+" (hours/day)</td></tr>"+
                                  "<tr><td>ความสูง  </td><td> "+addCommas( satInfo.height.toFixed(2) )+" km</td></tr>"+
                                  
                                  
                                  "</table>";
                  }catch(e){}

                  // --------------------------------------------------------------------------------------------------------------------------
                  let type='PAYLOAD'

                  let svg = '<svg width="10px" height="13px" preserveAspectRatio="xMaxYMid meet" version="1.1" xmlns="http://www.w3.org/2000/svg">';
                  if(type=='PAYLOAD'){
                                        svg += '<polygon points="0,12  4,0  8,12" style="fill:'+cc+';stroke:'+cc+';" />';  
                  }else if(type=='DEBRIS'){
                                        svg += '<circle cx="5" cy="6" r="4" style="fill:'+cc+';stroke:'+cc+';"/>';  
                  }else if(type=='ROCKET BODY'){
                                        svg += '<rect x="1" y="1" width="9" height="13" style="fill:'+cc+';stroke:'+cc+';"/>'; 
                  }
                                                                                                                              
                  svg += '</svg>';  
                  
                  let image = new Image();
                  svg = 'data:image/svg+xml;base64,' + window.btoa(svg);
                  image.src=svg

                     
                    let label={
                      fillColor: {
                        rgba: [ hexToRgb(cc).r,hexToRgb(cc).g,hexToRgb(cc).b,255 ],
                      },
                      font: "8pt Lucida Console",
                      horizontalOrigin: "LEFT",
                      pixelOffset: {
                        cartesian2: [8, 0],
                      },
                      style: "FILL",
                      text: name,
                      showBackground: true,
                      backgroundColor: {
                        rgba: [112, 89, 57, 70],
                      },
                    }
                     
                  
                  // --------------------------------------------------------------------------------------------------------------------------

                  e[0].clock.multiplier = current_clock_multiplier  
                  e[1].id=myID
                  e[1].label = label
                  e[1].description=tmp
                  e[1].position.cartesian=[]
                  e[1].path.material.solidColor.color.rgba=[hexToRgb( cc ).r,hexToRgb( cc ).g,hexToRgb( cc ).b,255]
                  e[1].billboard = {
                                      image:image,
                                      scale: 1,
                                      show: true,
                                  }

                  this.fn_add_position_czml(name, line_1, line_2, e, current_time, time_diff, period)

                  setTimeout(() => {
                  
                    
                    let entity = Cesium.CzmlDataSource.load ( e );
                    entity.then(function (dataSource) { 

                          let tm = viewer.dataSources.add(entity).then(function () { })
 
                    });

                  },100)



           },
           async fn_add_position_czml(name, line_1, line_2,  data, pass_current_time, time_diff, period){

              

                let satrec = satellite.twoline2satrec( line_1 , line_2 );
 
                let cartesian = [];
                let sec=0;
                let t = new Date(pass_current_time);
                
                let nn = Number( period )*60*24*time_diff
                 

                for(let i=0;i<nn;i++){

                

                  t.setSeconds(t.getSeconds() + 60 );

                  

                  let positionAndVelocity = satellite.propagate(satrec, t);

                  
                      cartesian.push(i*60)
                      cartesian.push(positionAndVelocity.position.x*1000)
                      cartesian.push(positionAndVelocity.position.y*1000)
                      cartesian.push(positionAndVelocity.position.z*1000)
                  

                }

                data[1].position.cartesian=cartesian
                


          },
           onTimeTrick_2(clock){

            if(clock_start){
 
              current_time = Cesium.JulianDate.toDate( clock.currentTime)

              

              // let current_clock_multiplier = clock.multiplier       

              // let du_time_1 = Cesium.JulianDate.toDate( clock.currentTime)
              // let du_time_2 = Cesium.JulianDate.toDate( clock.currentTime)
  

            }

          },
          parsePeturboDATFiles : function (data) {

            console.log(data) 

          },
           
    
    },
    mounted() {

        
          this.$refs.topProgress.start()

          setTimeout(() => { this.$refs.topProgress.done() }, 10);
          
          this.loading=false
          this.init()
          
           
         

        
    },
    watch: {
       
       
     

    },
    computed: {

             
            

    },
    created() {
      
    },
    
    
}

function addCommas(nStr){
				nStr += '';
				let x = nStr.split('.');
				let x1 = x[0];
				let x2 = x.length > 1 ? '.' + x[1] : '';
				let rgx = /(\d+)(\d{3})/;
				while (rgx.test(x1)) {
					x1 = x1.replace(rgx, '$1' + ',' + '$2');
				}
				return x1 + x2;
}

function onTimeTrick_2(clock){

  if(clock_start){

    let current_time = Cesium.JulianDate.toDate( clock.currentTime)

    let current_clock_multiplier = clock.multiplier       

    let du_time_1 = Cesium.JulianDate.toDate( clock.currentTime)
    let du_time_2 = Cesium.JulianDate.toDate( clock.currentTime)

     
  }

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

function validateEmail(email) 
{
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
}

function make_activate_code(){
    let text = "";
    let possible = "01234567890123456789012345678901234567890123456789012345678901234567890123456789";

    for (var i = 0; i < 7; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
 
function  kFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function get_time_diff( d_1 , d_2 )
{
    
        

         //create date format          
         var timeStart = new Date(d_1);
         var timeEnd = new Date(d_2);

         var difference = (timeEnd.getTime() - timeStart.getTime()) / (24*60*60*1000);          

         

    return difference;
}

const color_items=[
                  '#ff00ff','#ff00ff','#00ff7f',"#ff0000",
                  '#00ff00','#d95727','#d95727',"#ff0000",
                  '#ffff00',"#ff0000",
                  '#d95727',
                  '#d95727','#00ff7f',
                  '#00ff00','#00ff7f',
                  '#00ff00',
                  '#ffff00',"#ff0000",
                  '#d95727',"#ff0000",
                  '#ffff00',
                  '#d95727',
                  '#ffff00',"#ff0000",
                  '#d95727',
                  '#ffff00',
                  '#d95727',
                  '#d95727','#00ff7f',
                  '#00ff00','#00ff7f',
                  '#00ff00',
                  '#ffff00',"#ff0000",
                  '#d95727',
                  '#ffff00',"#ff0000",
                  '#d95727',                  
                  '#00ff7f',"#ff0000",
                  '#00ff00',
                  '#ffff00',
                  

                ]

</script>

<!-- menu design will like this concept. The creator has used a hexagon => https://codepen.io/uiswarup/pen/dyyqaGR -->
<style scoped>

#navbar {
  overflow: hidden;
  /* background-color: #330066; */
  
}
.hex-content {
  color: #fff;
  display: block;
  height: 180px;
  margin: 0 auto;
  position: relative;
  text-align: center;
  transform: rotate(-30deg);
  width: 156px; }
  .hex-content .hex-content-inner {
    left: 50%;
    margin: -3px 0 0 2px;
    position: absolute;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%); }
  .hex-content .icon {
    display: block;
    font-size: 36px;
    line-height: 30px;
    margin-bottom: 11px; }
  .hex-content .title {
    text-align: center;  
    display: block;
    font-family: "Open Sans", sans-serif;
    font-size: 14px;
    letter-spacing: 1px;
    line-height: 24px;
    text-transform: uppercase; }
  .hex-content svg {
    left: -7px;
    position: absolute;
    top: -13px;
    transform: scale(0.87);
    z-index: -1;
    -webkit-transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
    -moz-transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
    -o-transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s; }
  .hex-content:hover {
    color: #fff; }

.hexagon-menu::-webkit-scrollbar {
    display: none;
}

.selection_ele:hover {

  background-color: #bcffb5;
  border : 2px dashed #0b9c62;
   

}
.selection_ele {

  text-align : center; 
  display: inline-block;
  min-width: 5em;

}

.fake-legend {
  height: 15px;
  width:100%;
  /* border-bottom: solid 2px #e5e4e4; */
  border-bottom: solid 2px #474A8A;
  text-align: center;
  /* margin: 1em 0; */
  margin-top:1em;
  margin-bottom:1.5em;
}
.fake-legend span {
  background: #fff;
  position: relative;
  top: 0;
  padding: 0 20px;
  line-height:30px;
  color:#474A8A;
  font-weight:bold;
}

.viewer {
    width: 100%;
    /* height: 90vh; */
}

</style>

<style>
    @import "../../assets/style.css";

</style>

<style>
    @import "https://pro.fontawesome.com/releases/v5.10.0/css/all.css";
</style>

<style>
    @import "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-social/5.1.1/bootstrap-social.min.css";
</style>