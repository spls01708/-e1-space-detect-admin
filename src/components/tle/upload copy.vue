<template>

    <div style="height:100vh;border:0px solid red;margin-top:0em;margin-left:0em;margin-right:0em;">
    <vue-topprogress ref="topProgress" color="#FF0000"></vue-topprogress>
    <div id="navbar">
        <b-row  >
        
            <nav class="nav-top" >       
            
                <a class="nav__link"> 
                    
                    <span class="w-100" style="font-size:1.3em;color:#FFFFFF"> TLE Data Upload </span>

                </a>

            </nav>
        </b-row>
    </div>  
    <!-- ------------------------------------------------------------------------ -->
     
    <main class="site-wrapper" style="zoom:0.9">
        <div class="desktop-768" >
             
                <!-- -------------------------------------------------------------------------------------------- -->
               
                    <div class="row text-center" style="border:0px solid red;margin-top:1em;margin-left:1em;margin-right:1em;"> 
        
                        <div class="col-xl-2 col-sm-12 col-12" style="border : 0px dashed #0b9c62;margin-top:4em;">

                            <div style="margin-left:2em;">
                            <div :class="step == 0 || step == 1 || step == 2 || step == 3  || step == 4 || step == 5? 'step step-active' : 'step' " >
                            <div>
                                <div class="circle" v-if="step == 1 || step == 2 || step == 3 || step == 4 || step == 5"><i class="fa fa-check"></i></div>
                                <div class="circle" v-else>1</div>
                            </div>
                            <div>
                                <div class="title">Upload</div>
                                <div class="caption">อัพโหลด TLE</div>
                            </div>
                            </div>
                            <div :class="step == 2 || step == 3 || step == 4 || step == 5 ? 'step step-active' : 'step' ">
                            <div>
                                <div class="circle" v-if="step == 3 || step == 4 || step == 5"><i class="fa fa-check"></i></div>
                                <div class="circle" v-else>2</div>
                            </div>
                            <div>
                                <div class="title">Check</div>
                                <div class="caption">ตรวจสอบ TLE</div>
                            </div>
                            </div>
                            <div :class="step == 3 || step == 4 || step == 5 ? 'step step-active' : 'step' ">
                            <div >
                                <div class="circle" v-if="step == 4 || step == 5"><i class="fa fa-check"></i></div>
                                <div class="circle" v-else>3</div>
                            </div>
                            <div >
                                <div class="title">Type</div>
                                <div class="caption">ประเภท TLE</div>
                            </div>
                            </div>
                            <div :class="step == 4 || step == 5 ? 'step step-active' : 'step' ">
                            <div>
                                <div class="circle" v-if="step == 5"><i class="fa fa-check"></i></div>
                                <div class="circle" v-else>4</div>
                                
                            </div>
                            <div>
                                <div class="title">Submit</div>
                                <div class="caption">บันทึก</div>
                            </div>
                            </div>
                        </div>

                        </div>
                    <!-- -------------------------------------------------- -->
                    <div class="col-xl-10 col-sm-9 col-9" >

                        <!-- ==============================================================================================   -->
                        <!-- UP Load CSV -->
                        <!-- ==============================================================================================   -->  
                        <div class="row text-center" style="margin-top:1em;" v-show="step==0 || step==1">    
                        <!-- <div class="row text-center" v-show="false">  -->
                        
                        <div class="col-xl-12 col-sm-12 col-12  " style="cursor:pointer;margin-top:3em;" @click="upload_file">
                            
                            <div class="card rounded-0 d-flex justify-content-center ddrop" style="height:10em;" @dragover="dragover" @dragleave="dragleave" @drop="drop" >

                            <div class="card-content" style="border:none;">
                                                    <div class="card-body" style="border:none;">
                                                    
                                                    
                                                        <input type="file"  name="fileToUpload" id="assetsFieldHandle" class="d-none"  ref="file" @change="onChange"  required/>

                                                        <label for="assetsFieldHandle" class="block cursor-pointer" style="border:none;">
                                                        
                                                        <span style="font-size:2.2em;justify-content: center;cursor:pointer;border:none; ">

                                                            <span>Drop File (.xlsx) Here</span>

                                                            <h6 style="color:#FFFFFF;margin-top:1em;">(TLE)</h6>
                                                        </span>

                                                        </label>
                                                    </div>
                                </div>

                            </div>

                        </div>
                        </div>

                        <!-- ==============================================================================================   -->
                        <!-- UP Load CSV -->
                        <!-- ==============================================================================================   -->  
                        <div class="row text-center" style="margin-top:1em;border:0px solid red;" v-show="step==2">  
                             
                            <b-col>
                            <b-button size="sm" block @click="step=1" class="rounded-0"><i class="fa fa-backward" aria-hidden="true"></i> Prev Step</b-button>
                            </b-col>
                            <b-col>
                            <b-form-input
                                id="filter-input"
                                v-model="filter"
                                type="search"
                                placeholder="Filter"
                                size="sm"
                                style="cursor:pointer;"
                            ></b-form-input>

                            </b-col>
                            <b-col>
                            <b-button size="sm" block @click="step=3" class="rounded-0">Next Step <i class="fa fa-forward" aria-hidden="true"></i></b-button>
                            </b-col>
                            
                            <div class="row text-center" style="margin-top:1.5em;"> 
                            <div style="height:65vh;overflow:auto;">
                                <b-table
                                :items="arr"              
                                show-empty
                                small    
                                
                                :filter="filter" 
                                :fields="fields"      
                                style="font-size:0.9em;"   
                                :tbody-tr-class="rowClass"    
                                @row-clicked="onRowClicked"     

                                :current-page="currentPage"
                                :per-page="perPage"  
                                > 
                                 
                                <template #cell(line1)="row">

                                    <span  > 
                                        {{row.item.line1}}
                                    </span>
                                  
                                </template>

                                <template #cell(line2)="row">

                                    <span  > 
                                        {{row.item.line2}}
                                    </span>
                                  
                                </template>

                                
                                </b-table>
                            </div>

                            <div style="z-index:99;margin-top:1.5em;">   

                                            <b-pagination
                                            v-model="currentPage"
                                            :total-rows="totalRows"
                                            :per-page="perPage"
                                            align="center"
                                            ></b-pagination>

                            </div>

                            </div>

                        </div>
                        <!-- ==============================================================================================   -->
                        <!-- select type -->
                        <!-- ==============================================================================================   -->  
                        <div class="row text-center" style="margin-top:1em;border:0px solid red;" v-show="step==3">  

                            <b-col>
                                <b-button size="sm" block @click="step=2"><i class="fa fa-backward" aria-hidden="true"></i> Prev Step</b-button>
                            </b-col>
                            <b-col> 
                            </b-col>
                            <b-col>
                                <b-button size="sm" block @click="step=4" :disabled="tags.length==0">Next Step <i class="fa fa-forward" aria-hidden="true"></i></b-button>
                            </b-col>

                            <b-row class="text-center" style="margin-top:3em;"> 
                                 
                                <b-col sm=12>
                                    <template>
                                        <div>
                                            <vue-tags-input
                                                add-only-from-autocomplete
                                                v-model="tag"
                                                :tags="tags"
                                                :autocomplete-items="filteredItems"
                                                @tags-changed="newTags => tags = newTags"
                                            />
                                        </div>
                                    </template>
                                </b-col>
                                 
                            </b-row>
                            <b-row class="text-center" style="margin-top:2em;">  
                                <b-col sm=6><span style="font-size:0.8em;">{{tags}}</span></b-col>
                            </b-row>
                             
                              
                        </div>

                        <!-- ==============================================================================================   -->
                        <!-- Submit -->
                        <!-- ==============================================================================================   -->  
                        <div class="row text-center" style="margin-top:1em;" v-show="step==4">  
                         
                            <b-col>
                                <b-button size="sm" block @click="step=3"><i class="fa fa-backward" aria-hidden="true"></i> Prev Step</b-button>
                                </b-col>
                            <b-col></b-col>
                            <b-col>
                             
                            </b-col>
                            
                            <div class="row text-center" style="margin-top:1em;"> 
                            
                            <b-table-simple  small stacked >
                            
                                <b-tbody>

                                <b-tr>
                                    <b-th rowspan="3" class="text-center" style="border:none;">Result</b-th>
                                    <b-td stacked-heading="Rows :">{{totalRows}}</b-td> 
                                    <b-td stacked-heading="Tags :"><span style="font-size:0.8em;">{{tle_Arr}}</span></b-td>
                                    
                                </b-tr>
                                
                                </b-tbody>
                                
                            </b-table-simple>

                            <b-col cols="2"></b-col>
                            <b-col cols="8"> 
                                <b-button variant="info" class="mt-4" block @click="confirm_before_save_box=true"><i class="far fa-check-circle" aria-hidden="true"></i> บันทึก </b-button>
                            </b-col>
                            <b-col cols="2"></b-col>

                            </div>

                        </div>

                        <!-- ==============================================================================================   -->
                        <!-- Submit OK-->
                        <!-- ==============================================================================================   -->  
                        <div class="row text-center" style="margin-top:1em;" v-show="step==5">  
                        
                            <div class="row text-center text-success" style="margin-top:4em;"> 
                            
                                <span style=" font-size:4em;"><i class="far fa-check-circle" ></i></span>
                                <span style=" font-size:2em;margin-top:0.5em;"> Save Complate </span>
                            
                            </div>

                        </div>


                    </div>

                    
                </div>   
                 
        </div>
    </main>

    <div class="footer">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <nav class="nav" style="height:80px;" >
        
        

        <!-- <router-link to="/users/admin" class="nav__link" disabled> 
           <i class="material-icons nav__icon" >arrow_back</i>
            
           <span class="nav__text">Back</span>
        </router-link> -->

        <div class="nav__link"> 
           <i class="material-icons nav__icon" style="color:#b5b5b5;" >arrow_back</i>
            
           <span class="nav__text" style="color:#b5b5b5;" >Back</span>
        </div>


        <router-link to="/tle" class="nav__link"> 
           <i class="material-icons nav__icon" >travel_explore</i>
            
           <span class="nav__text">List</span>
        </router-link>

        <a class="nav__link" @click="select_menu=1">           
           
           <i :class=" true ? 'material-icons nav__icon nav__link--active' : 'material-icons nav__icon ' " >upload_file</i>
           <span :class=" true ? 'nav__text text-danger font-weight-bold' : 'nav__text'">Upload</span>
           
        </a>

        

        <router-link to="/" class="nav__link">
            <i class="material-icons nav__icon" >logout</i>
            <span class="nav__text">Logout</span>
        </router-link>

       
        </nav>
    </div>

    <b-modal v-model="progress_open" size="lg"  centered no-close-on-backdrop hide-header hide-footer  hide-header-close  title="info">

      <div class="row text-center" >
        <div class="col-xl-12 col-sm-12 col-12" >

          <img :src="require('@/assets/gozila.gif')" height="60"/>
          
        </div>
      </div>
      <div class="row text-center mt-1" >
        <div class="col-xl-12 col-sm-12 col-12" >
          
          <span> Wait Until Data Progress Finished</span>

        </div>
      </div>

      <b-row class="text-center mt-3" align-v="center" >  
        <b-progress :value="progress_value" variant="success" ></b-progress> 
      </b-row>

      <b-row class="text-center mt-2" align-v="center" >
        <span>{{ (Number(progress_value)).toFixed(2) }}%</span>      
      </b-row>

      <b-row class="text-center mt-1" align-v="center" >
        <span>TLE : {{ progress_files }} / {{totalRows}}</span>      
      </b-row>

      
    </b-modal>

    <b-modal v-model="confirm_before_save_box" size="lg"  centered no-close-on-backdrop hide-header hide-header-close  title="Login" >
            <div class="row text-center" style="margin-top:2em;"> 
              
                <p style=" font-size:1.4em;" class="text-danger"><i class="fa fa-exclamation-triangle" ></i>
                    บันทึกข้อมูล TLE ใหม่หรือไม่?
                </p>

                <!-- <b-row class="text-center w-100">
                  <b-col cols="2"></b-col>
                  <b-col cols="10" >
                    <ol class="text-danger text-left" >

                      <li style="margin-left:3em;"><span style=" font-size:1em;margin-top:0.5em;">บันทึกข้อมูล TLE ใหม่</span></li>
                       
                    </ol>
                  </b-col>
                </b-row> -->

              
            </div>

            <template v-slot:modal-footer="{ }"> 
              <b-row class="w-100" >
                <b-col cols="6">
                  
                  <b-button variant="danger" @click="save_customers_csv()" style="" block class="rounded-0 ">
                      <i class="far fa-check-circle" aria-hidden="true"></i> บันทึก
                  </b-button>

                </b-col>
                <b-col cols="6">
                
                  <b-button variant="dark" @click="confirm_before_save_box=false"  block class="rounded-0 " >
                    <i class="fa fa-window-close" aria-hidden="true"></i> ยกเลิก
                  </b-button>

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
import myConfig from '../config.js' 

import { vueTopprogress } from 'vue-top-progress'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
import axios from 'axios'
 

import ddForm from 'vue-dd-form'; 
import readXlsxFile from 'read-excel-file'

import { server }  from '../login_modules' 
import { encrypt_js } from "../encrypt_modules_js"
import VueTagsInput from '@johmun/vue-tags-input';
// import { config } from 'vue/types/umd'

export default {
  name: 'calendar',
  components: {
		vueTopprogress,
        VueTagsInput,
    // ddForm
	},
  data() {
            return {    
                 
                fDataSet: {
                      
                     
                    "file": "",
                    "tle_type": "-"
                
                      
                },
                fDescriptions: {
                      
                      "file": {
                          "view": "upload", 
                          "label": "TLE File (.xlsx)",
                          "endpoint" : 'upload_host'
                      },
                      "tle_type": {
                          "view": "select",
                          "label": "TLE Type Select",
                          "options": [
                               
                              "Space Stations",
                              "Navigation Satellites",
                              "Communications Satellites",
                               
                          ]
                      }
                    
                },
                step:0,

                file:'',
                 
                myFunctions: {
                      
                },
                customLang: {
                    save: 'TLE Upload',
                    add: '+ Add a milestone'
                }, 

                server_publicKey:'0', 
                my_connection_key:'0', 
                data_arr : [],

                currentPage: 1,
                perPage: 5,
                totalRows:0,

                filelist: [],
                arr:[],
                arr_splice:[],
                header:[],
                step:0,
                startRow: 0,
                rowsPerPage: 5,
                current_index:0,
                today:null,
                csv_row:0,
                filter:'',

                fields: [
                   { key: 'selected', label: '' , class: 'text-left' , thStyle: {width: '3% !important'}  , sortable: false },
                   { key: 'name', label: 'Name' , class: 'text-left' , thStyle: {width: '15% !important'}  , sortable: false },
                   { key: 'line1', label: 'line1' , class: 'text-left' , thStyle: {width: '20% !important'}  , sortable: false },
                   { key: 'line2', label: 'line2' , class: 'text-left' , thStyle: {width: '20% !important'}  , sortable: false },
                ],

                tag: '',
                tags: [],
                autocompleteItems: [
                    { text: 'All Satellite', },
                    // { text: 'Active Satellites', }, 
                    // { text: 'Space Stations', }, 
                    // { text: 'Navigation Satellites', }, 
                    // { text: 'Communications Satellites', },   
                    // { text: 'IRIDIUM 33 Debris', }, 
                    // { text: 'COSMOS 2251 Debris', }, 
                    // { text: 'Space Debris', }, 
                    // { text: 'Starlink', },
                    // { text: 'Beidou', },
                ],

                 
                confirm_before_save_box:false,

                limit_round_send:0,                
                limit_per_round_send:30,
                progress_open:false,
                round_progress:[],
                progress_value:0,
                progress_files:0,
            }
              
    },
        
    
    methods: {
        save_customers_csv : async function(){

            this.confirm_before_save_box=false

            await this.delete_tle( 'All Satellite' )
            let d = await this.round_save_csv( this.arr )

            this.step=5
            this.progress_open = false  
  


        },
        round_save_csv : async function( arr ) { 
            
            this.progress_open = true  

            for(let i=0;i<this.limit_round_send;i++){

                let begin = (i) * this.limit_per_round_send 
                let end = (begin + this.limit_per_round_send-1)

                let send_arr = arr.slice(begin, end)
                let tag_arr = this.tle_Arr.join(",")
                console.log( tag_arr )
                // ---------------------------------------------------------------------------------------------
                let encrypt = new encrypt_js( myConfig.server_domain )
                let buffer_server_publicKey = await encrypt.buffer_key_from_base64( this.server_publicKey.publicKey ) 
                
                let _data = {
                    tle_type : tag_arr,
                    tle : send_arr
                }
                let data_encrypted = await encrypt.message_encrypted( buffer_server_publicKey, Buffer.from( JSON.stringify( _data ) ) )
                // ---------------------------------------------------------------------------------------------
                // console.log( data_encrypted )
                let c = await this.send_tle_to_Server( data_encrypted, this.my_connection_key.publicKey )
                console.log( c )

                this.progress_value = ( (Number(i)+1) / ( Number( this.limit_round_send ) ) )*100

                this.progress_files = Number( this.progress_files ) + Number( this.limit_per_round_send )

                await new Promise(resolve => setTimeout(resolve, 50))

            }

            return

        },
        onRowClicked : async function(item, index, event) {
        
        },
        rowClass(item, type) {

                if (!item || type !== 'row') return
                if (item.selected === true) return 'table-light'
                
        },
        upload_file(event){
                
                if( event.target.tagName == 'DIV' ){
                  document.getElementById('assetsFieldHandle').click();
                }
                
        },
        async onChange( event ) {
            
            this.progress_open=true

            let xlsxfile = event.target.files ? event.target.files[0] : event.dataTransfer.files[0]  
            
            this.arr  = await this.read_file( xlsxfile )
         
            this.totalRows = this.arr.length

            this.step=2

            // ------------------
              this.totalRows = this.arr.length

              this.limit_round_send = ( Math.ceil( Number(this.arr.length) / Number(this.limit_per_round_send) ) )

              this.round_progress=[] 
              for(let i=0;i<this.limit_round_send;i++){  
                                   
                this.round_progress.push({
                      name : 'Round '+ (i),
                      index : i,
                      value:0
                })
                  
              }
              // -----------------------

            this.arr_splice = this.arr.slice(0, this.rowsPerPage)
            this.progress_value = 100 
            this.progress_files = 0

            this.progress_open=false

        },
        dragover(event) {
            event.preventDefault();
            // Add some visual fluff to show the user can drop its files
            if (!event.currentTarget.classList.contains('bg-green-300')) {
              event.currentTarget.classList.remove('bg-gray-100');
              event.currentTarget.classList.add('bg-green-300');
            }
        },
        dragleave(event) {
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        drop(event) {
            event.preventDefault();
            this.$refs.file.files = event.dataTransfer.files;
            
            this.onChange( event ); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },

        async submit( { data } ){

              
            // console.log( data )
            // await this.delete_tle()

            // let encrypt = new encrypt_js( myConfig.server_domain )
            // let buffer_server_publicKey = await encrypt.buffer_key_from_base64( this.server_publicKey.publicKey ) 
            
            // let _data = {
            //     tle_type : data.tle_type,
            //     tle : this.data_arr
            // }
            // let data_encrypted = await encrypt.message_encrypted( buffer_server_publicKey, Buffer.from( JSON.stringify( _data ) ) )
 
            // let c = await this.send_tle_to_Server( data_encrypted, this.my_connection_key.publicKey )
 
            // console.log( c ) 
            

        },
        async change({  path, data }) { 
             
            this.data_arr = await this.read_file( data.upload_file )
            

        },
        read_file : async function ( file ){

          return new Promise((resolve, reject) => {
            
            readXlsxFile( file ).then((rows) => {

              this.totalRows = rows.length
              let start=0
              let obj = {}
              let arr = []

              for(let i=0;i<rows.length;i++){

                 let row_tmp = JSON.parse(JSON.stringify( rows[i] ))

                 if( start==0 ){
                    obj = {}
                    obj.name = row_tmp[0]
                    start++

                 }else if( start==1 ){

                    obj.line1 = row_tmp[0]
                    start++

                 }else if( start==2 ){

                    obj.line2 = row_tmp[0]
                    start=0

                    arr.push( obj )

                 }


              }

              resolve( arr )


            })

          })

        },
        delete_tle: async function ( type ){

                    

                    return new Promise((resolve, reject) => {

                            const config = {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                            let requestBody = { }
                            
                            const json = JSON.stringify(requestBody)                       
                         
                            let end_point = myConfig.server_domain + "/v1/tle/delete/"+type
                            
                            this.$refs.topProgress.start()

                            axios.post( end_point, json, config )
                            .then(response => {

                                    this.$refs.topProgress.done()
                                    // ====================================================================
                                    resolve( response.data )

                            })

                    })      
  


        },
        send_tle_to_Server : async function ( encryption_data, sender_publicKey ){

                    

                    return new Promise((resolve, reject) => {

                            const config = {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                            let requestBody = {
                                
                                "encryption_data" : encryption_data,
                                "sender_publicKey" : sender_publicKey 

                            }
                            
                            const json = JSON.stringify(requestBody)                       
                         
                            let end_point = myConfig.server_domain + "/v1/tle/upload/encrypt"
                            
                            this.$refs.topProgress.start()

                            axios.post( end_point, json, config )
                            .then(response => {

                                    this.$refs.topProgress.done()
                                    // ====================================================================
                                    resolve( response.data )

                            })

                    })      
  


        },
        async test(){

             

            let mfa = new server( myConfig.server_domain )
            this.server_publicKey = JSON.parse(JSON.stringify( await mfa.connection_server_key() ) )

             
            let encrypt = new encrypt_js( myConfig.server_domain )
            this.my_connection_key = JSON.parse(JSON.stringify( await encrypt.create_connection_key() ) )

            // console.log( this.server_publicKey )
            


        }

         
           
           
    
    },
    mounted() {

        
          this.$refs.topProgress.start()

          setTimeout(() => { this.$refs.topProgress.done() }, 1000);
          
          this.test() 
          
          this.step=0
        
    },
    watch: {
       
       
     

    },
    computed: {

        filteredItems () {
            return this.autocompleteItems.filter(i => {
                return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
            });
        },
        tle_Arr () { 
            
            return this.tags.map((a) => {
                return a.text
            })

        }
    
    },
    created() {
      
    },
    
    
}

 

</script>

<!-- menu design will like this concept. The creator has used a hexagon => https://codepen.io/uiswarup/pen/dyyqaGR -->
<style scoped>

/* Style the navbar */
#navbar {
  overflow: hidden;
  /* background-color: #333; */
  background-color: #5F1854;
  
}

#navbar p {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px;
  margin-right:2em;
  text-decoration: none;
}

/* Navbar links */
#navbar a {
  float: right;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px;
  margin-right:2em;
  text-decoration: none;
}

/* Page content */
.content {
  padding: 16px;
}

/* The sticky class is added to the navbar with JS when it reaches its scroll position */
.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}

/* Add some top padding to the page content to prevent sudden quick movement (as the navigation bar gets a new position at the top of the page (position:fixed and top:0) */
.sticky + .content {
  padding-top: 60px;
}

.ddrop {
  
  transition: 300ms;
  /* color:#a0db8e; */
  /* border : 2px dashed #a0db8e; */
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

 
<style>
    @import "../../assets/style.css";

</style>

<style>
    @import "https://pro.fontawesome.com/releases/v5.10.0/css/all.css";
</style>

<style>
    @import "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-social/5.1.1/bootstrap-social.min.css";
</style>