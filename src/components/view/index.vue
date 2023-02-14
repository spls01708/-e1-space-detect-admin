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
    
    <main id="cesiumContainer" style="height:calc(100% - 40px);"> </main>
    <!-- ------------------------------------------------------------------------ -->
    <div class="footer" style="height:40px;">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <!-- <nav class="nav" style="height:22px;" > -->
        <p class="heading-page" style="font-size:14px;font-weight:bold;float:right;margin-right:20px;">
          <b-button style="margin-left:2em;margin-top:4px" variant="outline-primary" class="rounded-0 w-100 border-0" size="sm"> 
            <span style="font-weight:bold;">SATELLITE ORBIT SIMULATOR ©2022</span></b-button>
        </p> 
        
        <p class="heading-page" style="font-size:14px;font-weight:bold;float:left;margin-right:10px;">
          <b-button style="margin-left:2em;margin-top:4px" variant="outline-primary" class="rounded-0 w-100 border-0" size="sm"> </b-button>
        </p> 
        <!-- <p class="heading-page" style="font-size:14px;font-weight:bold;float:left;margin-right:10px;">
          <b-button style="margin-left:2em;margin-top:4px" variant="outline-primary" class="rounded-0 w-100 border-0" size="sm"> </b-button>
        </p>  -->
        <!-- <p class="heading-page" style="font-size:14px;font-weight:bold;float:left;margin-right:10px;">
          <b-button style="margin-left:2em;margin-top:4px" variant="outline-primary" class="rounded-0 w-100 border-0" size="sm"> </b-button>
        </p>  -->
        <!-- <p class="heading-page" style="font-size:14px;font-weight:bold;float:left;margin-right:10px;">
          <b-button style="margin-left:2em;margin-top:4px" variant="outline-primary" class="rounded-0 w-100 border-0" size="sm"> </b-button>
        </p>  -->
        <!-- ------------------------------------------------------------------------------------------------------------------------------------------ -->
        <p class="heading-page" style="font-size:14px;font-weight:bold;float:left;margin-right:10px;">
           
           
          <b-button style="margin-left:2em;margin-top:4px" :variant="sat_entities[0].tle == true ? 'outline-primary' : 'outline-dark'" class="rounded-0 w-100 border-1" size="sm"
            @click="select_tle(0)"
          >
            <i class="material-icons" style="font-size:16px;">satellite_alt</i>
            <span class="ml-1">THAICOM 4</span> 
          </b-button>
          
        
        </p> 

        <p class="heading-page" style="font-size:14px;font-weight:bold;float:left;margin-right:10px;"> 
           
          <b-button style="margin-left:2em;margin-top:4px" :variant="sat_entities[0].footprints == true ? 'outline-success' : 'outline-dark'" class="rounded-0 w-100 border-1" size="sm"
            @click="select_footprints(0)"
          >
            <i class="material-icons" style="font-size:16px;">layers</i>
            <span class="ml-1">Footprints</span> 
          </b-button> 
        </p>
        
        <!-- -------------------------------------------------------------------------------------------------------- -->
        <p class="heading-page" style="font-size:14px;font-weight:bold;float:left;margin-right:10px;">
          <b-button style="margin-left:2em;margin-top:4px" variant="outline-primary" class="rounded-0 w-100 border-0" size="sm">|</b-button>
        </p>
        <!-- -------------------------------------------------------------------------------------------------------- -->

        <p class="heading-page" style="font-size:14px;font-weight:bold;float:left;margin-right:10px;"> 

          <b-button style="margin-left:2em;margin-top:4px" :variant="sat_entities[1].tle == true ? 'outline-primary' : 'outline-dark'" class="rounded-0 w-100 border-1" size="sm"
             @click="select_tle(1)"
          >
            <i class="material-icons" style="font-size:16px;">satellite_alt</i>
            <span class="ml-1">THAICOM 6</span> 
          </b-button>
        
        
        </p> 

        <p class="heading-page" style="font-size:14px;font-weight:bold;float:left;margin-right:10px;"> 
           
          <b-button style="margin-left:2em;margin-top:4px" :variant="sat_entities[1].footprints == true ? 'outline-success' : 'outline-dark'" class="rounded-0 w-100 border-1" size="sm"
            @click="select_footprints(1)"
          >
            <i class="material-icons" style="font-size:16px;">layers</i>
            <span class="ml-1">Footprints</span> 
          </b-button> 
        </p>
        
        <!-- -------------------------------------------------------------------------------------------------------- -->
        <p class="heading-page" style="font-size:14px;font-weight:bold;float:left;margin-right:10px;">
          <b-button style="margin-left:2em;margin-top:4px" variant="outline-primary" class="rounded-0 w-100 border-0" size="sm">|</b-button>
        </p>
        <!-- -------------------------------------------------------------------------------------------------------- -->

        <p class="heading-page" style="font-size:14px;font-weight:bold;float:left;margin-right:10px;"> 
          <!-- :class=" monitor_selection==1 ? 'material-icons nav__icon nav__link--active' : 'material-icons nav__icon ' "   -->
          <b-button style="margin-left:2em;margin-top:4px" :variant="sat_entities[2].tle == true ? 'outline-primary' : 'outline-dark'" class="rounded-0 w-100 border-1" size="sm" 
             @click="select_tle(2)"
          >
            <i class="material-icons" style="font-size:16px;">satellite_alt</i>
            <span class="ml-1">THAICOM 8</span> 
          </b-button> 
        
        </p> 

        <p class="heading-page" style="font-size:14px;font-weight:bold;float:left;margin-right:10px;"> 
           
          <b-button style="margin-left:2em;margin-top:4px" :variant="sat_entities[2].footprints == true ? 'outline-success' : 'outline-dark'" class="rounded-0 w-100 border-1" size="sm"
            @click="select_footprints(2)"
          >
            <i class="material-icons" style="font-size:16px;">layers</i>
            <span class="ml-1">Footprints</span> 
          </b-button> 
        </p>

         
        <!-- -------------------------------------------------------------------------------------------------------- -->

        <p class="heading-page" style="font-size:14px;font-weight:bold;float:left;margin-right:10px;">
          <b-button style="margin-left:2em;margin-top:4px" variant="outline-primary" class="rounded-0 w-100 border-0" size="sm"> </b-button>
        </p>
        
        <!-- ---------------------------------------------------------------------------------------------------------------------------------------
         --> 
        
        

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

const { sat_footprints } = require('../footprints/index');
const { sat_tle } = require('../sat-tle/index');

const { cesium_custom_class } = require('../cesium_modules/index');

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
                 
                sat_entities : [

                  { name : "thaicom4", tle : false, path : false, footprints : false, cc : 0 , click_position : null },
                  { name : "thaicom6", tle : false, path : false, footprints : false, cc : 0 , click_position : null },
                  { name : "thaicom8", tle : false, path : false, footprints : false, cc : 0 , click_position : null }

                ] 
               
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
              // viewer.entities.add({
              //     name : 'หอดูดาวดอยอินทนนท์',
              //     position: Cesium.Cartesian3.fromDegrees(98.485591343893248, 18.589976828998569),            
              //     ellipse : {
              //         semiMinorAxis : 100000.0,
              //         semiMajorAxis : 100000.0,
              //         material : Cesium.Color.RED.withAlpha(0.5)
              //     }
              // });
        
              // viewer.entities.add({
              //       name : 'หอดูดาวสมุย',
              //       position: Cesium.Cartesian3.fromDegrees(99.989915136340997,9.4860943174077992),
              //       ellipse : {
              //           semiMinorAxis : 100000.0,
              //           semiMajorAxis : 100000.0,
              //           material : Cesium.Color.RED.withAlpha(0.5)
              //       }
              //   });

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


              cct =new Date().toISOString()

              current_time = Cesium.JulianDate.fromIso8601( cct );


              clock_start=true  
              viewer.clock.onTick.addEventListener( this.onTimeTrick_2 );

              let cc = color_items[Math.floor(Math.random()*color_items.length)];              
              let timesp = new Date().getTime()

              try{
              
                // let ssl = JSON.parse( localStorage.getItem('$tle-seclection-data') )
 
                // for(let i=0;i<ssl.length;i++){

                //   this.fn_make_path( cc, ssl[i].name, ssl[i].line1, ssl[i].line2 )
                //   this.add_satellite_by_tle ( cc, ssl[i].name, ssl[i].line1, ssl[i].line2, timesp )

                // }
                

              }catch(e){}

              

              // --------------------------------------------------------------------------------
                
               
              _cesium_custom_class = new cesium_custom_class('')

              let handler_1 = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
              handler_1.setInputAction((movement) => {
                
                let pickedObject = viewer.scene.pick(movement.position); 

                this.fn_handler_1( pickedObject )

              }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

           },
           async fn_handler_1( pickedObject  ){

             if( Cesium.defined( pickedObject ) ){

              //  console.log( 'pickedObject => ', pickedObject.id , cartesian  )

              let _sat_tle = new sat_tle('')

              for(let i=0;i<this.sat_entities.length;i++){
                 
                if( this.sat_entities[i].name == pickedObject.id.name ){

                  if( this.sat_entities[i].tle_dataSource ){

                      // console.log( 'tle_dataSource => ', this.sat_entities[i].tle_dataSource.entities.values[0].position ) 
                      // ---------------------------------------------------------------------------------------------------------
                      
                       
                      if( this.sat_entities[i].name == 'thaicom4' ){
                        let __sat_tle = await _sat_tle.thaicom_4_tles()  
                        this.sat_entities[i].click_position = await this.calc_position ( __sat_tle )

                      }else if( this.sat_entities[i].name == 'thaicom6' ){
                        let __sat_tle = await _sat_tle.thaicom_6_tles()  
                        this.sat_entities[i].click_position = await this.calc_position ( __sat_tle )

                      }else if( this.sat_entities[i].name == 'thaicom8' ){
                        let __sat_tle = await _sat_tle.thaicom_8_tles()  
                        this.sat_entities[i].click_position = await this.calc_position ( __sat_tle )
                        
                      }

                      // console.log(  this.sat_entities[i].click_position )
                      // ---------------------------------------------------------------------------------------------------------
                      

                    //   await new Promise(resolve => {

                    //   if( this.sat_entities[i].poly_center ){

                    //           if( this.sat_entities[i].click_position ){
                    //               let id1 = generateChallenge()
                    //               let id2 = generateChallenge()

                    //               this.sat_entities[i].dest_line_id_1 = id1
                    //               this.sat_entities[i].dest_line_id_2 = id2

                    //               this.sat_entities[i].dest_line_id_1 = viewer.entities.add({
                    //                   id: id1,
                    //                       position : this.sat_entities[i].click_position
                                          
                    //               });


                    //               let cartographic = Cesium.Cartographic.fromCartesian( this.sat_entities[i].poly_center ); 
                                  
                    //               this.sat_entities[i].dest_line_id_2 = viewer.entities.add({
                    //                   id: id2,
                    //                   position : Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(cartographic.longitude), Cesium.Math.toDegrees(cartographic.latitude), 0),
                    //                   polyline : {
                                          
                    //                       arcType: Cesium.ArcType.NONE,
                                          
                    //                       positions : new Cesium.PositionPropertyArray([
                    //                           new Cesium.ReferenceProperty(viewer.entities, id1, ['position']),
                    //                           new Cesium.ReferenceProperty(viewer.entities, id2, ['position']),
                    //                         ]),
                    //                       width : 0.5,
                    //                       material : Cesium.Color.fromCssColorString( "#d95727" ) 
                    //                   }
                    //               });

                    //           }

                    //           resolve()

                    //       }else{

                    //           resolve()
                    //       }

                    // })

                    // ---------------------------------------------------------------------------------------------------------

                    if( this.sat_entities[i].path == true ){
                      this.sat_entities[i].tle_dataSource.entities.values[0].path.show = false
                      this.sat_entities[i].path = false
                       
                      viewer.entities.remove( this.sat_entities[i].dest_line_id_1 );
                      viewer.entities.remove( this.sat_entities[i].dest_line_id_2 );

                    }else{
                      this.sat_entities[i].tle_dataSource.entities.values[0].path.show = true
                      this.sat_entities[i].path = true

                      await new Promise(resolve => {

                        if( this.sat_entities[i].poly_center ){

                                if( this.sat_entities[i].click_position ){
                                    let id1 = generateChallenge()
                                    let id2 = generateChallenge()
 
                                    this.sat_entities[i].dest_line_id_1 = viewer.entities.add({
                                        id: id1,
                                            position : this.sat_entities[i].click_position
                                            
                                    });


                                    let cartographic = Cesium.Cartographic.fromCartesian( this.sat_entities[i].poly_center ); 
                                    
                                    this.sat_entities[i].dest_line_id_2 = viewer.entities.add({
                                        id: id2,
                                        position : Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(cartographic.longitude), Cesium.Math.toDegrees(cartographic.latitude), 0),
                                        polyline : {
                                            
                                            arcType: Cesium.ArcType.NONE,
                                            
                                            positions : new Cesium.PositionPropertyArray([
                                                new Cesium.ReferenceProperty(viewer.entities, id1, ['position']),
                                                new Cesium.ReferenceProperty(viewer.entities, id2, ['position']),
                                              ]),
                                            width : 0.5,
                                            material : Cesium.Color.fromCssColorString( this.sat_entities[i].cc ) 
                                        }
                                    });

                                }

                                resolve()

                            }else{

                                resolve()
                            }

                      })

                    }
                    
                  }

                }
                
                

              }

             }

           },
           onTimeTrick_2(clock){

            if(clock_start){
 
              current_time = Cesium.JulianDate.toDate( clock.currentTime)

              

              // let current_clock_multiplier = clock.multiplier       

              // let du_time_1 = Cesium.JulianDate.toDate( clock.currentTime)
              // let du_time_2 = Cesium.JulianDate.toDate( clock.currentTime)
  

            }

          },
          async calc_position ( __sat_tle ) {
                     
                    let du_time_1 = current_time

                                          let satrec_du_1 = satellite.twoline2satrec( __sat_tle.line1, __sat_tle.line2, );
                                          let positionAndVelocity_du_1 = satellite.propagate(satrec_du_1, du_time_1);
                                          let positionEci_du_1 = positionAndVelocity_du_1.position,
                                              velocityEci_du_1 = positionAndVelocity_du_1.velocity;
                                          let gmst_du_1 = satellite.gstime( du_time_1 );

                                          
                                          let positionEcf_du_1   = satellite.eciToEcf(positionEci_du_1, gmst_du_1),                                            
                                              positionGd_du_1    = satellite.eciToGeodetic(positionEci_du_1, gmst_du_1);

                                          

                                          let longitude = satellite.degreesLong(positionGd_du_1.longitude),
                                              latitude  = satellite.degreesLat(positionGd_du_1.latitude),
                                              height    = positionGd_du_1.height*1000;

                    
                    return Cesium.Cartesian3.fromDegrees(longitude, latitude, height)

          },
          parsePeturboDATFiles : function (data) {

            console.log(data) 

          },

          async select_tle(tle_index){

            this.sat_entities[tle_index].tle = !this.sat_entities[tle_index].tle
            this.sat_entities.splice( tle_index, 1, this.sat_entities[tle_index] ) 

            if( this.sat_entities[tle_index].cc == 0 ){

              this.sat_entities[tle_index].cc = color_items[Math.floor(Math.random()*color_items.length)];  

            }
             
            await this.fn_select_footprints(tle_index)

            let _sat_tle = new sat_tle('')

            if( this.sat_entities[tle_index].tle == true ){

                if( tle_index == 0 ){

                  let __sat_tle = await _sat_tle.thaicom_4_tles() 
                  await _cesium_custom_class.fn_make_path( Cesium, viewer, current_czml_date, current_clock_multiplier, current_time, this.sat_entities[tle_index].cc, this.sat_entities[tle_index].name, __sat_tle.line1, __sat_tle.line2, (dataSource)=>{ this.sat_entities[tle_index].tle_dataSource = dataSource } )
                  
                }else if( tle_index == 1 ){

                  let __sat_tle = await _sat_tle.thaicom_6_tles() 
                  await _cesium_custom_class.fn_make_path( Cesium, viewer, current_czml_date, current_clock_multiplier, current_time, this.sat_entities[tle_index].cc, this.sat_entities[tle_index].name, __sat_tle.line1, __sat_tle.line2, (dataSource)=>{ this.sat_entities[tle_index].tle_dataSource = dataSource } )

                }else if( tle_index == 2 ){

                  let __sat_tle = await _sat_tle.thaicom_8_tles() 
                  await _cesium_custom_class.fn_make_path( Cesium, viewer, current_czml_date, current_clock_multiplier, current_time, this.sat_entities[tle_index].cc, this.sat_entities[tle_index].name, __sat_tle.line1, __sat_tle.line2, (dataSource)=>{ this.sat_entities[tle_index].tle_dataSource = dataSource } )

                }

                  


            }else{

              viewer.dataSources.remove( this.sat_entities[tle_index].tle_dataSource ); 
              this.sat_entities[tle_index].cc = 0

            }
             
            

          },
          async fn_select_footprints(footprints_index){

            
            if( this.sat_entities[footprints_index].cc == 0 ){

              this.sat_entities[footprints_index].cc = color_items[Math.floor(Math.random()*color_items.length)];  

            }

            this.sat_entities[footprints_index].footprints = !this.sat_entities[footprints_index].footprints
            this.sat_entities.splice( footprints_index, 1, this.sat_entities[footprints_index] )

            let _sat_kml = new sat_footprints('')
                  
            var kmlContent =''
            
            if( footprints_index == 0 ){
              kmlContent = await _sat_kml.thaicom_4_footprints()  
            }else if( footprints_index == 1 ){
              kmlContent = await _sat_kml.thaicom_6_footprints()  
            }else if( footprints_index == 2 ){
              kmlContent = await _sat_kml.thaicom_8_footprints()  
            }
            

            if( this.sat_entities[footprints_index].footprints == true ){
 

                  var options = {
                      camera : viewer.scene.camera,
                      canvas : viewer.scene.canvas 
                  };

                  var parser = new DOMParser();
                  var kmlDoc = parser.parseFromString(kmlContent.data, "text/xml");
                    

                   let promise = Cesium.KmlDataSource.load(kmlDoc, options);
                   promise.then((dataSource)=> {
                      
                      this.sat_entities[footprints_index].dataSource = dataSource

                      viewer.dataSources.add(dataSource);  

                      let entities = dataSource.entities.values; 
                      
                      for(let i =0; i < entities.length; i++) {

                        try{

                          let e = entities[i]; 

                          var poly_center = Cesium.BoundingSphere.fromPoints(e.polygon.hierarchy.getValue().positions).center;
                          poly_center = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(poly_center);

                          this.sat_entities[footprints_index].poly_center = poly_center
                          // -----------------------------------------------------------------------------------------------------------
                             

                          // -----------------------------------------------------------------------------------------------------------

                          e.polygon.material = Cesium.Color.fromCssColorString( this.sat_entities[footprints_index].cc ).withAlpha(0.1)   
                          e.show = true
                          
                        }catch(e){
                          console.log( e )
                        }
                          
                      } 
 

                   })

            }else{

                  
                  viewer.dataSources.remove( this.sat_entities[footprints_index].dataSource ); 

                  viewer.entities.remove( this.sat_entities[footprints_index].dest_line_id_1 );
                  viewer.entities.remove( this.sat_entities[footprints_index].dest_line_id_2 );

                  this.sat_entities[footprints_index].tle = false
                  this.sat_entities[footprints_index].path = false
                  this.sat_entities[footprints_index].footprints = false
                  this.sat_entities[footprints_index].click_position = null 

 
            }

          },
          async select_footprints(footprints_index){

            
            
            if( footprints_index == 0 ){
               
            }else if( footprints_index == 1 ){
              
            }else if( footprints_index == 2 ){
               
            }
            
 

          }
    },
    mounted() {

        
          this.$refs.topProgress.start()

          setTimeout(() => { this.$refs.topProgress.done() }, 10);
          
          this.loading=false
          this.init()
          
           
         

        
    },
    watch: {
       
       sat_entities () {

        //  console.log( this.sat_entities )
       },
     

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