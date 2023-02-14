<template>

    <div style="height:100vh;border:0px solid red;margin-top:0em;margin-left:0em;margin-right:0em;">
    <vue-topprogress ref="topProgress" color="#FF0000"></vue-topprogress>
    <div id="navbar">
        <b-row  >
        
            <nav class="nav-top" >       
            
                <a class="nav__link"> 
                    
                    <span class="w-100" style="font-size:1.3em;color:#FFFFFF"> TLE Data List</span>

                </a>

            </nav>
        </b-row>
    </div>  

    <!-- <div style="height:40px;">
        <b-row  > 

            <p class="fake-legend-2 text-success"><span style="font-size:1em;">TLE Data</span></p> 
            
        </b-row>
    </div>   -->
    <!-- ------------------------------------------------------------------------ -->
     
    <main class="site-wrapper" style="margin-top:2em;">

      <div class="media-body text-left ml-0 align-self-center" style="zoom:0.9;margin-top:1em;height:83vh" >

        <b-row style="margin:1em;"  class="text-center" >

                    
                    <b-col cols="7" class="p-2 text-center"   >
                      <b-form-input id="input-valid" style="cursor:pointer;margin-left:0.5em;font-size:1.1em;border-color:#474A8A;"  
                        placeholder="Type < Name of Satellite > or < NORAD ID > for Search Satellites" class="rounded-0 border-2" 
                        v-model="tle_name" 
                        @keyup.enter="search_tle_byName(tle_name)"
                        autocomplete="off"
                        type="search"
                      >
                      </b-form-input>
                    </b-col>
                    <b-col cols="5" class="p-2">

                        <b-pagination
                                            style="margin-right:1em;" 
                                            v-model="currentPage"
                                            :total-rows="totalRows"
                                            :per-page="perPage"
                                            align="right"
                        ></b-pagination>
                    </b-col>

        </b-row>

        <div id="id-content" style="margin:1em;margin-top:-2.5em;">

            <div id="tab-container-1" style="height:80vh;overflow-x:hidden;border :0px dashed #5F1854;margin-top:0em;"> 
                
                <p class="fake-legend-1 text-success"><span>Group</span></p> 

                <div class="row mt-3" >
          
                  
                <div class="col-12 " v-for="(data,index) in tle_type_menu" :key="index">
                  
                <div v-if="data.name != 'hr'">
                  <div :class="data.selected==true ? 'card border-primary rounded-0 border-2 mt-1 selection_ele w-100' : 'card border-dark rounded-0 border-1 mt-1 selection_ele w-100'" 
                    style="cursor:pointer;" @click="select_tle_type( data.name  )"
                  >
                  <div class="card-content text-left m-2" >
                    
                          <span :class="data.selected==true ? 'font-weight-bold text-primary' :  'font-weight-bold text-dark'">
                            
                            <section >
                            <i class="far fa-check-square mr-2" v-if="data.selected==true"></i>
                            <i class="far fa-square mr-2" v-else></i>
                            

                            <span >{{data.name}} </span> 
                                <span class="aaa"></span>
                                <span style="font-size:0.9em;float:right;">{{data.count}} entries</span>
                            </section>

                          </span>
                        
                  </div>
                  </div>

                </div>

                <div v-else-if="data.name == 'hr'">
                    <hr style="background-color:#ffffff;border-top: 0px dashed #999;border-bottom: 1px dashed #000000 !important;margin-top:0.5em;margin-bottom:0.4em;"/>
                </div>


                </div>

                </div>

                
                
            </div>

        </div> 
        <!-- --------------------- -->

        <div id="main-container-1" style="height:80vh;overflow:auto;border :0px dashed #5F1854;" >
            
            <p class="fake-legend-1 text-success"><span>Satellite list</span></p> 

            <div class="row" >

             <!-- <b-row class="text-center" style="border :1px dashed #5F1854;"> -->

                <div class="col-12 " v-for="(data,index) in arr" :key="index">
          
                <div :class="data.selected==true ? 'card border-primary rounded-0 border-2 mt-1 selection_ele w-100' : 'card border-dark rounded-0 border-1 mt-1 selection_ele w-100'" 
                  style="cursor:pointer;"  @click="tle_edit( data )"
                >
                  <div class="card-content text-left m-2">
                    
                          <span :class="data.selected==true ? 'font-weight-bold text-primary' :  'font-weight-bold text-dark'">
                            
                            <section >
                            <i class="far fa-check-square mr-2" v-if="data.selected==true"></i>
                            <i class="far fa-square mr-2" v-else></i>
                            

                            <span ><b>{{data.sat_info.name}}</b> ({{data.sat_info.norad_catalog_number}}), Period {{data.sat_info.period}} hours/day</span> 
                            
                                <span class="aaa"></span>
                                <span style="font-size:0.9em;float:right;">TLE Age {{data.sat_info.tle_age}} days</span>
                            </section>

                          </span>
                        
                  </div>
                </div>

                </div> 
                        
             <!-- </b-row>     -->
            
            </div>

        </div>

            
      </div>
          
    </main>

    <div class="footer">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <nav class="nav" style="height:80px;" >
        
        

        <router-link to="/users/admin" class="nav__link"> 
           <i class="material-icons nav__icon" >arrow_back</i>
            
           <span class="nav__text">Back</span>
        </router-link>


        <!-- <router-link to="/users/admin" class="nav__link"> 
           <i class="material-icons nav__icon" >travel_explore</i>
            
           <span class="nav__text">List</span>
        </router-link> -->

        <a class="nav__link" @click="select_menu=1">           
           
           <i :class=" true ? 'material-icons nav__icon nav__link--active' : 'material-icons nav__icon ' " >travel_explore</i>
           <span :class=" true ? 'nav__text text-danger font-weight-bold' : 'nav__text'">List</span>
           
        </a>

        <router-link to="/tle/upload" class="nav__link"> 
           <i class="material-icons nav__icon" >upload_file</i>
            
           <span class="nav__text">Upload</span>
        </router-link>

        

        <router-link to="/" class="nav__link">
            <i class="material-icons nav__icon" >logout</i>
            <span class="nav__text">Logout</span>
        </router-link>

       
        </nav>
    </div>
    <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <b-modal v-model="open_upload" dialog-class="modal-xl-3" centered no-close-on-backdrop hide-footer hide-header hide-header-close  title="info"   >
        
          <b-row> 
            
             <deverlopTemplate1 />
              
          </b-row>

          <template v-slot:modal-footer="{ }">  
            <b-row  class="w-100" style="margin-bottom:1em;">  
              <b-col cols="3">
              </b-col>
              <b-col  cols="3"></b-col>
              <b-col  cols="3">
                
              </b-col>

              <b-col  cols="3">
              </b-col>
            </b-row>
          </template>


        </b-modal>   

    </div>

</template>



<script>

/* eslint-disable */

 

import moment from 'moment'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue' 

import { vueTopprogress } from 'vue-top-progress'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
import axios from 'axios'
import myConfig from '../config.js'

import { server }  from '../login_modules' 
import { encrypt_js } from "../encrypt_modules_js" 

import deverlopTemplate1 from './upload_template_1.vue' 

import * as tlejs from "tle.js";
var satellite = require('satellite.js');
var TLEX = require( 'tle' )

export default {
  name: 'calendar',
  components: {
		vueTopprogress,
    deverlopTemplate1
	},
  data() {
            return {    
                 
                  open_tle_edit:true,
                  tle_type_menu_tmp : [
                         
                        // --------------------------------------------------------------------------------
                        { selected : false , name: 'Full Catalog', count :0 }, 

                        { selected : false , name: 'hr', count :0 }, 

                        { selected : false , name : 'Last Launches 30 Days', count :0 },
                        { selected : false , name : 'Space Stations', count :0 }, 
                        // { selected : false , name: "Active Satellites", count :0  },
                        { selected : false , name : 'Active Geosynchronous', count :0 }, 
                        // { selected : false , name : 'Navigation Satellites', count :0 }, 
                        // { selected : false , name : 'Communications Satellites', count :0 },   
                        // { selected : false , name : 'IRIDIUM 33 Debris', count :0 }, 
                        // { selected : false , name : 'COSMOS 2251 Debris', count :0 }, 
                        // { selected : false , name : 'Space Debris', }, 

                        { selected : false , name: 'hr', count :0 }, 

                        { selected : false , name : 'Starlink', count :0 },
                        { selected : false , name : 'Beidou', count :0 },

                        { selected : false , name: 'hr', count :0 }, 
                        
                        { selected : false , name : 'Thai Satellites', count :0 },
                      
                        
                  ],
                   
                  tle_type_menu : [],
                  fields: [
                    { key: 'selected', label: '' , class: 'text-left' , thStyle: {width: '3% !important'}  , sortable: false },
                    { key: 'name', label: 'Name' , class: 'text-left' , thStyle: {width: '20% !important'}  , sortable: false },
                    { key: 'type', label: 'Type' , class: 'text-left' , thStyle: {width: '10% !important'}  , sortable: false },
                    { key: 'created_TH', label: 'created' , class: 'text-left' , thStyle: {width: '10% !important'}  , sortable: false },
                    { key: 'footprint', label: 'footprint' , class: 'text-left' , thStyle: {width: '20% !important'}  , sortable: false },
                  ],
                  fields_1: [
                    { key: 'selected', label: '' , class: 'text-center' , thStyle: {width: '3% !important'}  , sortable: false },
                    { key: 'name', label: 'Type' , class: 'text-center' , thStyle: {width: '70% !important'}  , sortable: false },
                     
                  ],
                  arr:[],

                  currentPage: 1,
                  perPage: 8,
                  totalRows:0,

                  selected_name : '',
                  tle_name : ''
                 
               
            }
              
    },
        
    
    methods: {
           async tle_edit(value){  

             console.log( value )
             this.arr.forEach( (v, i, a) => {

                if( value._id == v._id){

                  v.selected = true 
                   
                }else{
                  
                  v.selected = false

                }

                this.arr.splice(i , 1 , v)

            })

             
             let dd = await this.sat_info( value )
             let id = dd.name+'@'+dd.norad_catalog_number
             
             let c = await this.get_docs_contents( id, 'docs_contents' )
             if( c.result == 'Process-Complete' ){ 
 

                let _content = JSON.parse( c.data.progress_reason )
                this.$store.commit('set_tle_content', JSON.parse(JSON.stringify( _content )));

             }else{
                
                this.$store.commit('set_tle_content', JSON.parse(JSON.stringify( [] )));

             }

            //  ---------------------------------------------------------------------------- 
             let tmp = {
               item : value
             }
             this.$store.commit('set_tle_data', JSON.parse(JSON.stringify( tmp )));
             this.$store.commit('set_open_upload', true);

           }, 
           async get_docs_contents( id, main_doc_name ){

                      return new Promise((resolve, reject) => { 

                                const config = {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                                let requestBody = {

                                    id : id, 
                                    main_doc_name : main_doc_name 

                                }
                              
                                const json = JSON.stringify(requestBody)
                                
                                let end_point = myConfig.server_domain+"/v1/tle/get/docs/contents"
                                

                                axios.post( end_point, json, config )
                                .then(response => {
 
                                    resolve( response.data )

                                }).catch(()=>{ 
                                 
                                    reject() 

                                })  

                      })

          },
          // async sat_info ( item ) {
            
            // try{

                 
                
            //     let tle_tmp = item.name+'\n' +
            //                   item.line1+'\n' +
            //                   item.line2; 

                       

            //     let obj={
            //                         name:item.name.trim(),  
            //                         norad_catalog_number:tlejs.getCatalogNumber(tle_tmp),
                                     
            //     }

            //     return obj

            // }catch(e){
              
            //   console.log( e )
            //   return;

            // }

            async sat_info ( item ) {
             
            try{

                let observerGd = {  //ดอยอินทนน์
                                      longitude: satellite.degreesToRadians(98.485591343893248),
                                      latitude: satellite.degreesToRadians(18.589976828998569),
                                      height: 0.500
                            };

                let timesp = new Date().getTime()
                
                let tle_tmp = item.name+'\n' +
                          item.line1+'\n' +
                          item.line2;

                

                        let getIntDesignatorPieceOfLaunch =  tlejs.getIntDesignatorPieceOfLaunch(tle_tmp);
                        let getIntDesignatorLaunchNumber = Number( tlejs.getIntDesignatorLaunchNumber(tle_tmp) );
                        if(getIntDesignatorLaunchNumber>99){ getIntDesignatorLaunchNumber=getIntDesignatorLaunchNumber }
                        else if( (getIntDesignatorLaunchNumber>10)&&(getIntDesignatorLaunchNumber<99) ){ 
                          getIntDesignatorLaunchNumber='0' + getIntDesignatorLaunchNumber 
                        }else if( (getIntDesignatorLaunchNumber<10) ){ 
                          getIntDesignatorLaunchNumber='00' + getIntDesignatorLaunchNumber 
                        }

                        let getIntDesignatorYear = Number( tlejs.getIntDesignatorYear(tle_tmp) );
                        if(getIntDesignatorYear>57){ getIntDesignatorYear='19' + getIntDesignatorYear }
                        else { 
                        
                              if(getIntDesignatorYear<10){ getIntDesignatorYear='200' + getIntDesignatorYear }
                              else{ getIntDesignatorYear='20' + getIntDesignatorYear }
                        
                        }

                          let getEpochYear = tlejs.getEpochYear(tle_tmp);
                          let getEpochDay = tlejs.getEpochDay(tle_tmp);

                          if(getEpochYear>57){ getEpochYear='19' + getEpochYear }
                          else { 
                          
                                if(getEpochYear<10){ getEpochYear='200' + getEpochYear }
                                else{ getEpochYear='20' + getEpochYear }
                          
                          }

                          
                          
                           
                          let meanMotion = tlejs.getMeanMotion(tle_tmp);
                          let period=( ( 1 / Number(meanMotion) )*24 ).toFixed(2)
                          let norad_id=tlejs.getCatalogNumber(tle_tmp)

                          let Epoch=(new Date( tlejs.getEpochTimestamp(tle_tmp) )).toUTCString()
                          

                          if(isNaN(Epoch)){  // For Fire Fox
                            let satrec = TLEX.parse( tle_tmp );
                            Epoch=(new Date( satrec.date )).toUTCString()
                          }

                          let PropagationTime = get_time_diff( Epoch )
                          
                          this.reflash_time=(new Date( timesp )).toUTCString()

                          let type='PAYLOAD'
                          if( item.name.includes(' DEB') ){

                              type='DEBRIS'

                          }else if( item.name.includes('R/B') ){

                              type='ROCKET BODY'

                          }

                          let obj={
                                    name:item.name.trim(),
                                    line_1:item.line1,
                                    line_2:item.line1,
                                    satellite_footprint:'',

                                     
                                    norad_catalog_number:tlejs.getCatalogNumber(tle_tmp),
                                    international_designator:getIntDesignatorYear+'-'+getIntDesignatorLaunchNumber+getIntDesignatorPieceOfLaunch,
                                    
                                    azimuth:0,
                                    elevation:0,
                                    azimuth_elevation:0,                                   
                                    height:0,
                                    velocity:0,
                                    range:0,
                                    range_prev:0,
                                    lat:0,
                                    lng:0,
                                    type:type,
                                    // ------------------------------
                                    observer:observerGd,
                                    motion:meanMotion,
                                    period:period,
                                     
                                    tle_age:PropagationTime.toFixed(2),
                                     

                          }

                return obj

            }catch(e){
              
              console.log( e )
              return;

            }

           

          },
           async search_tle_byName ( name ){
              
             if( name.length > 0 ){

                this.tle_type_menu.forEach( (v, i, a) => {

                  v.selected = false

                  this.tle_type_menu.splice(i , 1 , v)

                })

                this.totalRows=0
                this.currentPage=1
                this.arr=[]
                // this.tle_type_menu_tmp = JSON.parse(JSON.stringify( this.tle_type_menu ) )
                

                let d_count = await this.fn_count_tle__by_name( '', name )
                this.tle_type_menu = [{ selected : true , name : 'Search TLE by name', count : d_count.count },]

                this.totalRows = d_count.count
                this.currentPage=1
                // ---------------------------------------------------------------------

                let encrypt = new encrypt_js( '' )
                let my_connection_key = await encrypt.create_connection_key()

                this.$refs.topProgress.start()

                let d = await this.fn_get_tle_by_name( '', my_connection_key.publicKey, name , this.currentPage, this.perPage ) 
                

                let p = await encrypt.buffer_key_from_base64( my_connection_key.privateKey , ["decrypt"] )

                let str = await encrypt.message_decrypted( p , Buffer.from( d.data.encryption_key , 'base64'), Buffer.from( d.data.encryption_message , 'base64') )
                let decrypt_str = Buffer.from( str ).toString()

                this.$refs.topProgress.done()

                let data = JSON.parse( decrypt_str )

                // console.log( data )

                this.arr = JSON.parse(JSON.stringify( data ))

                this.arr.forEach( async(v, i, a) => { 
                           
                          v.sat_info = await this.sat_info( v )
                           
                          this.arr.splice(i , 1 , v)

                })

                // this.arr = data

                // let ssl = ''
                // try{
                //       ssl = JSON.parse( localStorage.getItem('$tle-seclection-data') )

                //       this.arr.forEach( (v, i, a) => {
                      

                //           ssl.forEach( (vv, ii, aa) => {

                //             if( v._id === vv._id ){

                //               v.selected = true

                //             } 

                //           })


                //     })
                    
                // }catch(e){}
 


             }else{

                
               this.arr=[] 
               this.totalRows = 0

              //  console.log( this.tle_type_menu_tmp )
               if( this.tle_type_menu_tmp.length > 0 ){

                 this.tle_type_menu = JSON.parse(JSON.stringify( this.tle_type_menu_tmp ) )

               }else{

                 this.tle_type_menu.forEach( (v, i, a) => {

                  v.selected = false

                  this.tle_type_menu.splice(i , 1 , v)

                })

               }

             }

           },
           async select_tle_type ( name ){

              this.selected_name = name
              this.arr=[]

              this.tle_type_menu.forEach( (v, i, a) => {

                   
                    if( v.name === name ){
                      v.selected = true
                    }else{
                      v.selected = false
                    }

                    this.tle_type_menu.splice(i , 1 , v)

              })

              this.totalRows = 0

              try{

              
                let c = await this.fn_count_tle__by_type( '', name ) 
                this.totalRows = c.count
                this.currentPage=1
                // ------------------------------------------------------------------------------------------------

                let encrypt = new encrypt_js( '' )
                let my_connection_key = await encrypt.create_connection_key()

                this.$refs.topProgress.start()

                let d = await this.fn_get_type_by_type( '', my_connection_key.publicKey, name , this.currentPage, this.perPage ) 

                let p = await encrypt.buffer_key_from_base64( my_connection_key.privateKey , ["decrypt"] )

                let str = await encrypt.message_decrypted( p , Buffer.from( d.data.encryption_key , 'base64'), Buffer.from( d.data.encryption_message , 'base64') )
                let decrypt_str = Buffer.from( str ).toString()

                this.$refs.topProgress.done()

                let data = JSON.parse( decrypt_str )

                

                this.arr = JSON.parse(JSON.stringify( data ))

                this.arr.forEach( async(v, i, a) => { 
                           
                          v.sat_info = await this.sat_info( v )
                           
                          this.arr.splice(i , 1 , v)

                })

                // let ssl = ''
                // try{
                //       ssl = JSON.parse( localStorage.getItem('$tle-seclection-data') )

                //       this.arr.forEach( async(v, i, a) => {
                      

                //           ssl.forEach( (vv, ii, aa) => {

                //             if( v._id === vv._id ){

                //               v.selected = true

                //             } 

                //           }) 
                           
                //           v.sat_info = await this.sat_info( v )
                //           console.log( v.sat_info )
                //           this.arr.splice(i , 1 , v)

                //       })
                    
                // }catch(e){
                //   console.log(e)
                // }

              }catch(e){
                console.log(e)
              } 

           },
           async next_page_tle( name ){

                this.selected_name = name 
                this.arr=[]

                let encrypt = new encrypt_js( '' )
                let my_connection_key = await encrypt.create_connection_key()

                this.$refs.topProgress.start()

                let d = await this.fn_get_type_by_type( '', my_connection_key.publicKey, name , this.currentPage, this.perPage ) 

                let p = await encrypt.buffer_key_from_base64( my_connection_key.privateKey , ["decrypt"] )

                let str = await encrypt.message_decrypted( p , Buffer.from( d.data.encryption_key , 'base64'), Buffer.from( d.data.encryption_message , 'base64') )
                let decrypt_str = Buffer.from( str ).toString()

                this.$refs.topProgress.done()

                let data = JSON.parse( decrypt_str )
                
                this.arr = JSON.parse(JSON.stringify( data ))

                this.arr.forEach( async(v, i, a) => { 
                           
                          v.sat_info = await this.sat_info( v )
                          
                          this.arr.splice(i , 1 , v)

                })

                // let ssl = ''
                // try{
                //       ssl = JSON.parse( localStorage.getItem('$tle-seclection-data') )

                //       this.arr.forEach( async (v, i, a) => {
                      

                //           ssl.forEach( (vv, ii, aa) => {

                //             if( v._id === vv._id ){

                //               v.selected = true

                //             } 

                //           })

                //           v.sat_info = await this.sat_info( v )
                //           console.log( v.sat_info )
                //           this.arr.splice(i , 1 , v)


                //     })
                    
                // }catch(e){}


           },
           async next_page_search_tle_byName ( name ){
              

             if( name.length > 0 ){

                this.tle_type_menu.forEach( (v, i, a) => {

                  v.selected = false

                  this.tle_type_menu.splice(i , 1 , v)

                })

                 
                this.arr=[]
                // this.tle_type_menu_tmp = JSON.parse(JSON.stringify( this.tle_type_menu ) )
                this.tle_type_menu = [{ selected : true , name : 'Search TLE by name', count : 0 },]

                 
                // ---------------------------------------------------------------------

                let encrypt = new encrypt_js( '' )
                let my_connection_key = await encrypt.create_connection_key()

                this.$refs.topProgress.start()

                let d = await this.fn_get_tle_by_name( '', my_connection_key.publicKey, name , this.currentPage, this.perPage ) 

                let p = await encrypt.buffer_key_from_base64( my_connection_key.privateKey , ["decrypt"] )

                let str = await encrypt.message_decrypted( p , Buffer.from( d.data.encryption_key , 'base64'), Buffer.from( d.data.encryption_message , 'base64') )
                let decrypt_str = Buffer.from( str ).toString()

                this.$refs.topProgress.done()

                let data = JSON.parse( decrypt_str )

                // console.log( data )

                this.arr = JSON.parse(JSON.stringify( data ))

                this.arr.forEach( async(v, i, a) => { 
                           
                          v.sat_info = await this.sat_info( v )
                           
                          this.arr.splice(i , 1 , v)

                })

                


             }else{

                
               this.arr=[] 
               this.totalRows = 0
               if( this.tle_type_menu_tmp.length > 0 ){

                 this.tle_type_menu = JSON.parse(JSON.stringify( this.tle_type_menu_tmp ) )

               }else{

                 this.tle_type_menu.forEach( (v, i, a) => {

                  v.selected = false

                  this.tle_type_menu.splice(i , 1 , v)

                })

               }

             }

           },
           
          onRowClicked : async function(item, index, event) {

               
                this.arr.forEach( (v, i, a) => {

                   
                    if( v._id === item._id ){
                      v.selected = true
                    }else{
                      v.selected = false
                    }

                    this.arr.splice(i , 1 , v)

                }) 
            

           },
           rowClass(item, type) {
                if (!item || type !== 'row') return  
                if (item.selected === true) return 'table-dark'

               
           },
           fn_count_tle__by_name : async function ( token, name ) {


              return new Promise((resolve, reject) => { 

                      const config = {
                          headers: {
                              'Content-Type': 'application/json'
                          }
                      }
                      let requestBody = {                                
                          
                          "token" : token,
                          "name" : name
                          
                      }
                    
                      const json = JSON.stringify(requestBody) 
                      
                      let end_point = myConfig.server_domain + "/v1/tle/search/name/countDocuments"
                      // let end_point = "http://localhost:5000/ssa-app/api" + "/v1/tle/search/name/countDocuments"
                      
                      axios.post( end_point, json, config )
                      .then(response => { 
                      
                              resolve( response.data )

                      }).catch( (e) => {
                          
                              reject(e)    
                      }) 
              })  

           },
           fn_get_tle_by_name  : async function ( token, recipient_publickey, name ) {


              return new Promise((resolve, reject) => { 

                      const config = {
                          headers: {
                              'Content-Type': 'application/json'
                          }
                      }
                      let requestBody = {                                
                          
                          "token" : token,
                          "recipient_publickey" : recipient_publickey,
                          "name" : name,
                          "page" : this.currentPage, 
                          "page_size" : this.perPage,
                          
                      }
                    
                      const json = JSON.stringify(requestBody) 
                      
                      let end_point = myConfig.server_domain + "/v1/tle/get/by/name/encrypt"
                      // let end_point = "http://localhost:5000/ssa-app/api" + "/v1/tle/get/by/name/encrypt"
                      
                      axios.post( end_point, json, config )
                      .then(response => { 

                              resolve( response.data )

                      }).catch( (e) => {
                          
                              reject(e)    
                      }) 
              })  

           },
            
           fn_count_tle__by_type : async function ( token, type ) {


              return new Promise((resolve, reject) => { 

                      const config = {
                          headers: {
                              'Content-Type': 'application/json'
                          }
                      }
                      let requestBody = {                                
                          
                          "token" : token,
                          "type" : type
                          
                      }
                    
                      const json = JSON.stringify(requestBody) 
                      
                      let end_point = myConfig.server_domain + "/v1/tle/count/"+type
                      
                      axios.post( end_point, json, config )
                      .then(response => { 
                      
                              resolve( response.data )

                      }).catch( (e) => {
                          
                              reject(e)    
                      }) 
              })  

           },
           fn_get_type_by_type : async function ( token, recipient_publickey, type ) {


              return new Promise((resolve, reject) => { 

                      const config = {
                          headers: {
                              'Content-Type': 'application/json'
                          }
                      }
                      let requestBody = {                                
                          
                          "token" : token,
                          "recipient_publickey" : recipient_publickey,
                          "type" : type,
                          "page" : this.currentPage, 
                          "page_size" : this.perPage,
                          
                      }
                    
                      const json = JSON.stringify(requestBody) 
                      
                      let end_point = myConfig.server_domain + "/v1/tle/get/"+type+"/encrypt"
                      
                      axios.post( end_point, json, config )
                      .then(response => { 

                              resolve( response.data )

                      }).catch( (e) => {
                          
                              reject(e)    
                      }) 
              })  

          },

          async test(){

             

            let mfa = new server( myConfig.server_domain )
            this.server_publicKey = JSON.parse(JSON.stringify( await mfa.connection_server_key() ) )

             
            let encrypt = new encrypt_js( myConfig.server_domain )
            this.my_connection_key = JSON.parse(JSON.stringify( await encrypt.create_connection_key() ) )

            this.tle_type_menu = JSON.parse(JSON.stringify( this.tle_type_menu_tmp ) )

            this.tle_type_menu_tmp.forEach( async (v, i, a) => { 
               
              let _result = await this.fn_count_tle__by_type( '', v.name )

              if( _result.result == 'Process-Complete' ){
                  v.count = _result.count
                  this.tle_type_menu_tmp.splice(i , 1 , v)
                  this.tle_type_menu.splice(i , 1 , v)

              }else{
                  v.count = 0
                  this.tle_type_menu_tmp.splice(i , 1 , v)
                  this.tle_type_menu.splice(i , 1 , v)
              }

              

            })

            
             


        }
           
    
    },
    mounted() {

        
          this.$refs.topProgress.start()

          setTimeout(() => { this.$refs.topProgress.done() }, 10);
          
          this.test()  

        
    },
    watch: {
       
       currentPage () {
         
         if( this.totalRows > 0 ){
           console.log( this.tle_name )
           if( this.tle_name.length > 0 ){
             this.next_page_search_tle_byName( this.tle_name )
           }else{
             this.next_page_tle( this.selected_name )
           }
           

         }
         

       }
     

    },
    computed: {

          open_upload () { 
              
              let tmp = JSON.parse(JSON.stringify( this.$store.state.open_upload )); 
              return tmp
            
          },    
            

    },
    created() {

      
      
    },
    
    
}

 
function get_time_diff( d )
{
    
        

         //create date format          
         var timeStart = new Date(d);
         var timeEnd = new Date();

         var difference = (timeEnd.getTime() - timeStart.getTime()) / (24*60*60*1000);          

         

    return difference;
}
</script>

<!-- menu design will like this concept. The creator has used a hexagon => https://codepen.io/uiswarup/pen/dyyqaGR -->
<style scoped>

#navbar {
  overflow: hidden;
  /* background-color: #330066; */
  background-color: #5F1854;
   
  
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

.fake-legend-1{
  height: 15px;
  width:100%;
  /* border-bottom: solid 2px #e5e4e4; */
  border-bottom: solid 2px #474A8A;
  text-align: center;
  /* margin: 1em 0; */
  margin-top:1em;
  margin-bottom:1.5em;
}
.fake-legend-1 span {
  background: #fff;
   
  position: relative;
  top: -0.2em;
  padding: 0 20px;
 
  line-height:30px;
  color:#474A8A;
  font-weight:bold;
}

.viewer {
    width: 100%;
    /* height: 90vh; */
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

</style>

<style>
    @import "../../assets/style.css";

</style>

<style lang="scss">
/* bootstrap-vue modal border-radius */

.modal-dialog {
   

  .modal-content {
    
    border-radius: 0px;
     
  } 

}

.modal-xl-1 {
    max-width: 90% !important;
}

.bbtn :hover{
    letter-spacing:0.25em ;
}

.card-header  { // b-card class header
  border-radius: 0px !important;
  
}

.border-info-1 {
  border : 1px solid #4700D8;
}

.text-info-1 {
  color : #4700D8;
}

.modal-xl-3 {
    max-width: 80% !important; 

    .modal-content {
    
       border : 2px solid #17a2b8;
      
    } 
}

</style>

<style>
    @import "https://pro.fontawesome.com/releases/v5.10.0/css/all.css";
</style>

<style>
    @import "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-social/5.1.1/bootstrap-social.min.css";
</style>

<style>
/* Create vertical Tab using html css */
/* https://stackoverflow.com/questions/18656995/create-vertical-tab-using-html-css */
 #id-content
  {
    /* background-color: #f2f2f2; */
    /* padding: 20px 10px; */
    /* overflow: auto;  */
    margin-left:-1em;
  }
  #tab-container-2
  {
    float: left;
    margin: -10px 0 0 0;
    
    padding-left: 20px;
    padding-right: 20px;

    width: 35%;
    border-right:2px solid #FFFFFF;
  }
  #tab-container-2 ul
  {
    list-style: none;
    text-align: center;
  }
  #tab-container-2 ul li
  {
    border-top: 3px solid #666;
    border-right: 3px solid #ddd;
    border-bottom: 3px solid #666;
    border-left: 8px solid #666;
    background-color: #ddd;
    margin: 10px 0;
  }
  #tab-container-2 ul li a,
  #tab-container-2 ul li a:visited
  {
    text-decoration: none;
    color: #666;
    display: block;
    padding: 15px 5px;
    
  }
  #tab-container-2 ul li:hover
  {
    border-left: 8px solid #333;
  }
  #tab-container-2 ul li a:hover
  {
    color: #000;
  }
  #tab-container-2 ul li.tab-selected
  {
    border-right: none;
    background-color: #fff;
    border-left: 8px solid #1363DF;
    font-weight: bold;
    border-right: 2px solid #FFFFFF;

    border-top: 3px solid #1363DF; 
    border-bottom: 3px solid #1363DF;
    border-left: 8px solid #1363DF;
    
  }
  #main-container-2
  {
    min-height: 60vh;
    margin: 0 0 0 35%;
    
    padding-left: 20px;
    padding-right: 20px;

    background-color: #f7f7f7;
    /* border-left: 2px dashed #1363DF; */
    /* border-left: 3px dashed #5F1854; */
  }

  .box{ border:1px solid #999; position:relative; margin-top:20px; }
  /* .rightCircle{ position:absolute; width:50px; height:50px; border-radius:50%;  background:red; right:-20px; top:-20px;} */
  .rightCircle{ position:absolute; width:50px; height:50px;  right:-20px; top:-20px;}

  .rightCircle-1{ position:absolute; width:50px; height:50px;  left:-20px; top:-20px; }

  .ddrop {
  
    transition: 300ms;
    
    border : 2px dashed white;
    color : #FFFFFF;
    background-color: #46468c;
     
  }

  .ddrop:after {
    
    opacity: 0;
    transition: 300ms;
    color:#0b9c62;
  }

  .ddrop:hover {
    background-color: #bcffb5;
    border : 2px dashed #0b9c62;
    
    color:#0b9c62;
  }

  .ddrop:hover:after {
    opacity: 1;
    transform: scale(1.15);
    
  }

  .bg-green-300 {

    background-color: #bcffb5;
    /* border : 2px dashed #0b9c62; */
    color:#0b9c62;
    border : 2px dashed white;

  }

 </style>

 <style lang="scss">
// ----------------------------------------------------------
// Fiill the space between two text elements with dots
// https://stackoverflow.com/questions/39438026/fiill-the-space-between-two-text-elements-with-dots

section {
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;
}
section > * {
  padding: 0;
  margin: 0;
}
span.aaa {
  flex: 1;
  margin-left:1em;
  margin-right:1em;
  border-bottom: 1px dashed #999;
}

span.aa-none {
  flex: 1;
  margin-left:1em;
  margin-right:1em;
  border-bottom: 1px dashed #bbb;
}

.modal-dialog {
   

  .modal-content {
    
    border-radius: 0px;
     
  } 

}

.modal-sm-1 {
    max-width: 40% !important;

    .modal-content {
    
       border : 2px solid #1572A1;
      
    } 
}

.modal-xl-1 {
    max-width: 95% !important;

    .modal-content {
    
       border : 2px solid #7608dd;
      
    } 
}

</style>