<template>
    
    <div style="height:85vh;border:0px solid red;margin-top:0em;margin-left:0em;margin-right:0em;">
    <vue-topprogress ref="topProgress" color="#FF0000"></vue-topprogress> 
    <!-- ------------------------------------------------------------------------ -->
    <main class="site-wrapper">

        <b-row>

        <div class="col-xl-12 col-sm-12w col-12">
          
            <div class="card border-info text-center border-2 border-right-0 border-left-0 border-top-0 rounded-0 mt-1 text-primary" style="margin-bottom:0.5em;height:5vh;justify-content: center;" >
               <span class="text-info font-weight-bold"><span style="font-size:18px;color:#17a2b8;"> {{tle_data.item.name}} (Position / Footprint)</span>
               <b-badge style="float:right;background-color:#17a2b8;" pill > 1 / 1</b-badge>
               </span> 
            </div>

            <div class="card border-primary border-0 rounded-0 mt-1 text-success" style="margin-bottom:0.5em;height:67vh;" >
                <div class="card-content">
                   <div class="card-body">
                      <div class="media d-flex" > 
                        <div class="align-self-center"> 
                                             
                        </div> 
                                        
                        <div class="media-body text-left ml-0 align-self-center" style="zoom:0.9;" >

                           <div id="id-content" >
                             <div id="tab-container-3"> 

                                 <p class="fake-legend-1 text-success "><span>Orbit position ( {{footprint_position_degree.toFixed(1)}}° )</span></p> 

                                 <b-row class="w-100 text-center mt-0 ml-4" >
                                  
                                  <b-col style="margin-top:-1em;">
                                      <canvas id="canvas" width="450" height="450" style="zoom:1.1; " ></canvas>
                                  </b-col>
                                   
                                </b-row> 

                             </div>
                             <div id="main-container-3">

                              <div style="border:0px solid red;height:67vh;" > 

                                <b-row>

                                  <b-col style="margin-top:-10px;">
                                    <p class="fake-legend-1 text-success " style=""><span>Upload Footprint</span></p> 

                                    <b-row class="w-100 text-center mt-0 " >
                                      
                                      <b-col>
                                           <div v-for="(data, index) in content_arr" :key="index" >

                                             <div v-if="data.type == 'file'" >
                                            <div v-for="(sub_data, sub_index) in data.content" :key="sub_index"  >

                                              <b-card v-for="(sub_data_lv1, sub_index_lv1) in sub_data.files" :key="sub_index_lv1" 
                                                v-show="select_doc == sub_data.select_doc"
                                                :class=" sub_data_lv1.selected == true  ? 'text-left border-3 border-success rounded-0 mb-1 box' : 'text-left border-3 border-left-0 border-right-0 border-top-0 rounded-0 mb-1 box'"
                                                @mouseover="fn_content_box_over( index, sub_index, sub_index_lv1 )"
                                                style="zoom:0.9;width:95%;"
                                              >
                                                 
                                                <div  v-if="sub_data_lv1.lock==true">
                                                    <i class="fa fa-paperclip" aria-hidden="true"></i> Attach file name : 
                                                    <span style="font-weight:bold;cursor:pointer;text-decoration: underline;text-decoration-style: double;"><a :href="sub_data_lv1.link" target="_blank" rel="noopener noreferrer">
                                                      {{sub_data_lv1.file}}</a></span> ( {{sub_data_lv1.size}} bytes )
                                                    <b-button pill variant="success" class="rightCircle" v-if="sub_data_lv1.selected == true" @click="fn_edit_content( index, sub_index, sub_index_lv1 )"
                                                    :disabled="editor_lock">
                                                      <i class="fa fa-edit" aria-hidden="true"></i>
                                                    </b-button>

                                                </div>

                                                <div v-if="sub_data_lv1.lock==false" >

                                                  <b-row class="text-center">
                                                  <b-col >
                                                  <div class="col-xl-12 col-sm-12 col-12  " style="cursor:pointer;margin-top:0em;" @click="upload_file">  
                                                  <div class="card rounded-0 d-flex justify-content-center ddrop " style="height:5.5em;" @dragover="dragover" @dragleave="dragleave" @drop="drop" >
                                                      <div class="card-body" style="border:none;">  
                                                      <input type="file"  name="fileToUpload" id="assetsFieldHandle" class="d-none"  ref="file" @change="onChange"  required/>

                                                      <label for="assetsFieldHandle" class="block cursor-pointer" style="border:none;">
                                                        
                                                        <span style="font-size:2.2em;justify-content: center;cursor:pointer;border:none; ">

                                                          <span>Drop File Here</span> 
                                                          
                                                        </span>

                                                      </label>
                                                    </div> 
                                                  </div> 
                                                  </div>
                                                  </b-col>
                                                  </b-row> 

                                                    <b-button pill variant="success" class="rightCircle-1" v-if="sub_data_lv1.selected == true" @click="fn_remove_content( index, sub_index, sub_index_lv1 )"
                                                    :disabled="editor_lock">
                                                      <i class="fa fa-times" aria-hidden="true"></i>
                                                    </b-button>
                                                    
                                                    <b-button pill variant="success" class="rightCircle" v-if="sub_data_lv1.selected == true" @click="sub_data_lv1.lock=true"
                                                    :disabled="editor_lock">
                                                      <i class="fa fa-undo fa-flip-horizontal" aria-hidden="true"></i>
                                                    </b-button>

                                                </div>
                                              </b-card>

                                            </div>
                                            
                                          </div> 

                                           </div>

                                      </b-col>
                                      
                                    </b-row>

                                  </b-col>

                                </b-row>

                                <!-- <b-row>

                                  <b-col>
                                    <p class="fake-legend-1 text-success "  ><span>Description</span></p> 

                                    <b-row class="w-100 text-center mt-0 " >
                                      
                                      <b-col>
                                           <span class="text-danger font-weight-bold">Under construction</span>
                                      </b-col>
                                      
                                    </b-row>
                                    
                                  </b-col>

                                </b-row> -->
                                
                              </div>   
                                
                             </div>
                           </div>
                          
                                               
                        </div>

                      </div>
                   </div>
                </div>
            </div>

            <div class="card bbtn border-info border-2 mt-1 border-right-0 border-left-0 border-bottom-0 text-success rounded-0" style="margin-bottom:0.5em;height:10vh;justify-content: center;" >
            
              <b-row  class="mt-2 mr-1 ml-1">  
              <b-col cols="4"> 
                <button class="  btn btn-outline-primary rounded-0 w-100 border-2 " @click="fn_process_set_orbit_position()" >
                  <i class="fa fa-globe" aria-hidden="true"></i><span style="margin-left:1em;"> Set Position  </span>
                </button>
              </b-col>

              <b-col  cols="4"> </b-col>

              <b-col  cols="4" >

                <button class="  btn btn-outline-danger rounded-0 w-100 border-2" @click="fn_process_close()" >
                  <i class="fas fa-running fa-flip-horizontal"></i><span style="margin-left:1em;"> Exit  </span>
                </button>
              
              </b-col>
              </b-row>

            </div>

             
             

        </div>

      </b-row>
          
    </main>

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

            

      </b-modal>

      <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------- -->

        <b-modal v-model="process_ok" size="sm"  centered no-close-on-backdrop hide-header hide-header-close  title="Login"  >
            <div class="row text-center text-success" style="margin-top:2em;"> 
              
                <span style=" font-size:4em;"><i class="far fa-check-circle" ></i></span>
                <span style=" font-size:1em;margin-top:0.5em;"> Process-Complete </span> 
              
            </div>

            <template v-slot:modal-footer="{ }"> 
                <b-button variant="success" @click="process_ok=false" block class="rounded-0 ">
                    <i class="fa fa-window-close" aria-hidden="true"></i> Close
                </b-button>
            </template>
        </b-modal>
        
        <!-- ------------------------------------------------------------------------------------------------------------------------------------------- -->  
     
    </div> 
    <!-- ------------------------------------------------------------------------ -->

</template>



<script>

/* eslint-disable */


import moment from 'moment'
import Vue from 'vue'
  
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'  
import { VueEditor, Quill } from "vue2-editor";
  
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
import axios from 'axios'
import myConfig from '../config.js'
import { vueTopprogress } from 'vue-top-progress' 
import * as tlejs from "tle.js";
var satellite = require('satellite.js');
var TLEX = require( 'tle' )



export default {
  name: 'template',
  components: {
		 
    VueEditor ,
    vueTopprogress,
     

	},
  data() {
            return {  
               open_footprint_upload : false,
               sliderValue:0,
               progress_open : false,  
               confirm_before_process_open_job:false,
               confirm_before_process_eject:false,   
               box_ok:false,
               open_error:false,  
               error_log:'',
               socket:[],
               user:'',
               pass:'',
               step:2,
               user:'',
               pass:'',
               customToolbar: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }]],

               main_doc_name : 'SII',
               sub_doc_name_1 : { 'name' : 'PP', 'doc' : 0, 'file' : 0 },
                

               docs_arr:[],
               files_arr:[],

               content_arr:[],
               
               select_doc:'',
               editor_lock : false,

               current_index : 0, 
               current_sub_index : 0, 
               current_sub_index_lv1 :0,

               current_trace_id : 0, 
               ident : false,

               footprint_position_degree : 0,
               process_ok:false,  
               

            }
              
    },
        
    
    methods: {
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
          upload_file(event){
                
                if( event.target.tagName == 'DIV' ){
                  document.getElementById('assetsFieldHandle').click();
                }
                
         },
         onChange( event ) {
            // console.log( event.dataTransfer.files )
              
            let xfile = event.target.files ? event.target.files[0] : event.dataTransfer.files[0]
            let formData = new FormData();
            formData.append('file', xfile);
            formData.append('file_name', xfile.name);

            let token = localStorage.getItem('$swc-dashboard-token'); 
            formData.append('token', token);
            
            // --------------------------------------------------------------------------
            // https://stackoverflow.com/questions/17066875/how-to-inspect-formdata
            // How to inspect FormData?
            for (var pair of formData.entries()) {
                // console.log(pair[0]+ ', ' + pair[1]); 
                // console.log( pair[1] ); 
            }

            let end_point = myConfig.server_domain+"/v1/tle/footprint/upload_files"
 
            axios
            .post( end_point , formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then( async (res) => {
              
              // --------------------------------------------------------------------------
            
              let file_name = xfile.name

              this.content_arr.forEach( async (v, i, a) => { 

                if(v.type=='file'){

                  v.content.forEach( async (vv, ii, aa) => { 

                    vv.files.forEach( async (vvv, iii, aaa) => {

                      if( ( this.current_index == i) && ( this.current_sub_index == ii) && ( this.current_sub_index_lv1 == iii) ){
  
                        vvv.lock = true
                        vvv.file = file_name
                        vvv.size = xfile.size
                        vvv.link = myConfig.server_domain+"/v1/footprint/kml/download/"+file_name 
                  
                        v.footprint_position_degree = this.footprint_position_degree

                        this.content_arr.splice( i, 1, v) 
  
                        let _content = {
                          id : this.sat_info.name+'@'+this.sat_info.norad_catalog_number,
                          name : this.sat_info.name,
                          norad_id : this.sat_info.norad_catalog_number,
                          international_designator : this.sat_info.international_designator,
                          main_docs : '',
                          content_arr : this.content_arr,
                          // footprint_position_degree = this.footprint_position_degree
                        } 

                        console.log( _content )
                        // this.$store.commit('set_tle_content', JSON.parse(JSON.stringify( _content )));
                        await this.fn__post_docs_contents( _content.id, JSON.parse(JSON.stringify( _content )) )  
                         

                      } 

                    }) 

                  }) 

                }else{
                  
                }
                
              })

              // --------------------------------------------------------------------------

            })
            .catch((err) => {
            
              console.log(err);
            
            }); 

         },
        async fn__post_docs_contents ( id, _content ) {
  
           let progress_action = 'docs_contents'
           let progress_reason = JSON.stringify( _content )

           let nowDate = new Date()
           let progress_date = nowDate.toISOString().split('T')[0] 

           this.progress_open = true 
           let c = await this.post_docs_contents( id, progress_action, progress_reason, progress_date )
           this.progress_open = false
           

        },
        async post_docs_contents( id, progress_action, progress_reason, progress_date ){

                      return new Promise((resolve, reject) => { 

                                const config = {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                                let requestBody = {

                                    id : id, 
                                    progress_action : progress_action,
                                    progress_reason : progress_reason,
                                    progress_date : progress_date, 
                                    footprint_position_degree : JSON.stringify( this.footprint_position_degree )

                                }
                              
                                const json = JSON.stringify(requestBody)
                                
                                let end_point = myConfig.server_domain+"/v1/tle/store/docs/contents"
                                
                                this.$refs.topProgress.start()

                                axios.post( end_point, json, config )
                                .then(response => {

                                    this.$refs.topProgress.done() 
                                    resolve( response.data )

                                }).catch(()=>{ 
                                
                                    this.$refs.topProgress.done()
                                    reject() 

                                })  

                      })

        }, 
        async set_orbit_position( orbit_info ){

                      return new Promise((resolve, reject) => { 

                                const config = {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                                let requestBody = {

                                    orbit_info : orbit_info
                                }
                              
                                const json = JSON.stringify(requestBody)
                                
                                let end_point = myConfig.server_domain+"/v1/tle/set/orbit/info"
                                
                                this.$refs.topProgress.start()

                                axios.post( end_point, json, config )
                                .then(response => {

                                    this.$refs.topProgress.done() 
                                    resolve( response.data )

                                }).catch(()=>{ 
                                
                                    this.$refs.topProgress.done()
                                    reject() 

                                })  

                      })

        },
        async fn_process_set_orbit_position () {
          
          // console.log( this.sat_info , this.sat_info.position  )

          await this.set_orbit_position( this.sat_info )
          this.process_ok = true

        },
        fn_process_close (){

           this.$store.commit('set_open_footprint_upload', false);

        },
        fn_add_file () {
          
             

            let files_arr = []
             
            let file_obj = {

                      block : generateBlockId(),
                      file : null, 
                      lock : false,
                       
            }

            files_arr.push( { select_doc : this.select_doc, files : [file_obj] } )
            
            let files_obj = {
              
              block : generateBlockId(),
              type : 'file', 
              content : files_arr,
              footprint_position_degree : this.footprint_position_degree
            }

            try{
              this.content_arr.push( files_obj ) 
            }catch(e){
              console.log(e)
            }
            

         },
         fn_edit_content ( index, sub_index, sub_index_lv1 ){

            this.content_arr.forEach((v, i, a) => { 

              if(v.type=='editor'){

                // v.content.forEach((vv, ii, aa) => { 

                //   vv.docs.forEach((vvv, iii, aaa) => {

                //     if( ( index == i) && ( sub_index == ii) && ( sub_index_lv1 == iii)  ){

                //       vvv.lock = false

                //     } 

                //   }) 

                // })

                // this.content_arr.splice( i, 1, v)
              }else{

                v.content.forEach((vv, ii, aa) => { 

                  vv.files.forEach((vvv, iii, aaa) => {

                    if( ( index == i) && ( sub_index == ii) && ( sub_index_lv1 == iii)  ){

                      vvv.lock = false

                    } 

                  }) 

                })

                this.content_arr.splice( i, 1, v)


              }

            })
             
           
         },
         fn_add_editor () {
 
            
        
            // ---------------------------------------------------------------------------------------
            let docs_arr = []
             
            let doc_obj = {

                      block : generateBlockId(),
                      editor_value : '', 
                      lock : false, 

            }

            docs_arr.push( { select_doc : this.select_doc, docs : [doc_obj] } )
            
            let docs_obj = {
              
              block : generateBlockId(),
              type : 'editor', 
              content : docs_arr

            }

            
            this.content_arr.push( docs_obj ) 
 
            
         }, 
         fn_content_box_over ( index, sub_index, sub_index_lv1 ){

           this.content_arr.forEach((v, i, a) => { 

              v.content.forEach((vv, ii, aa) => { 

                if(v.type=='editor'){
                  
                  // vv.docs.forEach((vvv, iii, aaa) => {

                  //  if( ( index == i) && ( sub_index == ii) && ( sub_index_lv1 == iii) ){

                  //    vvv.selected = true

                  //    this.current_index = index
                  //    this.current_sub_index = sub_index
                  //    this.current_sub_index_lv1 = sub_index_lv1

                  //  }else{

                  //    vvv.selected = false

                  //  }

                  // }) 

                }else{

                  vv.files.forEach((vvv, iii, aaa) => {

                   if( ( index == i) && ( sub_index == ii) && ( sub_index_lv1 == iii) ){

                     vvv.selected = true

                     this.current_index = index
                     this.current_sub_index = sub_index
                     this.current_sub_index_lv1 = sub_index_lv1

                   }else{

                     vvv.selected = false

                   }

                  }) 

                }
                 

              })

              this.content_arr.splice( i, 1, v)

            })
             
         },
         fn_remove_content ( index, sub_index, sub_index_lv1 ){
            
            let mark_delete = 0

            this.content_arr.forEach( async (v, i, a) => { 

              if(v.type=='editor'){

               

              }else{

                  v.content.forEach( async (vv, ii, aa) => { 

                    vv.files.forEach( async (vvv, iii, aaa) => {

                      if( ( index == i) && ( sub_index == ii) && ( sub_index_lv1 == iii)  ){

                        // vv.files.splice( iii, 1)
                        this.content_arr.splice( i, 1 ) 
                        
                        let _content = {
                          id : this.sat_info.name+'@'+this.sat_info.norad_catalog_number,
                          name : this.sat_info.name,
                          norad_id : this.sat_info.norad_catalog_number,
                          international_designator : this.sat_info.international_designator,
                          main_docs : '',
                          content_arr : this.content_arr
                          
                        }  
                        // this.$store.commit('set_tle_content', JSON.parse(JSON.stringify( _content )));
                        await this.fn__post_docs_contents( _content.id, JSON.parse(JSON.stringify( _content )) )  

                      } 

                    }) 

                  })

                  

                }

            })
            
            
             
         }, 
          
         
    
    },
    mounted() {
         
          
         try{
           this.footprint_position_degree = parseFloat( JSON.parse(JSON.stringify( this.tle_data.item.position )) )

            

           if( this.tle_content.content_arr ){

              this.content_arr = this.tle_content.content_arr  

              // this.footprint_position_degree = this.content_arr[0].footprint_position_degree 
              // this.footprint_position_degree = this.tle_data.position

           }else{

             this.content_arr=[]
             this.fn_add_file()  
            //  this.footprint_position_degree = 0
             
           }
           

         }catch(e){
           console.log(e)
         }
         
  setTimeout(() => {                

        // ----------------------------------------------------------------
        // Navigate according to degrees in circle
        // https://stackoverflow.com/questions/58602581/navigate-according-to-degrees-in-circle

        var footprint_position_degree = 0

        const angleSteps = 8;
        const angleMoveSteps = 90;
        var currentDir = 0;
        var shipDir = 0; 
        var lastDownTarget;
        var lastEvent;

        var pInc = 0

        function getNextAngle(newDirection, currentDirection) {
            const step = 360 / angleMoveSteps
            newDirection %= 360;
            currentDirection %= 360;
            newDirection = newDirection < currentDirection ? newDirection + 360 : newDirection;
            const dif = newDirection - currentDirection;

            if (dif > 360 / 2 && dif < 360 - step) { return currentDirection - step }
            if (dif > step && dif < 360 / 2) { return currentDirection + step }
            return currentDirection
        }

        function getStepAngle(dir) {
            return Math.floor(((dir % 360 + 360) % 360) / (360 / angleSteps) + 0.5) % angleSteps;
        }  
        /* Demo code from here down */
        Math.TAU = Math.PI * 2;
        const ctx = canvas.getContext("2d")
        const w = canvas.width;
        const h = canvas.height;
        var seeking = false;
        const speed = 10; // milliseconds

        

        update();
        canvas.addEventListener("click", event => {
          lastDownTarget = event.target;
          lastEvent = event
          pInc = 0

          const bounds = canvas.getBoundingClientRect();
          const x = event.pageX - bounds.left - scrollX;
          const y = event.pageY - bounds.top  - scrollY;
          footprint_position_degree = Math.atan2(y - w / 2, x - h / 2) * 180 / Math.PI;
          
          this.footprint_position_degree = footprint_position_degree
          //  console.log( footprint_position_degree )

          // console.log( 'click' , x, y )

          if(!seeking){ render() }
        });

        document.addEventListener('keydown', (event) => 
                    {
                        // console.log( pInc )  
                        let ref = 0.2
                        if(lastDownTarget == canvas) {

                            if (event.keyCode == '38') {
                            pInc = pInc+ref
                            }
                            else if (event.keyCode == '40') {
                                pInc = pInc-ref
                            }
                            else if (event.keyCode == '37') {
                              pInc = pInc+ref
                            }
                            else if (event.keyCode == '39') {
                              pInc = pInc-ref
                            }
                            else if (event.keyCode == '32') {
                              pInc = pInc+ref
                            }  
                            

                            const bounds = canvas.getBoundingClientRect();
                            const x = ( lastEvent.pageX + pInc ) - bounds.left - scrollX;
                            const y = ( lastEvent.pageY + pInc ) - bounds.top  - scrollY;
                            footprint_position_degree = Math.atan2(y - w / 2, x - h / 2) * 180 / Math.PI;

                            this.footprint_position_degree = footprint_position_degree

                            if(!seeking){ render() }
                            
                        }
                    }, false);
        
        // -------------------------------------
            
          pInc = 0  
          footprint_position_degree = this.footprint_position_degree
          
          if(!seeking){ render() }

        // --------------------------------------
        function render() {
          requestAnimationFrame(update);
          var newDir = getNextAngle(footprint_position_degree, currentDir);
          if(newDir !== currentDir) {
              currentDir = newDir;
              seeking = true;
              setTimeout(render, speed);
          } else {
              currentDir = footprint_position_degree;
                setTimeout(()=>requestAnimationFrame(update), speed);
              seeking = false;
          }
          
        }

        function update() {
          shipDir = getStepAngle(currentDir);
          clear();
          drawCompase();
          drawTargetAngle(footprint_position_degree);
          //  drawCurrentAngle(currentDir);
          drawStepAngle(shipDir);

        }

        function clear() { ctx.clearRect(0,0,w,h) }

        function angleText(text,x,y,angle,size = 12, col = "#000") {
            const xAX = Math.cos(angle);
            const xAY = Math.sin(angle);
            ctx.fillStyle = col;
            ctx.font = size + "px arial";
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            if(xAX < 0) {
                ctx.setTransform(-xAX, -xAY, xAY, -xAX, x, y);
                ctx.textAlign = "left";
            
            } else {
                ctx.setTransform(xAX, xAY, -xAY, xAX, x, y);
                ctx.textAlign = "right";
            }
            ctx.fillText(text,0,0);
        }
        function drawCompase() {
            var i;
            const rad = h * 0.4, rad1 = h * 0.395, rad2 = h * 0.41;
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000";
            ctx.beginPath();
            ctx.arc(w / 2, h / 2, rad, 0, Math.TAU);
            ctx.stroke();

            ctx.lineWidth = 2;
            ctx.beginPath();
            for (i = 0; i < 1; i += 1 / angleSteps) {
                const ang = i * Math.TAU;
                ctx.moveTo(Math.cos(ang) * rad1 + w / 2, Math.sin(ang) * rad1 + h / 2);
                ctx.lineTo(Math.cos(ang) * rad2 + w / 2, Math.sin(ang) * rad2 + h / 2);
            }
            ctx.stroke();

            for (i = 0; i < 1; i += 1 / angleSteps) {
                const ang = i * Math.TAU;
                angleText(
                    (ang * 180 / Math.PI).toFixed(1).replace(".0","")+"°", 
                    Math.cos(ang) * (rad1 - 2) + w / 2, 
                    Math.sin(ang) * (rad1 - 2) + h / 2,
                    ang
                );
            }
            ctx.setTransform(1,0,0,1,0,0);
        }
        function drawTargetAngle(angle) { // angle in deg
            // const rad = h * 0.30, rad1 = h * 0.1, rad2 = h * 0.34;
            const rad = h * 0.30, rad1 = h * 0.1, rad2 = h * 0.33;
            const ang = angle * Math.PI / 180;
            const fromA = ang - Math.PI / (angleSteps * 4);
            
            const toA = ang + Math.PI / (angleSteps * 4);
            ctx.linewidth = 2;
            ctx.strokeStyle = "#F00";
            ctx.beginPath();       
            
            ctx.moveTo(Math.cos(fromA) * rad + w / 2, Math.sin(fromA) * rad + h / 2);
            ctx.lineTo(Math.cos(ang) * rad2 + w / 2, Math.sin(ang) * rad2 + h / 2);
            ctx.lineTo(Math.cos(toA) * rad + w / 2, Math.sin(toA) * rad + h / 2);       
            ctx.stroke();  
            angleText(
                angle.toFixed(1).replace(".0","")+ "°", 
                Math.cos(ang) * (rad - 4) + w / 2, 
                Math.sin(ang) * (rad - 4) + h / 2,
                ang,
                15, "#F00"
            );      
            ctx.setTransform(1,0,0,1,0,0);

        }
        function drawCurrentAngle(angle) { // angle in deg
            const rad = h * 0.14, rad2 = h * 0.17;
            const ang = angle * Math.PI / 180;
            const fromA = ang - Math.PI / (angleSteps * 2);
            
            const toA = ang + Math.PI / (angleSteps * 2);
            ctx.linewidth = 2;
            ctx.strokeStyle = "#0A0";
            ctx.beginPath();       
            
            ctx.moveTo(Math.cos(fromA) * rad + w / 2, Math.sin(fromA) * rad + h / 2);
            ctx.lineTo(Math.cos(ang) * rad2 + w / 2, Math.sin(ang) * rad2 + h / 2);
            ctx.lineTo(Math.cos(toA) * rad + w / 2, Math.sin(toA) * rad + h / 2);       
            ctx.stroke();  
            angleText(
                angle.toFixed(1).replace(".0","")+ "°", 
                Math.cos(ang) * (rad - 4) + w / 2, 
                Math.sin(ang) * (rad - 4) + h / 2,
                ang,
                12, "#0A0"
            );      
            ctx.setTransform(1,0,0,1,0,0);

        }
        function drawStepAngle(angle) { // ang 0 to angleSteps cyclic
            var ang = angle % angleSteps;
            ang *= Math.PI / angleSteps*2;
            const fromA = ang - Math.PI / angleSteps;
            const toA = ang + Math.PI / angleSteps;
            
            const rad = h * 0.4, rad1 = h * 0.35, rad2 = h * 0.44;
            // const rad3 = h * 0.34, rad4 = h * 0.45;
            const rad3 = h * 0.35, rad4 = h * 0.44;
            ctx.linewidth = 1;
            ctx.strokeStyle = "#F00";
            ctx.beginPath();   
            ctx.arc(w / 2, h / 2, rad1, fromA, toA);
            ctx.moveTo(w / 2 + Math.cos(fromA) * rad2, h / 2 + Math.sin(fromA) * rad2, 0, Math.TAU);
            ctx.arc(w / 2, h / 2, rad2,  fromA, toA);
            ctx.stroke();
            
            ctx.linewidth = 2;
            ctx.beginPath();       
            
            ctx.moveTo(Math.cos(fromA) * rad3 + w / 2, Math.sin(fromA) * rad3 + h / 2);
            ctx.lineTo(Math.cos(fromA) * rad4 + w / 2, Math.sin(fromA) * rad4 + h / 2);
            ctx.moveTo(Math.cos(toA) * rad3 + w / 2, Math.sin(toA) * rad3 + h / 2);
            ctx.lineTo(Math.cos(toA) * rad4 + w / 2, Math.sin(toA) * rad4 + h / 2);       
            ctx.stroke();     
            
            //  angleText(
            //      angle, 
            //      Math.cos(ang + 0.1) * (rad - 2) + w / 2, 
            //      Math.sin(ang + 0.1) * (rad - 2) + h / 2,
            //      ang,
            //      16, "#F00"
            //  );     
            
            ctx.setTransform(1,0,0,1,0,0);
        }
        // ----------------------------------------------------------------
        // ----------------------------------------------------------------        

      },100)
    },
    watch: {

          
        
    },
    computed: {
          tle_content () {
              
              let tmp = JSON.parse(JSON.stringify( this.$store.state.tle_content )); 
              return tmp

          },
          open_upload () { 
              
              let tmp = JSON.parse(JSON.stringify( this.$store.state.open_upload )); 
              return tmp
            
          }, 
          tle_data () { 
              
              let tmp = JSON.parse(JSON.stringify( this.$store.state.tle_data )); 
              return tmp
            
          }, 
          sat_info () {
            
             
            try{
                // this.footprint_position_degree = JSON.parse(JSON.stringify( this.tle_data.item.position ))

                let observerGd = {  //ดอยอินทนน์
                                      longitude: satellite.degreesToRadians(98.485591343893248),
                                      latitude: satellite.degreesToRadians(18.589976828998569),
                                      height: 0.500
                            };

                let timesp = new Date().getTime()
                
                let tle_tmp = this.tle_data.item.name+'\n' +
                          this.tle_data.item.line1+'\n' +
                          this.tle_data.item.line2;

                

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
                          if( this.tle_data.item.name.includes(' DEB') ){

                              type='DEBRIS'

                          }else if( this.tle_data.item.name.includes('R/B') ){

                              type='ROCKET BODY'

                          }
                           
                          let obj={
                                    _id : this.tle_data.item._id,
                                    name:this.tle_data.item.name.trim(),
                                    line_1:this.tle_data.item.line1,
                                    line_2:this.tle_data.item.line2,
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

                                    position : this.footprint_position_degree,
                                     
                                    tle_age:PropagationTime.toFixed(2),
                                     

                          }

                return obj

            }catch(e){
              
              console.log( e )
              return;

            }

          }

    },
    created() {
      
    },
    beforeDestroy() {

         

    },
    
    
}
 
// // ----------------------------------------------------------------

function get_time_diff( d )
{
    
        

         //create date format          
         var timeStart = new Date(d);
         var timeEnd = new Date();

         var difference = (timeEnd.getTime() - timeStart.getTime()) / (24*60*60*1000);          

         

    return difference;
}
function generateBlockId(){
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
  background-color: #5F1854;
  
}
 

</style>

<style lang="scss">
/* bootstrap-vue modal border-radius */

.modal-dialog {
   

  .modal-content {
    
    border-radius: 0px;
     
  } 

}

.modal-xl-4 {
    max-width: 85% !important;
}

.bbtn :hover{
    letter-spacing:0.25em ;
}

.card-header  { // b-card class header
  border-radius: 0px !important;
  
}
 
</style>
 
 

<style>
    @import "../../assets/style.css";

</style>

<style>
    @import "https://pro.fontawesome.com/releases/v5.10.0/css/all.css";
</style>

<style>
    /* @import "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-social/5.1.1/bootstrap-social.min.css"; */
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
  #tab-container-3
  {
    float: left;
    margin: -10px 0 0 0;
    /* width: 126px; */
    width: 40%;
    border-right:2px solid #ffffff;
  }
  #tab-container-3 ul
  {
    list-style: none;
    text-align: center;
  }
  #tab-container-3 ul li
  {
    border-top: 3px solid #666;
    border-right: 3px solid #ddd;
    border-bottom: 3px solid #666;
    border-left: 8px solid #666;
    background-color: #ddd;
    margin: 10px 0;
  }
  #tab-container-3 ul li a,
  #tab-container-3 ul li a:visited
  {
    text-decoration: none;
    color: #666;
    display: block;
    padding: 15px 5px;
    
  }
  #tab-container-3 ul li:hover
  {
    border-left: 8px solid #333;
  }
  #tab-container-3 ul li a:hover
  {
    color: #000;
  }
  #tab-container-3 ul li.tab-selected
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
  #main-container-3
  {
    min-height: 60vh;
    margin: 0 0 0 45%;
    /* padding: 20px; */
    background-color: #fff;
    /* border-left: 2px dashed #1363DF; */
    /* border-left: 2px dashed #17a2b8; */
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

<style lang="scss" >
 
 // -------------------------------------------------------------
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
span.aa {
  flex: 1;
  margin-left:1em;
  margin-right:1em;
  border-bottom: 1.5px dashed #17a2b8;
}

span.aa-none {
  flex: 1;
  margin-left:1em;
  margin-right:1em;
  border-bottom: 0.5px dashed #bbb;
}


canvas {
 position: absolute;
 top: 0px;
 left: 0px;
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
 </style>