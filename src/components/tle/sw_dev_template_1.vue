<template>
    
    <div style="height:85vh;border:0px solid red;margin-top:0em;margin-left:0em;margin-right:0em;">
    <vue-topprogress ref="topProgress" color="#FF0000"></vue-topprogress> 
    <!-- ------------------------------------------------------------------------ -->
    <main class="site-wrapper">

        <b-row>

        <div class="col-xl-12 col-sm-12w col-12">
          
            <div class="card border-primary text-center border-2 border-right-0 border-left-0 border-top-0 rounded-0 mt-1 text-primary" style="margin-bottom:0.5em;height:5vh;justify-content: center;" >
               <span class="text-primary font-weight-bold"><span style="font-size:18px;color:#1363DF;"> (SII) เริ่มต้นพัฒนา ( {{progress_percent}}% ) : {{request_from.softwareName}} </span>
               <b-badge style="float:right;background-color:#1363DF;" pill > 1 / 1</b-badge>
               </span> 
            </div>

            <div class="card border-primary border-0 rounded-0 mt-1 text-success" style="margin-bottom:0.5em;height:67vh;" >
                <div class="card-content">
                   <div class="card-body">
                      <div class="media d-flex" > 
                        <div class="align-self-center"> 
                                             
                        </div>

                        
                                        
                        <div class="media-body text-left ml-0 align-self-center" style="zoom:0.9" >

                           
                          <!-- -------------------------------------------------------------------------------------------------------------                   -->
                          <div id="id-content" >
                            <div id="tab-container">
                                <ul>

                                  <li :class="select_doc == sub_doc_name_1.name ? 'tab-selected' : ''" @click="fn_select_doc(sub_doc_name_1.name, 'Requirement Specification')" style="cursor:pointer;"><a>
                                    <i :class="select_doc == sub_doc_name_1.name ? 'fa fa-caret-right mr-2' : ''" aria-hidden="true"></i>เอกสารแผนการดำเนินโครงการ (Project Plan)
                                  </a></li>
                                   
                                   
                                </ul>
                            </div>
                            
                            
                            <div id="main-container" style="margin-bottom:0.5em;height:70vh;overflow:auto;" >

                              <div v-if="ident==true">

                                                  <p class="fake-legend text-success mt-1"><span> ยืนยันตัวตน ( RTAF, Google auth )</span></p>

                                                  <b-row class="text-center mt-1" align-v="center" style="margin-left:-3em;">
                                                    <b-col class="align-self-center " sm=2></b-col>
                                                     
                                                    <b-col class="align-self-center " >
                                                    <form class="mr-1">
                                                        <div class="form-group" >
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                        <span class="input-group-text text-primary"  > <i class="fa fa-user"></i> </span>
                                                            </div>
                                                            <input name="" class="form-control rounded-0 " placeholder="Username" type="text" v-model="user" readonly>
                                                        </div>  
                                                        </div>  
                                                        <div class="form-group">
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                        <span class="input-group-text text-primary" > <i class="fa fa-lock"></i> </span>
                                                        </div>
                                                        <input class="form-control rounded-0 " placeholder="******" type="password" v-model="pass" @keyup.enter="login_()">
                                                        </div>  
                                                        </div>  
                                                    </form>

                                                    <hr> 

                                                    <button  class=" btn btn-outline-primary rounded-0 w-100 border-2" @click="login_()" ><i class="fa fa-check-circle" aria-hidden="true"></i><span style="margin-left:5px;"> ยืนยันตัวตน  </span></button>
                                                    </b-col>

                                                    <b-col class="align-self-center " sm=2></b-col>

                                                   </b-row>
                                                   
                              </div>
                              <!-- ========================================================================= -->
                              <div v-else>
                                <!-- ------------------------------------------------- --> 
                                      <div v-if="content_arr.length==0">
                                        <b-row class="w-100 text-center mt-2">
                                          <b-col><img :src="require('@/assets/docs.jpg')" style="width:100px;" /></b-col>
                                        </b-row>
                                        <b-row class="w-100 text-center mt-2 text-info">
                                           
                                          <b-col><b-badge variant="info"><span style="font-size:1.1em;">ยังไม่มีการบันทึกเอกสารลงในระบบ</span></b-badge></b-col>
                                          
                                        </b-row>
                                      </div>  
                                      <div v-for="(data, index) in content_arr" :key="index" >
                                           
                                          <div v-if="data.type == 'editor'" >

                                            <div v-for="(sub_data, sub_index) in data.content" :key="sub_index"  >

                                              <b-card v-for="(sub_data_lv1, sub_index_lv1) in sub_data.docs" :key="sub_index_lv1" 
                                                style="zoom:0.8;width:95%;"
                                                v-show="select_doc == sub_data.select_doc"
                                                :class=" sub_data_lv1.selected == true ? 'text-left border-3 border-success rounded-0 mb-1 box' : 'text-left border-3 border-left-0 border-right-0 border-top-0 rounded-0 mb-1 box'"
                                                @mouseover="fn_content_box_over( index, sub_index, sub_index_lv1 )"
                                              >
                                                <b-card-body v-if="sub_data_lv1.lock==false" style="padding:0;">
                                                  <b-card-text >
                                                    <vue-editor v-model="sub_data_lv1.editor_value" 
                                                      :editor-toolbar="customToolbar"
                                                      style="border:2px solid #b5b5b5;width:90%;"
                                                      @blur="fn_onEditorBlur( index, sub_index, sub_index_lv1 )" 
                                                    />

                                                    
                                                    <b-button pill variant="success" class="rightCircle-1" v-if="sub_data_lv1.selected == true" @click="fn_remove_content( index, sub_index, sub_index_lv1 )" 
                                                    :disabled="editor_lock">
                                                      <i class="fa fa-times" aria-hidden="true"></i>
                                                    </b-button>

                                                    <b-button pill variant="success" class="rightCircle" v-if="sub_data_lv1.selected == true" @click="sub_data_lv1.lock=true"
                                                    :disabled="editor_lock">
                                                      <i class="fa fa-undo fa-flip-horizontal" aria-hidden="true"></i>
                                                    </b-button>

                                                  </b-card-text>
                                                </b-card-body>

                                                <b-card-body v-if="sub_data_lv1.lock==true"  style="padding:0;">
                                                  <b-card-text>
                                                    
                                                    <div>
                                                      <i class="fa fa-comment" aria-hidden="true" style="float:left;margin-top:0.8em;margin-right:0.5em;"></i>
                                                      <div v-html="sub_data_lv1.editor_value"></div>
                                                    </div>

                                                    <b-button pill variant="success" class="rightCircle" v-if="sub_data_lv1.selected == true" @click="fn_edit_content( index, sub_index, sub_index_lv1 )"
                                                    :disabled="editor_lock">
                                                      <i class="fa fa-edit" aria-hidden="true"></i>
                                                    </b-button>

                                                  </b-card-text>
                                                </b-card-body>

                                              </b-card>

                                            </div> 

                                          </div>
                                          <!-- ------------------------------------------- -->
                                          <div v-if="data.type == 'file'" >
                                            <div v-for="(sub_data, sub_index) in data.content" :key="sub_index"  >

                                              <b-card v-for="(sub_data_lv1, sub_index_lv1) in sub_data.files" :key="sub_index_lv1" 
                                                v-show="select_doc == sub_data.select_doc"
                                                :class=" sub_data_lv1.selected == true  ? 'text-left border-3 border-success rounded-0 mb-1 box' : 'text-left border-3 border-left-0 border-right-0 border-top-0 rounded-0 mb-1 box'"
                                                @mouseover="fn_content_box_over( index, sub_index, sub_index_lv1 )"
                                                style="zoom:0.8;width:95%;"
                                              >
                                                <!-- @mouseleave="fn_onEditorBlur( index, sub_index, sub_index_lv1 )"  -->
                                                <div  v-if="sub_data_lv1.lock==true">
                                                    <i class="fa fa-paperclip" aria-hidden="true"></i> Attach file name : 
                                                    <span style="font-weight:bold;cursor:pointer;text-decoration: underline;text-decoration-style: double;"><a :href="sub_data_lv1.link">
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
                                                  <div class="card rounded-0 d-flex justify-content-center ddrop " style="height:5em;" @dragover="dragover" @dragleave="dragleave" @drop="drop" >
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
                                      <!-- ---------------------------------------------------------------------------- -->
                                      <hr v-if="editor_lock==false">

                                      <b-row style="zoom:0.9;" v-if="editor_lock==false">
                                        <b-col sm="1"></b-col>
                                        <b-col>
                                          <button class="  btn btn-outline-info rounded-0 w-100 border-2 "  disabled > 
                                                <i class="fa fa-plus" aria-hidden="true"></i><span style="margin-left:1em;"> ({{select_doc}}) ผู้ปฎิบัติ </span>
                                          </button> 
                                        </b-col>
                                          
                                        <b-col>
                                          <button class="  btn btn-outline-info rounded-0 w-100 border-2 " @click="fn_add_file()"  > 
                                                <i class="fa fa-paperclip" aria-hidden="true"></i><span style="margin-left:1em;"> ({{select_doc}}) แนบไฟล์ </span>
                                          </button> 
                                        </b-col>

                                        <b-col>
                                          <!-- <button class="  btn btn-outline-info rounded-0 w-100 border-2 "  @click="fn_add_editor()" > 
                                                <i class="fa fa-comment" aria-hidden="true"></i><span style="margin-left:1em;"> ({{select_doc}}) ข้อความ/อธิบาย </span>
                                          </button>  -->
                                        </b-col>
                                        <b-col sm="1"></b-col>
                                      </b-row>
                                <!-- ------------------------------------------------- -->
                            </div>
                          </div>
                           
                          </div>
                          <!-- -------------------------------------------------------------------------------------------------------------                   -->
                                               
                        </div>

                      </div>
                   </div>
                </div>
            </div>

             
            <div class="card bbtn border-primary border-2 mt-1 border-right-0 border-left-0 border-bottom-0 text-success rounded-0" style="margin-bottom:0.5em;height:10vh;justify-content: center;" >
            
              <b-row  class="mt-2 mr-1 ml-1">  
              <b-col cols="4">
                
                <button class="  btn btn-outline-danger rounded-0 w-100 border-2" @click="fn_process_close()" >
                  <i class="fas fa-running fa-flip-horizontal"></i><span style="margin-left:1em;"> Exit  </span>
                </button>

              </b-col>
              
              <b-col  cols="4"> </b-col>

              <b-col  cols="4" >

                <button class="  btn btn-outline-danger rounded-0 w-100 border-2" @click="ident=true;" v-if="editor_lock==true">
                  <i class="fas fa-lock fa-flip-horizontal"></i><span style="margin-left:1em;"> Editor Lock </span>
                </button>

                <button class="  btn btn-outline-primary rounded-0 w-100 border-2" @click="ident=false;editor_lock=true" v-if="editor_lock==false">
                  <i class="fa fa-edit"></i><span style="margin-left:1em;"> Ready to Edit </span>
                </button>
              
              </b-col>
              </b-row>

            </div>

        </div>

      </b-row>
          
    </main>

    <b-modal v-model="open_error" size="sm"  centered no-close-on-backdrop hide-header hide-header-close  title="Login"   >

            <div class="row text-center text-danger" style="margin-top:2em;"> 
              
                <span style=" font-size:4em;"><i class="fa fa-exclamation-triangle" ></i></span>
                <span style=" font-size:1em;margin-top:0.5em;"> Error, {{error_log}} </span>

              
            </div>

            <template v-slot:modal-footer="{ }"> 
              <div class="bbtn w-100">   
                <button class=" btn btn-outline-danger rounded-0 w-100 border-2" @click="open_error=false" >
                  <i class="fa fa-window-close"></i><span style="margin-left:1em;"> Exit  </span>
                </button>
              </div>
            </template>
    </b-modal>
    <!-- ------------------------------------------------------------------------------------------------------------------------------------------- -->
     
       
        <!-- ------------------------------------------------------------------------------------------------------------------------- -->
        <b-modal v-model="box_ok" size="sm"  centered no-close-on-backdrop hide-header hide-header-close  title="Login"  >
            <div class="row text-center text-success" style="margin-top:2em;"> 
              
                <span style=" font-size:4em;"><i class="far fa-check-circle" ></i></span>
                <span style=" font-size:1em;margin-top:0.5em;">Process-Complete</span>

              
            </div>

            <template v-slot:modal-footer="{ }"> 
                <b-button variant="success" @click="box_ok=false" style="" block class="rounded-0 ">
                    <i class="fa fa-window-close" aria-hidden="true"></i> Close
                </b-button>
            </template>
        </b-modal>

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

    </div> 
    <!-- ------------------------------------------------------------------------ -->

</template>



<script>

/* eslint-disable */


import moment from 'moment'
import Vue from 'vue'
 
const crypto = require('crypto') 

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'  
import { VueEditor, Quill } from "vue2-editor";

const { encrypt_js } = require('../../encrypt_modules_js');
const { server_publicKey } = require('../../server_publicKey');

import {socket_io} from '../../socket_io_modules'
 
import {server}  from '../../login_modules'

import { vueTopprogress } from 'vue-top-progress'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
import axios from 'axios'
import myConfig from '../../config.js'
  

export default {
  name: 'template',
  components: {
		vueTopprogress,
    VueEditor 
	},
  data() {
            return {  
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
               editor_lock : true,

               current_index : 0, 
               current_sub_index : 0, 
               current_sub_index_lv1 :0,

               current_trace_id : 0, 
               ident : false,

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

            let end_point = myConfig.server_domain+"/v1/progress/docs/upload_files"

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
                        vvv.link = myConfig.server_domain+"/v1/progress/docs/download_attach_file/"+file_name 

                        this.content_arr.splice( i, 1, v) 
  
                        let _content = {
                          trace_id : this.request_from.trace_id,
                          main_docs : this.main_doc_name,
                          content_arr : this.content_arr
                        }
                        this.$store.commit('set_SII_content', JSON.parse(JSON.stringify( _content )));
                        await this.fn_process_software_development( this.main_doc_name, JSON.parse(JSON.stringify( _content )) ) 

                        if( this.sub_doc_name_1.name == this.select_doc ){

                            this.sub_doc_name_1.file = parseInt( this.sub_doc_name_1.file ) + 1
                             

                        } 

                      } 

                    }) 

                  }) 

                }
              })

              // --------------------------------------------------------------------------

            })
            .catch((err) => {
            
              console.log(err);
            
            });

            


         },
        //  async download_attach_file( file_name ){

        //                 let end_point = myConfig.server_domain+"/v1/progress/docs/download_attach_file/"+file_name 

        //                 axios.get( end_point )
        //                 .then(response => { 
                             
        //                   //  console.log( response )  

        //                 }).catch( (e) => {
                                
        //                     console.log( e )   
        //                 })

        //  },
         async fn_onEditorBlur ( index, sub_index, sub_index_lv1 ){
             
            this.content_arr.forEach( async (v, i, a) => { 

              if(v.type=='editor'){

                v.content.forEach( async (vv, ii, aa) => { 

                  vv.docs.forEach( async (vvv, iii, aaa) => {

                    if( ( index == i) && ( sub_index == ii) && ( sub_index_lv1 == iii) ){

                      //  const hash = crypto.createHash('md5').update( Buffer.from( JSON.stringify( vv.editor_value ) ) ).digest('hex'); 
                      // vv.hash = hash
                      vvv.lock = true

                      this.content_arr.splice( i, 1, v) 

                      let _content = {
                        trace_id : this.request_from.trace_id,
                        main_docs : this.main_doc_name,
                        content_arr : this.content_arr
                      }
                      this.$store.commit('set_SII_content', JSON.parse(JSON.stringify( _content )));

                      await this.fn_process_software_development( this.main_doc_name, JSON.parse(JSON.stringify( _content )) )

                      if( this.sub_doc_name_1.name == this.select_doc ){

                          this.sub_doc_name_1.doc = parseInt( this.sub_doc_name_1.doc ) + 1

                      } 
 

                    } 

                  }) 

                })

               // this.content_arr.splice( i, 1, v)
              }else{

                v.content.forEach( async (vv, ii, aa) => { 

                  vv.files.forEach( async (vvv, iii, aaa) => {

                    if( ( index == i) && ( sub_index == ii) && ( sub_index_lv1 == iii) ){
 
                      vvv.lock = true

                      this.content_arr.splice( i, 1, v) 
                      
                      let _content = {
                        trace_id : this.request_from.trace_id,
                        main_docs : this.main_doc_name,
                        content_arr : this.content_arr
                      }
                      this.$store.commit('set_SII_content', JSON.parse(JSON.stringify( _content )));
                      await this.fn_process_software_development( this.main_doc_name, JSON.parse(JSON.stringify( _content )) )

                      if( this.sub_doc_name_1.name == this.select_doc ){

                          this.sub_doc_name_1.file = parseInt( this.sub_doc_name_1.file ) + 1

                      } 
                    } 

                  }) 

                })

                //this.content_arr.splice( i, 1, v)

              }

            })
          
           
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
              content : files_arr

            }

            
            this.content_arr.push( files_obj ) 

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
         fn_select_doc( doc_index, doc_name){

           this.select_doc = doc_index

         },
         fn_edit_content ( index, sub_index, sub_index_lv1 ){

            this.content_arr.forEach((v, i, a) => { 

              if(v.type=='editor'){

                v.content.forEach((vv, ii, aa) => { 

                  vv.docs.forEach((vvv, iii, aaa) => {

                    if( ( index == i) && ( sub_index == ii) && ( sub_index_lv1 == iii)  ){

                      vvv.lock = false

                    } 

                  }) 

                })

                this.content_arr.splice( i, 1, v)
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
         fn_remove_content ( index, sub_index, sub_index_lv1 ){
            
            let mark_delete = 0

            this.content_arr.forEach( async (v, i, a) => { 

              if(v.type=='editor'){

                v.content.forEach( async (vv, ii, aa) => { 

                  vv.docs.forEach( async (vvv, iii, aaa) => {

                    if( ( index == i) && ( sub_index == ii) && ( sub_index_lv1 == iii)  ){

                      // vv.docs.splice( iii, 1)
                      this.content_arr.splice( i, 1 )
                      
                      let _content = {
                        trace_id : this.request_from.trace_id,
                        main_docs : this.main_doc_name,
                        content_arr : this.content_arr
                      }
                      this.$store.commit('set_SII_content', JSON.parse(JSON.stringify( _content )));
                      await this.fn_process_software_development( this.main_doc_name, JSON.parse(JSON.stringify( _content )) )

                      if( this.sub_doc_name_1.name == this.select_doc ){

                          this.sub_doc_name_1.doc = parseInt( this.sub_doc_name_1.doc ) - 1

                      } 

                    } 

                  }) 

                })

                

              }else{

                  v.content.forEach( async (vv, ii, aa) => { 

                    vv.files.forEach( async (vvv, iii, aaa) => {

                      if( ( index == i) && ( sub_index == ii) && ( sub_index_lv1 == iii)  ){

                        // vv.files.splice( iii, 1)
                        this.content_arr.splice( i, 1 )
                        
                        let _content = {
                          trace_id : this.request_from.trace_id,
                          main_docs : this.main_doc_name,
                          content_arr : this.content_arr
                        }
                        this.$store.commit('set_SII_content', JSON.parse(JSON.stringify( _content )));
                        await this.fn_process_software_development( this.main_doc_name, JSON.parse(JSON.stringify( _content )) )

                        if( this.sub_doc_name_1.name == this.select_doc ){

                          this.sub_doc_name_1.file = parseInt( this.sub_doc_name_1.file ) - 1

                        } 

                      } 

                    }) 

                  })

                  

                }

            })
            
            
             
         }, 
         fn_content_box_over ( index, sub_index, sub_index_lv1 ){

           this.content_arr.forEach((v, i, a) => { 

              v.content.forEach((vv, ii, aa) => { 

                if(v.type=='editor'){
                  
                  vv.docs.forEach((vvv, iii, aaa) => {

                   if( ( index == i) && ( sub_index == ii) && ( sub_index_lv1 == iii) ){

                     vvv.selected = true

                     this.current_index = index
                     this.current_sub_index = sub_index
                     this.current_sub_index_lv1 = sub_index_lv1

                   }else{

                     vvv.selected = false

                   }

                  }) 

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
         fn_process_close (){

           this.$store.commit('set_open_sw_dev', false);

         },
            
         
         async login_(){

          // ----------------------------------------------------------------
          // TEST

          // this.editor_lock=false
          // this.ident = false

          // TEST
          // ----------------------------------------------------------------
          // ----------------------------------------------------------------

          
           if( this.user.length == 0 || this.pass.length == 0 ){

                this.open_error=true
                this.error_log = ['user-null','token-null']

           }else{
                  let d = await this.test_token_google_auth(this.user, this.pass)

                  if( d.result == 'Process-Complete' ){ 

                    this.editor_lock=false
                    this.ident = false

                  }else{

                      this.pass = ''
                      this.open_error=true
                      this.error_log = d.error 
                  }
                 

           }
           
 
         },
         async test_token_google_auth( username, password ){

          return new Promise((resolve, reject) => { 

                                
                                let end_point = myConfig.server_domain+"/v1/rtaf/authenticator/testToken/"+username+'/'+password
                                
                                this.$refs.topProgress.start()

                                axios.get( end_point )
                                .then(response => {

                                        this.$refs.topProgress.done()
                                        resolve( response.data )

                                }).catch(()=>{ 

                                  this.$refs.topProgress.done()
                                  reject() 
                                
                                })  

                        })

        },
        async post_docs_contents( token, trace_id, progress_step, progress_action, progress_reason, progress_date ){

                      return new Promise((resolve, reject) => { 

                                const config = {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                                let requestBody = {

                                    token : token,
                                    trace_id : trace_id,
                                    progress_step : progress_step,
                                    progress_action : progress_action,
                                    progress_reason : progress_reason,
                                    progress_date : progress_date, 

                                }
                              
                                const json = JSON.stringify(requestBody)
                                
                                let end_point = myConfig.server_domain+"/v1/progress/store/docs/contents"
                                
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
        async fn_process_software_development ( main_doc_name, _content ) {
 
           let token = localStorage.getItem('$swc-dashboard-token'); 
           let trace_id = this.request_from.trace_id
           
           let progress_step = 'Software_Development'
           let progress_action = main_doc_name
           let progress_reason = JSON.stringify( _content )

           let nowDate = new Date()
           let progress_date = nowDate.toISOString().split('T')[0] 

           this.progress_open = true 
           let c = await this.post_docs_contents( token, trace_id, progress_step, progress_action, progress_reason, progress_date )
           this.progress_open = false
           

         },
         
    
    },
    mounted() {

         
        this.user = localStorage.getItem('$swc-dashboard-user'); 
        this.token = localStorage.getItem('$swc-dashboard-token'); 

 
        // ---------------------------------------------------------------------------
        this.editor_lock = true
        this.ident = false
        
        let docs_arr = []
        let files_arr = []
        this.select_doc = this.sub_doc_name_1.name


        if( this.current_trace_id == this.SII_content.trace_id ){

            this.content_arr = this.SII_content.content_arr

            // =============================================================================
            // calc progress percent 

            this.content_arr.forEach((v, i, a) => { 

              v.content.forEach((vv, ii, aa) => { 

                if(v.type=='editor'){
                  
                  vv.docs.forEach((vvv, iii, aaa) => {
                    
                    if( this.sub_doc_name_1.name == vv.select_doc ){

                        this.sub_doc_name_1.doc = parseInt( this.sub_doc_name_1.doc ) + 1

                    }
                    
                    

                  }) 

                }else if(v.type=='file'){

                  vv.files.forEach((vvv, iii, aaa) => {
                     
                    if( this.sub_doc_name_1.name == vv.select_doc ){

                        this.sub_doc_name_1.file = parseInt( this.sub_doc_name_1.file ) + 1

                    }
                    
                    

                  }) 

                }
                 

              })

              
            })

            // =============================================================================

            

        }else{

          this.content_arr = []

        }
        

        
    },
    watch: {

         
        
    },
    computed: {

          request_from() { 
              
              let tmp = JSON.parse(JSON.stringify( this.$store.state.request_from )); 
              this.current_trace_id = tmp.trace_id
              return tmp
            
          },    
          btn_progress_action () {
              let tmp = JSON.parse(JSON.stringify( this.$store.state.request_from )); 
              
              if( tmp.progress_Open_Eject_Job!=null ){

                return tmp.progress_Open_Eject_Job.progress_action

              }else{

                return 'all'
              }
          },
          SII_content () {
              
              let tmp = JSON.parse(JSON.stringify( this.$store.state.SII_content )); 
              return tmp

          },
          SII_percent () {
              
              let tmp = JSON.parse(JSON.stringify( this.$store.state.SII_percent )); 
              return tmp

          }, 
          SRA_percent () {
              
              let tmp = JSON.parse(JSON.stringify( this.$store.state.SRA_percent )); 
              return tmp

          }, 
          SAD_percent () {
              
              let tmp = JSON.parse(JSON.stringify( this.$store.state.SAD_percent )); 
              return tmp

          }, 
          SC_percent () {
              
              let tmp = JSON.parse(JSON.stringify( this.$store.state.SC_percent )); 
              return tmp

          }, 
          SIT_percent () {
              
              let tmp = JSON.parse(JSON.stringify( this.$store.state.SIT_percent )); 
              return tmp

          }, 
          PD_percent () {
              
              let tmp = JSON.parse(JSON.stringify( this.$store.state.PD_percent )); 
              return tmp

          },
           
          progress_percent () {

            let sub_doc_name_1_percent = 0
             

           
            if( ( this.sub_doc_name_1.file > 0 ) && ( this.sub_doc_name_1.doc > 0 ) ){

              sub_doc_name_1_percent = 100

            }else if( ( this.sub_doc_name_1.file == 0 ) && ( this.sub_doc_name_1.doc > 0 ) ){

              sub_doc_name_1_percent = 50
              
            }else if( ( this.sub_doc_name_1.file > 0 ) && ( this.sub_doc_name_1.doc == 0 ) ){

              sub_doc_name_1_percent = 50
              
            }else if( ( this.sub_doc_name_1.file == 0 ) && ( this.sub_doc_name_1.doc == 0 ) ){

              sub_doc_name_1_percent = 0
              
            }
 
            
            let _percent = parseInt( sub_doc_name_1_percent )  
            this.$store.commit('set_SII_percent', _percent);

            return _percent  

          }

    },
    created() {
      
    },
    beforeDestroy() {

        this.editor_lock = true
        this.ident = false
        
        setTimeout(() => {

            this.socket.forEach((_socket) => {

                _socket.client_disconnect()

            })

        } , 100);

    },
    
    
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
    @import "../../../assets/style.css";

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
    width: 35%;
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
    border-left: 3px solid #1363DF;
    border-top: 3px solid #1363DF;
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