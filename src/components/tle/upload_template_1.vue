<template>
    
    <div style="height:85vh;border:0px solid red;margin-top:0em;margin-left:0em;margin-right:0em;">
    <vue-topprogress ref="topProgress" color="#FF0000"></vue-topprogress> 
    <!-- ------------------------------------------------------------------------ -->
    <main class="site-wrapper">

        <b-row>

        <div class="col-xl-12 col-sm-12w col-12">
          
            <div class="card border-info text-center border-2 border-right-0 border-left-0 border-top-0 rounded-0 mt-1 text-primary" style="margin-bottom:0.5em;height:5vh;justify-content: center;" >
               <span class="text-info font-weight-bold"><span style="font-size:18px;color:#17a2b8;"> {{tle_data.item.name}} </span>
               <b-badge style="float:right;background-color:#17a2b8;" pill > 1 / 1</b-badge>
               </span> 
            </div>

            <div class="card border-primary border-0 rounded-0 mt-1 text-success" style="margin-bottom:0.5em;height:67vh;" >
                <div class="card-content">
                   <div class="card-body">
                      <div class="media d-flex" > 
                        <div class="align-self-center"> 
                                             
                        </div> 
                                        
                        <div class="media-body text-left ml-0 align-self-center" style="zoom:0.9" >

                           <div id="id-content" >
                             <div id="tab-container">
                               
                               <b-row class="w-100 text-center mt-2">
                                          <b-col><img :src="require('@/assets/cccc.png')" style="width:100px;" /></b-col>
                               </b-row>

                               <b-row class="w-100 text-center mt-2">
                                  <b-col><span class="text-info ml-3 font-weight-bold">{{sat_info.name}} ({{sat_info.international_designator}})</span></b-col>
                               </b-row>

                               <b-row class="w-100 text-left mt-3 text-info" style="zoom:0.95;"> 
                                 <b-col>
                                    
                                  <ol >
                                    <li style="list-style-type: circle;">
                                      
                                      <div class="title"><section><span>NORAD ID</span> <span class="aa"></span>
                                        <span style="float:right;margin-right:3em;font-weight: 500;">{{sat_info.norad_catalog_number}}</span></section>
                                      </div> 
                                    </li>
                                    
                                    <li style="list-style-type: circle;">
                                      
                                      <div class="title"><section><span>Object Type</span> <span class="aa"></span>
                                        <span style="float:right;margin-right:3em;font-weight: 500;">{{sat_info.type}}</span></section>
                                      </div> 
                                    </li>

                                    <li style="list-style-type: circle;">
                                      
                                      <div class="title"><section><span>Period (hours/day)</span> <span class="aa"></span>
                                        <span style="float:right;margin-right:3em;font-weight: 500;">{{sat_info.period}}</span></section>
                                      </div> 
                                    </li>

                                    <li style="list-style-type: circle;">
                                      
                                      <div class="title"><section><span>TLE Age (day)</span> <span class="aa"></span>
                                        <span style="float:right;margin-right:3em;font-weight: 500;">{{sat_info.tle_age}}</span></section>
                                      </div> 
                                    </li>

                                  </ol>
                                  
                                 </b-col>

                               </b-row>
 
                               <b-row class="w-100 text-left mt-1 ml-1 text-info" style="zoom:0.95;"> 
                                 <b-col>
                                  
                                  <pre style="font-size:12px;font-weight:bold;">
                                  {{tle_data.item.name.toString()}}<br/>{{tle_data.item.line1.toString()}}<br/>{{tle_data.item.line2.toString()}}<br/>
                                  </pre> 

                                 </b-col>

                               </b-row>

                               

                             </div>
                             <div id="main-container" style="margin-bottom:0.5em;height:70vh;overflow-x:hidden;" >
                                <!-- ------------------------------------------------- --> 
                                <b-row class="w-100 text-center mt-0" style="margin-bottom:0em;height:55vh;overflow-x:hidden;">
                                  
                                  <b-col sm=4 >
                                      <canvas id="canvas-1" width="280" height="280" style="zoom:1.1;margin-top:0em;margin-left:-0.5em;" ></canvas>
                                  </b-col>

                                  <b-col sm=8>
                                    
                                  <ol class="text-info" style="border:0px solid red;margin-right:-3em;">

                                    <b-row class="w-100 text-center " style="zoom:1.2;">
                                      <b-col><span class="text-info font-weight-bold">Position</span></b-col>
                                    </b-row>  

                                    <li style="list-style-type: circle;">
                                      
                                      <div class="title"><section><span>Degree of arc</span> <span class="aa"></span>
                                        <span style="float:right;margin-right:3em;font-weight: 500;">{{parseFloat(tle_data.item.position).toFixed(1)}}°</span></section>
                                      </div> 
                                    </li> 
                                    
                                    <b-row class="w-100 text-center " style="zoom:1.2;" v-if="tle_data.item.orbit_footprint.length>0">
                                      <b-col><span :class="tle_data.item.orbit_footprint.length>0 ? 'text-info font-weight-bold' : 'text-danger font-weight-bold'">Footprint</span></b-col>
                                    </b-row>  
 
                                      <li style="list-style-type: circle;" v-for="(data, index) in tle_data.item.orbit_footprint" :key="index" >
                                        
                                        <div class="title"><section><span>{{data.footprint_label}}</span> <span class="aa"></span>
                                          <span style="float:right;margin-right:3em;font-weight: 500;">{{data.footprint_file_name}}</span></section>
                                        </div> 

                                      </li>

                                    <b-row class="w-100 text-center " style="zoom:1.2;" v-if="tle_data.item.content.length>0">
                                      <b-col><span :class="tle_data.item.content.length>0 ? 'text-info font-weight-bold' : 'text-danger font-weight-bold'">Content</span></b-col>
                                    </b-row>  
                                    <b-row class="w-100 text-left " >
                                      <b-col><div v-html="tle_data.item.content" style="zoom:0.9;"></div></b-col>
                                    </b-row>  
                                     
                                  </ol>
                                  
                                 </b-col>

                                </b-row>

                                <b-row class="w-100 text-center mt-0" style="margin-bottom:0em;">
                                </b-row>
                                
                                <!-- ---------------------------------------------------------------------------- -->
                                      <hr >

                                      <b-row style="zoom:0.9;" >
                                        <b-col sm="1"></b-col>
                                        <!-- <b-col>
                                          <button class="  btn btn-outline-info rounded-0 w-100 border-2 "  @click="fn_add_file()"  > 
                                                <i class="fa fa-edit" aria-hidden="true"></i><span style="margin-left:1em;"> Position </span>
                                          </button> 
                                        </b-col> -->
                                          
                                        <b-col>
                                          <button class="  btn btn-outline-info rounded-0 w-100 border-2 " @click="fn_add_file()"  > 
                                                <i class="fa fa-globe" aria-hidden="true"></i> <i class="fa fa-paperclip" aria-hidden="true"></i><span style="margin-left:1em;"> Position / Footprint </span>
                                          </button> 
                                        </b-col>

                                        <b-col>
                                           
                                           

                                          <button class="  btn btn-outline-info rounded-0 w-100 border-2 "  @click="fn_add_editor()" > 
                                                <i class="fa fa-info-circle mr-1" aria-hidden="true" v-if="content.length>0"></i>
                                                <i class="fa fa-comment" aria-hidden="true"></i><span style="margin-left:1em;"> ข้อความ/อธิบาย </span>
                                          </button> 

                                          <!-- <button class="  btn btn-outline-info rounded-0 w-100 border-2 "  @click="fn_add_Satellite_Network_Filings()" disabled> 
                                                <i class="fa fa-rss" aria-hidden="true"></i><span style="margin-left:1em;"> Satellite Network Filings </span>
                                          </button>  -->

                                        </b-col>
                                        <b-col sm="1"></b-col>
                                      </b-row>
                              <!-- ---------------------------------------------------------------------------- -->

                                
                             </div>
                           </div>
                          
                                               
                        </div>

                      </div>
                   </div>
                </div>
            </div>

            <div class="card bbtn border-info border-2 mt-1 border-right-0 border-left-0 border-bottom-0 text-success rounded-0" style="margin-bottom:0.5em;height:10vh;justify-content: center;" >
            
              <b-row  class="mt-2 mr-1 ml-1">  
              <b-col cols="4"> </b-col>
              
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

        <b-modal v-model="open_footprint_upload" dialog-class="modal-xl-4" centered no-close-on-backdrop hide-footer hide-header hide-header-close  title="info"   >
        
          <footprintTemplate1/>

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

        <!-- ------------------------------ -->
        
          
        <b-modal v-model="open_docs_add_dialog" size="sm-success"  centered no-close-on-backdrop hide-header hide-header-close  title="Login"  >
          <!-- <b-row class="text-center text-success" style="margin-top:0.5em;">  
            <b-col>
              <span>Some initial content</span>
            </b-col>
          </b-row>
          <b-row class="text-center text-success" style="margin-top:0.5em;">  

            <b-col>   
              <div style="overflow:auto;height:33vh;">
                <vue-editor v-model="content" 
                :editor-toolbar="customToolbar"
                style="zoom:0.9;border:2px solid #b5b5b5;"
                  
                />
              </div>
            </b-col>
              
          </b-row> -->

          <div class="card border-success text-center border-2 border-right-0 border-left-0 border-top-0 rounded-0 mt-1 text-success" style="margin-bottom:0.5em;height:5vh;justify-content: center;" >
               <span class="text-success font-weight-bold" style="margin-top:-1em;"><span style="font-size:20px;">Ex. Information (คำอธิบายเพิ่มเติม) </span>
               <b-badge style="float:right;margin-top:0.5em;" pill variant="success"> 1 / 1</b-badge>
               </span> 
            </div>

            <div class="mt-3"> 
              <vue-editor v-model="content" 
              :editor-toolbar="customToolbar"
              style="zoom:0.9;border:2px solid #b5b5b5;" 
              />
            </div>   

          <template v-slot:modal-footer="{ }"> 
            
              <b-row class="w-100">
                <b-col sm=1></b-col>
                <b-col sm=5>

                  <b-button variant="outline-danger" @click="open_docs_add_dialog = false" block class="rounded-0 border-2"  >
                        <i class="fa fa-window-close" aria-hidden="true"></i> Close
                  </b-button>
                </b-col>
                 
                <b-col sm=5>

                  <b-button variant="outline-success" @click="fn_docs_add_dialog()" block class="rounded-0 border-2"  >
                        <i class="fa fa-window-close" aria-hidden="true"></i> Save
                  </b-button>
                </b-col>
                <b-col sm=1></b-col>
                 
              </b-row>
               

          </template>
        </b-modal>
     
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
import footprintTemplate1 from './upload_foot_print_template_1.vue' 


var satellite = require('satellite.js');
var TLEX = require( 'tle' )

export default {
  name: 'template',
  components: {
		 
    VueEditor ,
    vueTopprogress,
    footprintTemplate1 

	},
  data() {
            return {  
                
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
               customToolbar: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }], [{ 'align': ''},{ 'align': 'justify'}, { 'align': 'right' }], [{ 'color': [] }, { 'background': [] }]],
               fullToolbar : [
                [{ 'font': [] }],
                [{ 'header': [false, 1, 2, 3, 4, 5, 6, ] }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
                [{ 'header': 1 }, { 'header': 2 }],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],
                [{ 'color': [] }, { 'background': [] }],
                ['link', 'image', 'video', 'formula'],
                [{ 'direction': 'rtl' }],
                ['clean'],
              ], 
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

               open_docs_add_dialog : false,

               content:''

               

            }
              
    },
        
    
    methods: {
        async fn_docs_add_dialog () {

          let _content = {
            id : this.sat_info.name+'@'+this.sat_info.norad_catalog_number,
            name : this.sat_info.name,
            norad_catalog_number : this.sat_info.norad_catalog_number ? this.sat_info.norad_catalog_number : '0' , 
            content : JSON.stringify( this.content ), 
          } 

          console.log( _content.content )

          let c = await this.post_content( _content.norad_catalog_number, _content )
           

          this.content = JSON.parse( JSON.parse(JSON.stringify(_content.content)) )
          this.open_docs_add_dialog = false

         

          // -------------------------------------------------------------------------

          let _tle_data = JSON.parse(JSON.stringify( this.tle_data ))
          _tle_data.item.content = this.content

          this.$store.commit('set_tle_data', JSON.parse(JSON.stringify( _tle_data )));

        },
        async post_content( _norad_catalog_number, _content  ){

            return new Promise((resolve, reject) => { 

                      const config = {
                          headers: {
                              'Content-Type': 'application/json'
                          }
                      }
                      let requestBody = {

                          norad_catalog_number : _norad_catalog_number, 
                          content : _content,

                      }
                    
                      const json = JSON.stringify(requestBody)
                      
                      let end_point = myConfig.server_domain+"/v1/tle/post/docs/contents"
                      
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
        onEditorBlur(quill) {
          console.log("editor blur!", quill);
        },

        onEditorFocus(quill) {
          console.log("editor focus!", quill);
        },

        onSelectionChange(range) {
          console.log("selection change!", range);
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

                        this.content_arr.splice( i, 1, v) 
  
                        let _content = {
                          id : this.sat_info.name+'@'+this.sat_info.norad_catalog_number,
                          name : this.sat_info.name,
                          norad_id : this.sat_info.norad_catalog_number,
                          international_designator : this.sat_info.international_designator,
                          main_docs : '',
                          content_arr : this.content_arr
                        } 
                        // this.$store.commit('set_tle_content', JSON.parse(JSON.stringify( _content )));
                        // await this.fn__post_docs_contents( _content.id, JSON.parse(JSON.stringify( _content )) )  
                         

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
        fn_process_close (){

           this.$store.commit('set_open_upload', false);

        },
        fn_add_file () {
          
            this.$store.commit('set_open_footprint_upload', true);

            // let files_arr = []
             
            // let file_obj = {

            //           block : generateBlockId(),
            //           file : null, 
            //           lock : false,
                       
            // }

            // files_arr.push( { select_doc : this.select_doc, files : [file_obj] } )
            
            // let files_obj = {
              
            //   block : generateBlockId(),
            //   type : 'file', 
            //   content : files_arr

            // }

            // try{
            //   this.content_arr.push( files_obj ) 
            // }catch(e){
            //   console.log(e)
            // }
            

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
         fn_add_Satellite_Network_Filings () {

         },
         fn_add_editor () {
 
            this.open_docs_add_dialog = true
        
            // ---------------------------------------------------------------------------------------
            // let docs_arr = []
             
            // let doc_obj = {

            //           block : generateBlockId(),
            //           editor_value : '', 
            //           lock : false, 

            // }

            // docs_arr.push( { select_doc : this.select_doc, docs : [doc_obj] } )
            
            // let docs_obj = {
              
            //   block : generateBlockId(),
            //   type : 'editor', 
            //   content : docs_arr

            // }

            
            // this.content_arr.push( docs_obj ) 
 
            
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

                // v.content.forEach( async (vv, ii, aa) => { 

                //   vv.docs.forEach( async (vvv, iii, aaa) => {

                //     if( ( index == i) && ( sub_index == ii) && ( sub_index_lv1 == iii)  ){

                //       // vv.docs.splice( iii, 1)
                //       this.content_arr.splice( i, 1 )
                      
                //       let _content = {
                //         trace_id : this.request_from.trace_id,
                //         main_docs : this.main_doc_name,
                //         content_arr : this.content_arr
                //       }
                //       this.$store.commit('set_tle_content', JSON.parse(JSON.stringify( _content )));
                //       await this.fn_process_software_development( this.main_doc_name, JSON.parse(JSON.stringify( _content )) )

                //       if( this.sub_doc_name_1.name == this.select_doc ){

                //           this.sub_doc_name_1.doc = parseInt( this.sub_doc_name_1.doc ) - 1

                //       } 

                //     } 

                //   }) 

                // })

                

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
                        // await this.fn__post_docs_contents( _content.id, JSON.parse(JSON.stringify( _content )) )  

                      } 

                    }) 

                  })

                  

                }

            })
            
            
             
         }, 
          
         
    
    },
    mounted() {

        try{

          if( this.tle_content.content_arr ){

            this.content_arr = this.tle_content.content_arr

          }else{

            this.content_arr = []

          }
          

        }catch(e){}
         
        setTimeout(() => {                

          // ----------------------------------------------------------------
          // Navigate according to degrees in circle
          // https://stackoverflow.com/questions/58602581/navigate-according-to-degrees-in-circle
          try{
          
            this.footprint_position_degree = parseFloat( JSON.parse(JSON.stringify( this.tle_data.item.position )) )
          
          }catch(e){
            this.footprint_position_degree = 0
          }

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
          const canvas = document.getElementById('canvas-1');
          const ctx = canvas.getContext("2d")
          const w = canvas.width;
          const h = canvas.height;
          var seeking = false;
          const speed = 10; // milliseconds

          

          update();
           
          
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
              
               
              
              ctx.setTransform(1,0,0,1,0,0);
          }
          // ----------------------------------------------------------------
          // ----------------------------------------------------------------        

        },100)     
    },
    watch: {

          
        
    },
    computed: {
          open_footprint_upload() { 
              
              let tmp = JSON.parse(JSON.stringify( this.$store.state.open_footprint_upload )); 
              return tmp
            
          }, 
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
            
            this.content = this.tle_data.item.content ? this.tle_data.item.content : ''
            try{

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

                                    position:JSON.parse(JSON.stringify( this.tle_data.item.position )),
                                     
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

.modal-xl-1 {
    max-width: 90% !important;
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
  #tab-container
  {
    float: left;
    margin: -10px 0 0 0;
    /* width: 126px; */
    width: 40%;
    border-right:2px solid #FFFFFF;
  }
  #tab-container ul
  {
    list-style: none;
    text-align: center;
  }
  #tab-container ul li
  {
    border-top: 3px solid #666;
    border-right: 3px solid #ddd;
    border-bottom: 3px solid #666;
    border-left: 8px solid #666;
    background-color: #ddd;
    margin: 10px 0;
  }
  #tab-container ul li a,
  #tab-container ul li a:visited
  {
    text-decoration: none;
    color: #666;
    display: block;
    padding: 15px 5px;
    
  }
  #tab-container ul li:hover
  {
    border-left: 8px solid #333;
  }
  #tab-container ul li a:hover
  {
    color: #000;
  }
  #tab-container ul li.tab-selected
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
  #main-container
  {
    min-height: 60vh;
    margin: 0 0 0 35%;
    padding: 20px;
    background-color: #fff;
    /* border-left: 2px dashed #1363DF; */
    border-left: 2px dashed #17a2b8;
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
 
 </style>