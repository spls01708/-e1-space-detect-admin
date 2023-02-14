<template>

    <div style="height:100vh;border:0px solid red;margin-top:0em;margin-left:0em;margin-right:0em;">
    <vue-topprogress ref="topProgress" color="#FF0000"></vue-topprogress>
    <div id="navbar">
        <b-row  >
        
            <nav class="nav-top" >       
            
                <a class="nav__link">
                    
                    
                    <span class="w-100" style="font-size:1.3em;color:#FFFFFF"> TLE Data List </span>

                </a>

            </nav>
        </b-row>
    </div>  
    <!-- ------------------------------------------------------------------------ -->
     
    <main class="site-wrapper">
        <div class="desktop-768" style="zoom:0.9">
            <div>
                
                 
                <!-- -------------------------------------------------------------------------------------------- -->
                  <b-row style="margin:1em;"  class="text-center" >

                    <b-col cols="4" class="p-2">
                    </b-col>
                    <b-col cols="8" class="p-2 text-center"   >
                      <b-form-input id="input-valid" style="cursor:pointer;margin-left:2em;width:90%;"  
                        placeholder="ค้นหา" class="rounded-0 border-2" 
                        v-model="tle_name" 
                        @keyup.enter="search_tle_byName(tle_name)"
                        autocomplete="off"
                        type="search"
                      >
                      </b-form-input>
                    </b-col>

                  </b-row>

                  <b-row class="ml-2 mr-2">

                    <b-col cols="4" class="p-1" style="border-right:2px dashed #b5b5b5;">
                       
                        <!-- <b-form-input id="input-valid" style="cursor:pointer;width:95%;"  placeholder="ค้นหา" class="rounded-0" v-model="tle_name" @keyup.enter="search_tle_byName(tle_name)"></b-form-input> -->
                         
                        <div style="height:63vh;overflow-x: hidden;margin:1em;">
                            <!-- <b-table-simple  id="tblData" style="width:96%;border:none;" hover small  >
                            
                                <b-tr v-for="(value, key) in tle_type_menu" :key="key" class="barcode">
                                
                                     
                                    <b-td class="text-left" style="border-top:none;cursor:pointer;"  @click="select_tle_type( value.name )">
                                        <i class="far fa-check-circle" v-if="value.selected==true"></i>
                                        <i class="far fa-circle" v-else></i>
                                    </b-td>
                                    <b-td class="text-primary font-weight-bold selection_ele w-100  pl-2 pr-2  text-left" :class="value == '' ? 'line-through' : '' " style="border:1px solid #fff;;cursor:pointer;font-size:0.9em;" 
                                        @click="select_tle_type( value.name )">{{value.name}}
                                    </b-td>
                                    
                                    
                                </b-tr>
                            
                            </b-table-simple >  -->

                            <b-table
                                :items="tle_type_menu"              
                                show-empty
                                small    
                                hover         
                                style="cursor:pointer;margin-bottom:1em;font-size:0.9em;"     
                                :fields="fields_1" 
                                
                            > 
                              <template #cell(selected)="data">
                                <i class="far fa-check-circle" v-if="data.value==true"></i>
                                <i class="far fa-circle" v-else></i>
                              </template>
                              <template #cell(name)="data">

                                <span class="text-primary font-weight-bold selection_ele w-100  pl-2 pr-2  " @click="select_tle_type( data.value )"><span >{{data.value}}</span></span>

                            </template>

                            </b-table>

                            
                        </div>

                    </b-col>
                    <b-col cols="8" class="p-1 text-left" style="overflow-x: hidden;">
                      
                      <div style="height:63vh;overflow-x: hidden;margin:1em;">
                        <b-table
                            :items="arr"              
                            show-empty
                            small    
                            hover         
                            style="cursor:pointer;margin-bottom:1em;font-size:0.9em;"     
                            :fields="fields"                              
                            @row-clicked="onRowClicked"
                            :tbody-tr-class="rowClass"
 
                            :per-page="perPage" 
                            
                        > 

                        <template #cell(selected)="data">
                              <i class="far fa-check-circle" v-if="data.value==true"></i>
                              <i class="far fa-circle" v-else></i>
                        </template>

                        <template #cell(name)="data">

                            <span class="text-primary font-weight-bold selection_ele w-100  pl-2 pr-2  text-left" @click="tle_edit( data )"><span >{{data.value}}</span></span>

                        </template>

                         
                        </b-table>
                      </div>

                        <b-pagination
                                            style="margin-top:0em;"  
                                            v-model="currentPage"
                                            :total-rows="totalRows"
                                            :per-page="perPage"
                                            align="center"
                        ></b-pagination>

                     
                         
                    </b-col>

                   </b-row>
                   
                    
                </div>   
                <!-- -------------------------------------------------------------------------------------------- -->   
                
            
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
                  tle_type_menu : [
                        { selected : false , name: 'All Satellite', },
                        // { selected : false , name : 'Active Satellites', }, 
                        // { selected : false , name : 'Space Stations', }, 
                        // { selected : false , name : 'Navigation Satellites', }, 
                        // { selected : false , name : 'Communications Satellites', },   
                        // { selected : false , name : 'IRIDIUM 33 Debris', }, 
                        // { selected : false , name : 'COSMOS 2251 Debris', }, 
                        // { selected : false , name : 'Space Debris', }, 
                        // { selected : false , name : 'Starlink', },
                        // { selected : false , name : 'Beidou', },
                      
                        
                  ],
                  tle_type_menu_tmp : [],
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

             
             let dd = await this.sat_info(value.item )
             let id = dd.name+'@'+dd.norad_catalog_number
             
             let c = await this.get_docs_contents( id, 'docs_contents' )
             if( c.result == 'Process-Complete' ){ 
 

                let _content = JSON.parse( c.data.progress_reason )
                this.$store.commit('set_tle_content', JSON.parse(JSON.stringify( _content )));

             }else{
                
                this.$store.commit('set_tle_content', JSON.parse(JSON.stringify( [] )));

             }

            
              
             this.$store.commit('set_tle_data', JSON.parse(JSON.stringify( value )));
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
          async sat_info ( item ) {
            
            try{

                 
                
                let tle_tmp = item.name+'\n' +
                              item.line1+'\n' +
                              item.line2; 

                       

                let obj={
                                    name:item.name.trim(),  
                                    norad_catalog_number:tlejs.getCatalogNumber(tle_tmp),
                                     
                }

                return obj

            }catch(e){
              
              console.log( e )
              return;

            }

          },
           async search_tle_byName ( name ){
             console.log( name.length )
             if( name.length > 0 ){

                this.tle_type_menu.forEach( (v, i, a) => {

                  v.selected = false

                  this.tle_type_menu.splice(i , 1 , v)

                })

                this.totalRows=0
                this.currentPage=1
                this.arr=[]
                this.tle_type_menu_tmp = JSON.parse(JSON.stringify( this.tle_type_menu ) )
                this.tle_type_menu = [{ selected : true , name : 'Search TLE by name', },]

                let d_count = await this.fn_count_tle__by_name( '', name )

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

                console.log( data )

                this.arr = data

                let ssl = ''
                try{
                      ssl = JSON.parse( localStorage.getItem('$tle-seclection-data') )

                      this.arr.forEach( (v, i, a) => {
                      

                          ssl.forEach( (vv, ii, aa) => {

                            if( v._id === vv._id ){

                              v.selected = true

                            } 

                          })


                    })
                    
                }catch(e){}
 


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

                // console.log( data )

                this.arr = data

                let ssl = ''
                try{
                      ssl = JSON.parse( localStorage.getItem('$tle-seclection-data') )

                      this.arr.forEach( (v, i, a) => {
                      

                          ssl.forEach( (vv, ii, aa) => {

                            if( v._id === vv._id ){

                              v.selected = true

                            } 

                          })


                    })
                    
                }catch(e){}

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
                
                this.arr = data

                let ssl = ''
                try{
                      ssl = JSON.parse( localStorage.getItem('$tle-seclection-data') )

                      this.arr.forEach( (v, i, a) => {
                      

                          ssl.forEach( (vv, ii, aa) => {

                            if( v._id === vv._id ){

                              v.selected = true

                            } 

                          })


                    })
                    
                }catch(e){}


           },
          //  onRowClicked : async function(item, index, event) {

          //     let ssl = []
          //     let c = await new Promise(resolve => { 
          //       resolve( JSON.parse( localStorage.getItem('$tle-seclection-data') ) )
          //     })
              
          //     if( c ){

          //       ssl = c 
          //       this.arr.forEach( (v, i, a) => {

                   
          //           // if( v._id === item._id ){
          //           //   v.selected = true
          //           // }else{
          //           //   v.selected = false
          //           // }

          //           if( v._id === item._id ){
          //             v.selected = !item.selected
                      
          //             if( v.selected == true ){

          //               ssl.push( v )


          //             }else{

          //               ssl.forEach( (vv, ii, aa) => {

          //                 if( vv._id === item._id ){

          //                   ssl.splice(ii , 1)

          //                 }

          //               })


          //             }

          //             this.arr.splice(i , 1 , v)
          //             localStorage.setItem( '$tle-seclection-data', JSON.stringify( ssl ) );

          //           }  

          //       })

                

          //     }else{

          //       this.arr.forEach( (v, i, a) => {

          //           if( v._id === item._id ){
          //             v.selected = !item.selected

          //             this.arr.splice(i , 1 , v)
          //             ssl.push( v )

          //           }  

          //       })

          //       localStorage.setItem( '$tle-seclection-data', JSON.stringify( ssl ) );

          //     }
            
            

          //  },
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

            console.log( this.server_publicKey )
            


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

           this.next_page_tle( this.selected_name )

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