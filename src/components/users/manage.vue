<template>

    <div style="height:100vh;border:0px solid red;margin-top:0em;margin-left:0em;margin-right:0em;">
    <vue-topprogress ref="topProgress" color="#FF0000"></vue-topprogress>
    <div id="navbar">
        <b-row  >
        
            <nav class="nav-top" >       
            
                <a class="nav__link">
                    
                    
                    <span class="heading-page " style="font-size:1.5em;color:#FFFFFF"> Manage Users (Level {{admin_level}}) </span>

                </a>

            </nav>
        </b-row>
    </div>
    <!-- ------------------------------------------------------------------------ -->
    <main class="site-wrapper">
      
                <div  class="d-none d-xs-none d-sm-none d-lg-block d-lg-block d-xl-block d-md-block d-xxl-block d-xxl-block d-xxxl-none">
                   
                  <b-row class="text-right" v-if="tabs!=3">  
                    <b-col>
                      <b-form-input
                        id="filter-input"
                        v-model="filter"
                        type="search"
                        placeholder="search"
                        size="sm"
                        style="margin:1em;cursor:pointer;width:70%;float:right;margin-bottom:-1em;"
                        :disabled="currentPage>1"
                        @keyup.enter="search()"
                      ></b-form-input>
                    </b-col>
                     
                    <b-col>

                      <div style="z-index:99;margin:1em;float:right;margin-bottom:-1em;">   

                            <b-pagination
                            v-model="currentPage"
                            :total-rows="countDocuments"
                            :per-page="perPage"
                            align="center"
                            ></b-pagination>

                      </div> 
                    </b-col>
                    </b-row> 

                    <div >
              <!-- -------------------------------------------------------------------------------------------------------- -->
              <!-- dupicate -->

                        <b-table-simple bordered id="tblData" v-show="false">
                        <b-tr>
                            <b-th colspan="10">Export Customers All Zone</b-th>            
                        </b-tr>
                        <b-tr>
                            
                            <b-th >ลำดับ</b-th>
                            <b-th >username</b-th>     
                            <b-th >ชื่อ</b-th>                            
                            <b-th >รหัสลูกค้า</b-th>
                            <b-th >custumer ID</b-th>
                            <b-th >zone</b-th>
                            <b-th >email</b-th>
                            
                            
                            

                        </b-tr>
                         
                        <b-tr v-for="(value, key) in arr" :key="key">
                          
                            <b-td class="text-center">{{key+1}}</b-td>
                            <b-td class="text-center">{{value.username}}</b-td>
                            <b-td class="text-left">{{value.customer_name}}</b-td>
                            <b-td class="text-center">{{value.customer_no}}</b-td>
                            <b-td class="text-center">-</b-td>
                            <b-td class="text-center">{{value.zone}}</b-td>
                            <b-td class="text-center">{{value.customer_email}}</b-td>

                             
                             
                        </b-tr>
                        
                        </b-table-simple >

              </div>
              <!-- -------------------------------------------------------------------------------------------------------- -->

                    <div class="row text-center ml-1 mr-1" style="margin-top:1em;" v-if="tabs==0"> 
                        <div style="height:70vh;overflow:auto;">
                        <b-table
                            :items="arr"              
                            show-empty
                            small    
                            hover         
                            style=" cursor:pointer;font-size:0.9em;"     
                            :fields="fields"                              
                            @row-clicked="onRowClicked"
                            :tbody-tr-class="rowClass"

                            
                        > 
                        
                            <template #cell(selected)="data">
                            <i class="far fa-check-circle" v-if="data.value==true"></i>
                            <i class="far fa-circle" v-else></i>
                            </template>
                            
                            <template #cell(user_activate)="data">
                            <span :class="data.value==true ? 'text-' : 'text-danger'">{{data.value}}</span>
                            </template>
                            <template #cell(user_otp_enable)="data">
                            <span :class="data.value==true ? 'text-' : 'text-danger'">{{data.value}}</span>
                            </template>

                            <template #cell(username)="row">

                                    <span style="padding:3px;color:#0e2f44;" class="text-primary border-bottom-primary fw-bold selection_ele"  
                                      @click="username_info(row.item, row.index, $event.target)"
                                    > 
                                      {{row.item.username}}
                                    </span>
                                    
                                    <!-- <b-button block size="sm" @click="username_info(row.item, row.index, $event.target)" class="mr-1" 
                                      :variant="row.item.role == 'Admin' ? 'outline-primary fw-bold rounded-0' : 'outline-dark fw-bold rounded-0'" 
                                    >
                                       {{row.item.username}}
                                    </b-button> -->
                                    
                            </template>
                            

                        </b-table>
                        </div>
                        
                        
                    </div>

                    
                     

                </div> 

                
                <!-- -------------------------------------------------------------------------------------------- -->   
                <div class="d-block d-sm-block d-lg-none d-xl-none d-xxl-none">
                    <h3 class="text-danger">Display on Destop Only</h3>
                </div>           

               
    </main>

    <div class="footer">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <nav class="nav" style="height:80px;" >
        
        <router-link to="/users/admin" class="nav__link">
            <i class="material-icons nav__icon" >arrow_back</i>
            <span class="nav__text">Go Back</span>
            
        </router-link>

        
        <a class="nav__link" @click="tabs=0"> 
           <i :class="tabs == 0 ? 'material-icons nav__icon nav__link--active' : 'material-icons nav__icon'" >people_alt</i>
           <span :class="tabs == 0 ? 'nav__text text-danger font-weight-bold' : 'nav__text'">All Users</span>
        </a>

        

        <!-- <a class="nav__link" @click="exportTableToExcel()">
            <i  class="material-icons nav__icon" >file_download</i>
            <span class="nav__text">Export data</span>
        </a> -->

        
        <router-link to="/" class="nav__link">
            <i class="material-icons nav__icon" >logout</i>
            <span class="nav__text">Logout</span>
        </router-link>

       
        </nav>
    </div>

    <!-- --------------------------------------------------------------------------------------------------------------------- -->

        
    <b-modal v-model="data_open" size="xl"  centered no-close-on-backdrop hide-header hide-header-close  title="info" 
       
      
    >
        
      <b-row>

        <div class="col-xl-12 col-sm-12w col-12">
          <b-row class="w-100 text-center" style="margin-left:1px;">  
            <b-col></b-col>
            <b-col><h5 class="text-dark"><u>ข้อมูลผู้ใช้งาน</u></h5></b-col>
            <b-col></b-col>
          </b-row>

            <div class="card rounded-0 mt-1" style="margin-bottom:0.5em;border:2px solid #474A8A;" >
                <div class="card-content">
                   <div class="card-body">
                      <div class="media d-flex" >

                        
                                        <div class="align-self-center">
                                             
                                            <!-- <i class="fa fa-user-circle fa-6x text-dark"></i> -->
                                            <img  v-bind:src="picture_path" :alt="username" style="max-width:200px;">
                                        </div>
                                        
                                        <div class="media-body text-left ml-3 align-self-center" style="">

                                          <b-row align-v="center" >
                            
                                            <b-col  sm="2">
                                              <span class=" text-dark" style="float:right;font-size:0.9em;"><span class="text-dark font-weight-bold p-1">User</span> : </span> 
                                            </b-col>
                                            <b-col  sm="4">
                                              <span style="padding:5px;" class="text-dark border-bottom-success  ">{{username}}</span>
                                            </b-col>

                                            <!-- <b-col  sm="2" >                                             
                                              <span class=" text-dark" style="float:right;"><span class="text-dark font-weight-bold p-1">Activate</span> : </span>
                                            </b-col>
                                            <b-col  sm="4" :hidden="current_select_user_id=='0'">
                                              <span style="padding:5px;" 
                                                :class="user_activate==true ? 'text-success border-success' : 'text-danger border-danger'" >{{user_activate}}</span>
                                                
                                                <i class="fa fa-edit ml-1 icon_edit" style="cursor:pointer;" @click="update_user_activate( user_activate )"></i>
                                            </b-col> -->

                                            <b-col  sm="2">
                                              <span class=" text-dark" style="float:right;font-size:0.9em;"><span class="text-dark font-weight-bold p-1">ID</span> : </span> 
                                            </b-col>
                                            <b-col  sm="4">
                                                                                      
                                              <span style="padding:5px;" class="  text-dark border-bottom-success  ">{{registration_id}}</span>
                                              
                                            </b-col>

                                          </b-row>
                                          <!-- ----------------------------------------- -->
                                          <b-row align-v="center"  class="mt-1">
                            
                                            <b-col  sm="2">
                                              <span class=" text-dark" style="float:right;font-size:0.9em;"><span class="text-dark font-weight-bold p-1">Email</span> : </span> 
                                            </b-col>
                                            <b-col  sm="4">
                                                                                      
                                              <span style="padding:5px;" class="text-dark border-bottom-success  ">{{user_email}}</span>
                                            </b-col>

                                            <b-col  sm="2" >                                             
                                              <span class=" text-dark" style="float:right;font-size:0.9em;"><span class="text-dark font-weight-bold p-1">Activate</span> : </span>
                                            </b-col>
                                            <b-col  sm="4" :hidden="current_select_user_id=='0'">
                                              <span style="padding:5px;" 
                                                :class="user_activate==true ? 'text-success border-success' : 'text-danger border-danger'" >{{user_activate}}</span>
                                                
                                                <i class="fa fa-edit ml-1 icon_edit" style="cursor:pointer;" @click="update_user_activate( user_activate )"></i>
                                            </b-col>

                                            

                                          </b-row>

                                          <!-- <hr/> -->
                                          <p class="fake-legend"><span>User Info</span></p>

                                          <b-row align-v="center" >
                            
                                            <b-col  sm="2">
                                              <span class=" text-dark " style="float:right;"><span class="text-dark font-weight-bold p-1">Name</span> : </span> 
                                            </b-col>
                                            <b-col  sm="10">
                                                                                      
                                              <span style="padding:5px;" class="  text-dark border-bottom-success ">{{user_name}}</span>
                                               
                                            </b-col>

                                            


                                          </b-row>

                                          <!-- --------------------------------------- -->

                                          <b-row align-v="center" >
                            
                                            <b-col  sm="2">
                                              <span class=" text-dark" style="float:right;"><span class="text-dark font-weight-bold p-1">Position</span> : </span> 
                                            </b-col>
                                            <b-col  sm="10">                                                                                      
                                              <span class="  text-dark border-bottom-success " style="font-size:0.9em;padding:5px;">{{user_position}}</span>
                                              <!-- <i class="fa fa-edit ml-1 icon_edit" style="cursor:pointer;" @click="update_user_info('user_position')"></i> -->
                                            </b-col>

                                            

                                          </b-row>
                                          <b-row align-v="center" >
                                            <b-col  sm="2">                                             
                                              <span class=" text-dark" style="float:right;"><span class="text-dark font-weight-bold p-1">Unit</span> : </span>
                                            </b-col>
                                            <b-col  sm="10">
                                              <span style="padding:5px;" class="text-dark border-bottom-success  ">{{unitname}}</span>
                                              <!-- <i class="fa fa-edit ml-1 icon_edit" style="cursor:pointer;" @click="update_user_info('unitname')"></i> -->
                                               
                                            </b-col>

                                          </b-row>

                                          <!-- <hr> -->

                                          <p class="fake-legend"><span>OTP</span></p>
                                           

                                          <b-row align-v="center" >
                            
                                            <!-- <b-col  sm="2">
                                              <span class=" text-dark" style="float:right;font-size:0.9em;"><span class="text-dark font-weight-bold p-1">ID</span> : </span> 
                                            </b-col>
                                            <b-col  sm="4">
                                                                                      
                                              <span style="padding:5px;" class="  text-dark border-bottom-success  ">{{registration_id}}</span>
                                              
                                            </b-col> -->

                                            

                                            <b-col  sm="2">                                             
                                              <span class=" text-dark" style="float:right;font-size:0.9em;"><span class="text-dark font-weight-bold p-1">Enable</span> : </span>
                                            </b-col>
                                            <b-col  sm="4" >
                                              <span style="padding:5px;" 
                                                :hidden="current_select_user_id=='0'"
                                                :class="user_otp_enable==true ? 'text-success border-success' : 'text-danger border-danger'" >{{user_otp_enable}}</span>
                                                
                                                <i class="fa fa-edit ml-1 icon_edit" style="cursor:pointer;" @click="update_user_otp_enable( user_otp_enable )"
                                                :hidden="current_select_user_id=='0'" 
                                                ></i>
                                            </b-col>

                                            <b-col  sm="2">
                                              <span class=" text-dark" style="float:right;font-size:0.9em;"><span class="text-dark font-weight-bold p-1">Limit</span> : </span> 
                                            </b-col>
                                            <b-col  sm="4" :hidden="current_select_user_id=='0'">
                                                                                      
                                               
                                              <b-form-input class="rounded-0" style="cursor:pointer;padding-top:0em;padding-bottom:0em;height:2.2em;width:6.5em;font-size:0.9em;text-align:right;" 
                                                    type="number" v-model="user_otp_limit" ></b-form-input>

                                            </b-col>

                                          </b-row>

                                          <!-- <b-row align-v="center" class="mt-1" >
                            
                                            <b-col  sm="2">
                                              <span class=" text-dark" style="float:right;font-size:0.9em;"><span class="text-dark font-weight-bold p-1">OTP Limit</span> : </span> 
                                            </b-col>
                                            <b-col  sm="10" :hidden="current_select_user_id=='0'">
                                                                                      
                                               
                                              <b-form-input class="rounded-0" style="cursor:pointer;padding-top:0em;padding-bottom:0em;height:2.2em;width:6.5em;font-size:0.9em;text-align:right;" 
                                                    type="number" v-model="user_otp_limit" ></b-form-input>

                                            </b-col>
 

                                          </b-row> -->

                                          <!-- <hr/> -->
                                          <p class="fake-legend"><span>Public key</span></p>

                                          <b-row align-v="center" >
                            
                                            <b-col  sm="2">
                                              <span class=" text-dark" style="float:right;font-size:0.9em;"><span class="text-dark font-weight-bold p-1">PK</span> : </span> 
                                            </b-col>
                                            <b-col  sm="10" >
                                                                                      
                                              <span style="padding:5px;" class="  text-dark border-bottom-success  ">{{encryptPublic_key}}</span>
                                               
                                            </b-col>

                                          </b-row>
                                          <b-row align-v="center" >
                            
                                            
                                            <b-col  sm="2">
                                              <span class=" text-dark" style="float:right;font-size:0.9em;"><span class="text-dark font-weight-bold p-1">Version</span> : </span> 
                                            </b-col>
                                            <b-col  sm="10" > 

                                              <span style="padding:5px;" class="  text-dark border-bottom-success  ">{{versionPublic_key}}</span>
                                               
                                            </b-col>
 

                                          </b-row>

                                          <!-- <b-row align-v="center" >
                            
                                            <b-col  sm="2">
                                              <span class=" text-dark" style="float:right;"><span class="text-dark font-weight-bold p-1">Cus ID</span> : </span> 
                                            </b-col>
                                            <b-col  sm="4">
                                                                                      
                                              <span style="padding:5px;" class="  text-dark border-bottom-success  ">{{customer_no}}</span>
                                              <i class="fa fa-edit ml-1 icon_edit" style="cursor:pointer;" @click="update_user_info('customer_no')"></i>
                                            </b-col>

                                            

                                            <b-col  sm="3">                                             
                                              <span class=" text-dark" style="float:right;"><span class="text-dark font-weight-bold p-1">Cus Zone</span> : </span>
                                            </b-col>
                                            <b-col  sm="3" >
                                              <b-form-input class="rounded-0" style="cursor:pointer;padding-top:0em;padding-bottom:0em;height:2.2em;width:5em;" 
                                                    type="number" v-model="user_zone" ></b-form-input>
                                              
                                               
                                            </b-col>

                                          </b-row>

                                          <hr/>

                                          <b-row align-v="center" >

                                            <b-col  sm="2">                                             
                                              <span class=" text-dark" style="float:right;"><span class="text-dark font-weight-bold p-1">Cus Email</span> : </span>
                                            </b-col>
                                            <b-col  sm="4">
                                              <span style="padding:5px;" class="text-dark border-bottom-success  ">{{user_email}}</span>
                                              <i class="fa fa-edit ml-1 icon_edit" style="cursor:pointer;" @click="update_user_info('user_email')"></i>
                                               
                                            </b-col>

                                            <b-col  sm="3">
                                              <span class=" text-dark" style="float:right;"><span class="text-dark font-weight-bold p-1">Cus Line Code</span> : </span> 
                                            </b-col>
                                            <b-col  sm="3">
                                                                                      
                                              <span style="padding:5px;" class="text-dark border-bottom-success  ">{{line_activate_code_show}}</span>
                                              <i class="fa fa-edit ml-1 icon_edit" style="cursor:pointer;" @click="update_user_info('line_activate_code')"></i>
                                               
                                            </b-col>

                                            

                                             
                                          </b-row> -->

                                        
                                               
                                        </div>

                      </div>
                   </div>
                </div>
            </div>
        </div>

      </b-row>

      <template v-slot:modal-footer="{ }">  
        <b-row  class="w-100" style="margin-bottom:1em;">  
          <b-col cols="5">
            <b-button @click="force_client_change_public_key()" style="color:#FFFFFF;background-color:#194a8d !important;" block class="rounded-0"
              :hidden="current_select_user_id=='0'"
             >
                <i class="fa fa-key" aria-hidden="true"></i> <span style="font-size:1em;">Force Client to Change Public key at Next Verify</span>
            </b-button>
          </b-col>
           
          <b-col  cols="2">
            <!-- <b-button variant="danger" @click="delete_user()" style=" " block class="rounded-0"
            :hidden="user_activate==true">
                <i class="fa fa-trash" aria-hidden="true"></i> Delete User
            </b-button> -->
            <b-button @click="view_user_hris()" style="color:#FFFFFF;background-color:#ba2060 !important;" block class="rounded-0"
                                               
            >
               <i class="fa fa-user" aria-hidden="true"></i> <span style="font-size:1em;">HRIS</span>
            </b-button>
          </b-col>
          <b-col  cols="2"></b-col>
          <b-col  cols="3">
            <b-button variant="dark" @click="data_open=false" style=" " block class="rounded-0">
                <i class="fa fa-window-close" aria-hidden="true"></i> Close
            </b-button>
          </b-col>
        </b-row>
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
 

     <b-modal v-model="regiter_ok" size="sm"  centered no-close-on-backdrop hide-header hide-header-close  title="Login" 
           
        
        >
            <div class="row text-center text-success" style="margin-top:2em;"> 
              
                <span style=" font-size:4em;"><i class="far fa-check-circle" ></i></span>
                <span style=" font-size:1em;margin-top:0.5em;"> User Register Complate </span>

              
            </div>

            <template v-slot:modal-footer="{ }"> 
                <b-button variant="success" @click="regiter_ok=false" style="" block class="rounded-0 ">
                    <i class="fa fa-window-close" aria-hidden="true"></i> Close
                </b-button>
            </template>
        </b-modal>

        <b-modal v-model="logs_error" size="sm"  centered no-close-on-backdrop hide-header hide-header-close  title="Login" >
            <div class="row text-center text-danger" style="margin-top:2em;"> 
              
                <span style=" font-size:4em;"><i class="fa fa-exclamation-triangle" ></i></span>
                <span style=" font-size:1em;margin-top:0.5em;"> Error, {{logs_error_messages}} </span>

              
            </div>

            <template v-slot:modal-footer="{ }"> 
                <b-button variant="danger" @click="logs_error=false" style="" block class="rounded-0 ">
                    <i class="fa fa-window-close" aria-hidden="true"></i> Close
                </b-button>
            </template>
        </b-modal>

         

        <b-modal v-model="process_ok" size="sm"  centered no-close-on-backdrop hide-header hide-header-close  title="Login" 
           
        
        >
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

        <b-modal v-model="login_error" size="sm"  centered no-close-on-backdrop hide-header hide-header-close  title="Login" 
            
        
        >
            <div class="row text-center text-danger" style="margin-top:2em;"> 
              
                <span style=" font-size:4em;"><i class="fa fa-exclamation-triangle" ></i></span>
                <span style=" font-size:1em;margin-top:0.5em;"> Error, {{error_log}} </span>

              
            </div>

            <template v-slot:modal-footer="{ }"> 
                <b-button variant="danger" @click="login_error=false" block class="rounded-0 ">
                    <i class="fa fa-window-close" aria-hidden="true"></i> Close
                </b-button>
            </template>
        </b-modal>

        <b-modal v-model="view_hris_open" size="lg" centered no-close-on-backdrop hide-header hide-header-close  scrollable title="Login" 
            
        
        >
            <div class="row text-center text-danger" style="margin-top:2em;"> 
              
                <b-table fixed responsive small stacked :items="hris_items"  ></b-table>
              
            </div>

            <template v-slot:modal-footer="{ }"> 
                
                <b-row  class="w-100" style="margin-bottom:1em;">  
                  <b-col cols="8">
                     
                  </b-col>
                   
                  <b-col  cols="4">
                    <b-button variant="danger" @click="view_hris_open=false" block class="rounded-0 ">
                        <i class="fa fa-window-close" aria-hidden="true"></i> Close
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


import { vueTopprogress } from 'vue-top-progress'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
import axios from 'axios'
import myConfig from '../config.js'

export default {
  name: 'calendar',
  components: {
		vueTopprogress
	},
  data() {
            return {    
                view_hris_open:false,
                hris_items:[],
                current_pass:'', 
                change_user_email_open:false,
                unitname:0,
                user_position_edit_open:false,
                unitname_edit_open:false,
                user_position:'',
                tabs:0,
                filter:'' ,
                progress_open:false,
                user_name_edit_open:false,
                customer_no_edit_open:false,
                selection_data:'',
                arr_zone:[],
                fields: [ 
                          { key: 'selected', label: '' , class: 'text-left' , thStyle: {width: '3% !important'}  , sortable: false }, 
                          { key: 'index', label: 'Order' , class: 'text-left' , thStyle: {width: '3% !important'} , sortable: false  }, 
                          
                          { key: 'user', label: 'User' , class: 'text-left' , thStyle: {width: '15% !important'} , sortable: false  },
                          { key: 'name', label: 'name' , class: 'text-left' , thStyle: {width: '20% !important'} , sortable: false  },

                          { key: 'unitname', label: 'unit' , class: 'text-left' , thStyle: {width: '10% !important'} , sortable: false  }, 

                          
                          { key: 'user_activate', label: 'activate' , class: 'text-left' , thStyle: {width: '5% !important'}, sortable: true },
                          { key: 'user_otp_enable', label: 'otp_enable' , class: 'text-left' , thStyle: {width: '5% !important'}, sortable: true },
                          { key: 'user_otp_limit', label: 'otp_limit' , class: 'text-left' , thStyle: {width: '10% !important'}, sortable: true },

                          { key: 'created', label: 'created' , class: 'text-left' , thStyle: {width: '15% !important'}, sortable: true },
                          // { key: 'user_last_login', label: 'login' , class: 'text-left' , thStyle: {width: '10% !important'}, sortable: true },

                          
                        ], 
                loading:false,
                filelist: [],
                arr:[],
                arr_splice:[],
                header:[],
                step:0,
                startRow: 0,
                rowsPerPage: 8,
                current_index:0,
                today:null,
                csv_row:0,
                data_open:false,
                arr_data:[],
                fields_data: [ 
                          { key: 'selected', label: '' , thStyle: {width: '3% !important'}  }, 
                          { key: 'index', label: 'Order' , thStyle: {width: '3% !important'}  }, 
                          
                          { key: 'username', label: 'User' , class: 'text-center' , thStyle: {width: '20% !important'} },

                          { key: 'user_code', label: 'User code' , class: 'text-center' , thStyle: {width: '20% !important'} },

                          { key: 'customer_name', label: 'Name' , class: 'text-center' , thStyle: {width: '30% !important'} },
                          { key: 'customer_no', label: 'Cus_ID' , class: 'text-center' , thStyle: {width: '15% !important'} },
                          
                          // { key: 'customer_email', label: 'Email' , class: 'text-center' , thStyle: {width: '20% !important'} },

                          { key: 'role', label: 'Role' , class: 'text-center' , thStyle: {width: '15% !important'} },
                          { key: 'activate', label: 'Act' , class: 'text-center' , thStyle: {width: '15% !important'} },
                                                

                        ], 
                headerBgVariant: 'dark',
                headerTextVariant: 'dark',
                bodyBgVariant: 'dark',
                bodyTextVariant: 'light',
                footerBgVariant: 'dark',
                footerTextVariant: 'dark',
                selection_month:'',
                token:'0',
                user_name:'',
                user_email:'',
                user_zone:'',
                user_role:'',
                username:'',
                confirm_pass:'',
                pass:'',
                user_activate:'',
                customer_no:'',
                customer_zone:0,
                customer_name:'',
                customer_email:'',
                line_activate_code:"0000000",
                user_code:'AA00000',
                options:[
                  { value:'Admin', text:'Admin'},
                  { value:'Customer', text:'Customer'}
                ],
                admin_level : '0',

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
                countDocuments:0,
                error_log:'',
                picture_path:'',
                current_select_user_id:'0',
                current_select_user_hris_id:'0',
                versionPublic_key : '0',
                user_otp_enable:false, 
                user_otp_limit:0,
                dont_go_home:false,
               
            }
              
    },
        
    
    methods: {
              
              exportTableToExcel( ){
                    var downloadLink;
                    var dataType = 'application/vnd.ms-excel';
                    var tableSelect = document.getElementById("tblData");
                    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
                    
                    

                    let filename = 'export_customers_all_zone.xls'
                    
                    // Create download link element
                    downloadLink = document.createElement("a");
                    
                    document.body.appendChild(downloadLink);
                    
                    if(navigator.msSaveOrOpenBlob){
                        var blob = new Blob(['\ufeff', tableHTML], {
                            type: dataType
                        });
                        navigator.msSaveOrOpenBlob( blob, filename);
                    }else{
                        // Create a link to the file
                        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
                    
                        // Setting the file name
                        downloadLink.download = filename;
                        
                        //triggering the function
                        downloadLink.click();
                    }
              },
              
              rowClass(item, type) {
                if (!item || type !== 'row') return
                if (item.selected === true) return 'table-light'
                
              },
               
              
               
              update_user_info_ : async function( obj,find_address=false ) {

                    
                    return new Promise((resolve, reject) => {

                              const config = {
                                  headers: {
                                      'Content-Type': 'application/json'
                                  }
                              }
                              let requestBody = {                                
                                  
                                  token : this.token,
                                  user_data : obj,
                                  find_address : find_address,

                              }
                            
                              const json = JSON.stringify(requestBody)                       
                          
                              
                              let end_point = myConfig.server_domain+"/v1/users/update/info"
                              
                              this.$refs.topProgress.start()
                              this.progress_open =true

                              axios.post( end_point, json, config )
                              .then(response => {

                                      this.$refs.topProgress.done()
                                      this.progress_open = false
                                      // ====================================================================
                                      resolve( response.data )

                              }).catch(()=>{ reject() })  

                      })

              },
              delete_user_ : async function( ) {

                    
                    return new Promise((resolve, reject) => {

                              const config = {
                                  headers: {
                                      'Content-Type': 'application/json'
                                  }
                              }
                              let requestBody = {                                
                                  
                                  token : this.token,
                                  username : this.username

                              }
                            
                              const json = JSON.stringify(requestBody)                       
                          
                              
                              let end_point = myConfig.server_domain+"/v1/users/delete"
                              
                              this.$refs.topProgress.start()
                              this.progress_open =true

                              axios.post( end_point, json, config )
                              .then(response => {

                                      this.$refs.topProgress.done()
                                      this.progress_open = false
                                      // ====================================================================
                                      resolve( response.data )

                              }).catch(()=>{ reject() })  

                      })

              },
              select_customers_bill(value){

               
                

              },
              username_info (item, index, event) {

                  // console.log( item, index, event )
                  this.arr.forEach( (v, i, a) => {

                   
                    if( v.user === item.user ){
                      v.selected = true
                    }else{
                      v.selected = false
                    }

                    this.arr.splice(i , 1 , v)

                  })
                
                  // this.username = item.username
                  // this.user_name = item.customer_name
                  // this.user_email = item.customer_email
                  // this.customer_no = item.customer_no
                  // this.user_activate = item.activate
                  // this.line_activate_code = item.line_activate_code == undefined ? '0000000' : item.line_activate_code
                  // this.user_code = item.user_code == undefined ? '0000000' : item.user_code

                  // this.user_zone = item.zone
                  // this.user_role = item.role

                  // this.user_position = item.customer_address == undefined ? '' : item.customer_address
                  // this.unitname = item.unitname == undefined ? '' : item.unitname

                  // setTimeout(() => { this.data_open=true; }, 200);

              },
              view_user_hris : async function( ) {

                this.token = localStorage.getItem('$admin-otp-token') == null ? '0' : localStorage.getItem('$admin-otp-token')
                let _id = this.current_select_user_hris_id 
                 
                 
                this.progress_open=true

                let d = await this.view_user_hris_(this.token, _id)

                // console.log( d )

                this.progress_open=false
                
                if( d.result == 'Process-Complete' ){

                  console.log( d.data )
                  this.hris_items=[ d.data ]
                  this.view_hris_open=true

                  // this.arr.forEach( (v, i, a) => {
                    
                  //     if( v._id === _id ){
                  //       v.selected = true
                  //       v.user_activate = user_activate
                  //       this.user_activate = user_activate
                  //     }else{
                  //       v.selected = false
                  //     }

                  //     this.arr.splice(i , 1 , v)

                  // })

                }else{

                    this.error_log = d.error  
                    this.login_error=true
                    this.dont_go_home=true

                }

              },
              update_user_activate : async function( activate ) {

                this.token = localStorage.getItem('$admin-otp-token') == null ? '0' : localStorage.getItem('$admin-otp-token')
                let user_activate = !activate
                let _id = this.current_select_user_id

                // console.log( user_activate, _id )
                this.progress_open=true

                let d = await this.update_user_activate_(this.token, _id, user_activate)

                // console.log( d )

                this.progress_open=false
                
                if( d.result == 'Process-Complete' ){

                  this.arr.forEach( (v, i, a) => {
                    
                      if( v._id === _id ){
                        v.selected = true
                        v.user_activate = user_activate
                        this.user_activate = user_activate
                      }else{
                        v.selected = false
                      }

                      this.arr.splice(i , 1 , v)

                  })

                }else{

                    this.error_log = d.error  
                    this.login_error=true
                    this.dont_go_home=true

                }

              },
              update_user_otp_limit : async function( ) {

                this.token = localStorage.getItem('$admin-otp-token') == null ? '0' : localStorage.getItem('$admin-otp-token')
                let user_otp_limit = this.user_otp_limit
                let _id = this.current_select_user_id

                // console.log( user_otp_limit, _id )

                this.progress_open=true

                let d = await this.update_user_otp_limit_(this.token, _id, user_otp_limit)

                this.progress_open=false
                
                if( d.result == 'Process-Complete' ){

                  this.arr.forEach( (v, i, a) => {
                    
                      if( v._id === _id ){
                        v.selected = true
                        v.user_otp_limit = kFormatter( Number( user_otp_limit ) , 4 )
                         
                      }else{
                        v.selected = false
                      }

                      this.arr.splice(i , 1 , v)

                  })

                }else{

                    this.error_log = d.error  
                    this.login_error=true
                    this.dont_go_home=true

                }

              },
              update_user_otp_enable : async function( enable ) {

                this.token = localStorage.getItem('$admin-otp-token') == null ? '0' : localStorage.getItem('$admin-otp-token')
                let user_otp_enable = !enable
                let _id = this.current_select_user_id

                this.progress_open=true

                let d = await this.update_user_otp_enable_(this.token, _id, user_otp_enable)

                // console.log( d )

                this.progress_open=false
                
                if( d.result == 'Process-Complete' ){

                  this.arr.forEach( (v, i, a) => {
                    
                      if( v._id === _id ){
                        v.selected = true
                        v.user_otp_enable = user_otp_enable
                        this.user_otp_enable = user_otp_enable
                      }else{
                        v.selected = false
                      }

                      this.arr.splice(i , 1 , v)

                  })

                }else{

                    this.error_log = d.error  
                    this.login_error=true
                    this.dont_go_home=true

                }

              },
              onRowClicked : async function(item, index, event) {

                console.log(item)
                this.arr.forEach( (v, i, a) => {
                this.current_select_user_id = '0'   
                this.current_select_user_hris_id = item._hris_id  
                 
                  if( v.user === item.user ){
                    v.selected = true
                  }else{
                    v.selected = false
                  }

                  this.arr.splice(i , 1 , v)

                })


                          this.username = ''
                          this.user_email = ''
                          this.user_activate = ''

                          this.user_name = ''
                          this.user_position = ''
                          this.unitname = ''
                          this.picture_path = ''

                          this.encryptPublic_key = ''
                          this.user_otp_limit = 0
                          this.user_otp_enable = ''
                          this.registration_id = ''
                          this.versionPublic_key = '0'
                
                  this.token = localStorage.getItem('$admin-otp-token') == null ? '0' : localStorage.getItem('$admin-otp-token')

                  this.progress_open=true


                  if( item._id == '' ){

                       
                      let d = await this.get_users_name( this.token, item._hris_id )

                      this.progress_open=false

                      // console.log( d.data )
                    
                      if( d.result == 'Process-Complete' ){

                        if( d.data.length > 0 ){

                          this.username = d.data[0].user
                          this.user_email = d.data[0].email
                          this.user_activate = d.data[0].user_activate

                          this.user_name = d.data[0].name
                          this.user_position = d.data[0].position
                          this.unitname = d.data[0].unitname
                          this.picture_path = d.data[0].picture_path

                          this.encryptPublic_key = d.data[0].encryptPublic_key
                          this.user_otp_limit = parseInt(d.data[0].user_otp_limit)
                          this.user_otp_enable = d.data[0].user_otp_enable
                          this.versionPublic_key = d.data[0].versionPublic_key

                          try{  

                             if( d.data[0].registration_id.length == 13){
                              
                              this.registration_id = d.data[0].registration_id[0]+'-'+d.data[0].registration_id[1]+d.data[0].registration_id[2]+'-'+d.data[0].registration_id[3]+d.data[0].registration_id[4]+d.data[0].registration_id[5]+'-'+d.data[0].registration_id[6]+d.data[0].registration_id[7]+d.data[0].registration_id[8]+'-'+d.data[0].registration_id[9]+d.data[0].registration_id[10]+d.data[0].registration_id[11]+d.data[0].registration_id[12]

                            }

                          }catch(e){
                            this.registration_id = d.data[0].registration_id
                          }
                          
                          setTimeout(() => { this.data_open=true; }, 200);

                        }
                        
                        
                      }else{

                          this.error_log = d.error  
                          this.login_error=true
                          this.dont_go_home=true

                      }

                  }else{

                      let d = await this.get_users_id( this.token, item._id )
                      this.current_select_user_id = item._id 

                      this.progress_open=false

                      // console.log( d.data )
                    
                      if( d.result == 'Process-Complete' ){

                        if( d.data.length > 0 ){

                          this.username = d.data[0].user
                          this.user_email = d.data[0].email
                          this.user_activate = d.data[0].user_activate

                          this.user_name = d.data[0].name
                          this.user_position = d.data[0].position
                          this.unitname = d.data[0].unitname
                          this.picture_path = d.data[0].picture_path

                          this.encryptPublic_key = d.data[0].encryptPublic_key
                          this.user_otp_limit = parseInt(d.data[0].user_otp_limit)
                          this.user_otp_enable = d.data[0].user_otp_enable

                          this.versionPublic_key = d.data[0].versionPublic_key

                          try{  

                            if( d.data[0].registration_id.length == 13){
                              
                              this.registration_id = d.data[0].registration_id[0]+'-'+d.data[0].registration_id[1]+d.data[0].registration_id[2]+'-'+d.data[0].registration_id[3]+d.data[0].registration_id[4]+d.data[0].registration_id[5]+'-'+d.data[0].registration_id[6]+d.data[0].registration_id[7]+d.data[0].registration_id[8]+'-'+d.data[0].registration_id[9]+d.data[0].registration_id[10]+d.data[0].registration_id[11]+d.data[0].registration_id[12]

                            }
                            
                          }catch(e){
                            this.registration_id = d.data[0].registration_id
                          }
                          
                          setTimeout(() => { this.data_open=true; }, 200);

                        }
                        
                        
                      }else{

                          this.error_log = d.error  
                          this.login_error=true
                          this.dont_go_home=true

                      }

                  }
                   

              },
              sub_onRowClicked(item, index, event) {

                // console.log(item)
                this.arr_data.forEach( (v, i, a) => {

                //   if( index === i ){
                  if( v.user_code === item.user_code ){
                    v.selected = true
                  }else{
                    v.selected = false
                  }

                  this.arr_data.splice(i , 1 , v)

                })
                

              },
              async search(){
                  
                  // console.log( this.filter )
                  if( this.filter.length == 0 ){
 
                          
                    this.list_users()
                     

                  }else{

                      this.arr=[]
                      this.arr_zone=[]
                      this.token = localStorage.getItem('$admin-otp-token') == null ? '0' : localStorage.getItem('$admin-otp-token')

                      

                      this.currentPage = 1

                      
                      if(/^[a-zA-Z_]{2,}$/.test( this.filter ) == true ){  // username

                        this.progress_open=true
                        
                        
                        let d_count = await this.get_users_by_username_countDocuments( this.token, this.filter )

                        // console.log( d_count )

                        this.progress_open=false
                    
                        if( d_count.result == 'Process-Complete' ){
    
                            this.countDocuments = Number(d_count.data)

                            this.progress_open=true

                            let u = await this.get_users_by_username( this.token, this.filter , this.currentPage, this.perPage )    
                            
                             

                            this.progress_open=false
                          
                            if( u.result == 'Process-Complete' ){

                              
                              this.currentPage = 1
                              
                                for(let i=0;i<u.data.length;i++){

                                    let obj = JSON.parse(JSON.stringify( u.data[i] ))
                                    obj.selected = false
                                    obj.name = u.data[i].rank+u.data[i].fname+" "+u.data[i].lname
                                    obj.created = u.data[i].created.split('T')[0]

                                    if( u.data[i].user_otp_limit != '' ){
                                      obj.user_otp_limit = kFormatter( Number( u.data[i].user_otp_limit ) , 4 )
                                    }
                                    


                                    let dd =  u.data[i].user_last_login.split('T')[0]
                                    let date1 = new Date( dd );
                                    let date2 = new Date();

                                    let difference = date2.getTime() - date1.getTime();
                                    let days = Math.ceil(difference / (1000 * 3600 * 24));

                                    obj.user_last_login = days

                                    obj.index = i+this.currentPage

                                    this.arr.push(obj)
            
                                }


                            }

                        }
                        
                        

                      }else if(/^(?=.*?[A-Z].*?[A-Z])(?=.*?[0-9].*?[0-9])[A-Z0-9]{13}$/.test( this.filter ) == true ){ // 7RH0616678850

                        this.progress_open=true

                        let u = await this.get_users_by_registration_id( this.token, this.filter )

                                          
                        this.countDocuments = 1

                        this.progress_open=false
                      
                        if( u.result == 'Process-Complete' ){

                          
                            
                          
                            for(let i=0;i<u.data.length;i++){

                                let obj = JSON.parse(JSON.stringify( u.data[i] ))
                                obj.selected = false
                                obj.name = u.data[i].rank+u.data[i].fname+" "+u.data[i].lname
                                obj.created = u.data[i].created.split('T')[0]
                                obj.user_otp_limit == '' ? '' :  kFormatter( Number( u.data[i].user_otp_limit ) , 4 )


                                let dd =  u.data[i].user_last_login.split('T')[0]
                                let date1 = new Date( dd );
                                let date2 = new Date();

                                let difference = date2.getTime() - date1.getTime();
                                let days = Math.ceil(difference / (1000 * 3600 * 24));

                                obj.user_last_login = days

                                obj.index = i+this.currentPage

                                this.arr.push(obj)
        
                            }


                        }

                      }else{

                        let str = this.filter.trim().split(' ')
                        this.progress_open=true
                        
                        
                        let d_count = await this.get_users_by_name_countDocuments( this.token, str[0], str[1] )

                        // console.log( d_count )

                        this.progress_open=false
                    
                        if( d_count.result == 'Process-Complete' ){
    
                            this.countDocuments = Number(d_count.data)

                            this.progress_open=true

                            let u = await this.get_users_by_name( this.token, str[0], str[1] , this.currentPage, this.perPage )    
                            
                             

                            this.progress_open=false
                          
                            if( u.result == 'Process-Complete' ){

                              
                              this.currentPage = 1
                              
                                for(let i=0;i<u.data.length;i++){

                                    let obj = JSON.parse(JSON.stringify( u.data[i] ))
                                    obj.selected = false
                                    obj.name = u.data[i].rank+u.data[i].fname+" "+u.data[i].lname
                                    obj.created = u.data[i].created.split('T')[0]

                                    if( u.data[i].user_otp_limit != '' ){
                                      obj.user_otp_limit = kFormatter( Number( u.data[i].user_otp_limit ) , 4 )
                                    }
                                    


                                    let dd =  u.data[i].user_last_login.split('T')[0]
                                    let date1 = new Date( dd );
                                    let date2 = new Date();

                                    let difference = date2.getTime() - date1.getTime();
                                    let days = Math.ceil(difference / (1000 * 3600 * 24));

                                    obj.user_last_login = days

                                    obj.index = i+this.currentPage

                                    this.arr.push(obj)
            
                                }


                            }

                        }

                      }

                  }
                  

                   
                  

              },
              async next_search_users(){

                      this.arr=[]
                      this.arr_zone=[]
                      this.token = localStorage.getItem('$admin-otp-token') == null ? '0' : localStorage.getItem('$admin-otp-token')

                      if(/^[a-zA-Z_]{2,}$/.test( this.filter ) == true ){  // username

                        this.progress_open=true
                        
                        
                        let d_count = await this.get_users_by_username_countDocuments( this.token, this.filter )

                        // console.log( d_count )

                        this.progress_open=false
                    
                        if( d_count.result == 'Process-Complete' ){
    
                            this.countDocuments = Number(d_count.data)

                            this.progress_open=true

                            let u = await this.get_users_by_username( this.token, this.filter , this.currentPage, this.perPage )    
                            
                             

                            this.progress_open=false
                          
                            if( u.result == 'Process-Complete' ){

                              
                                for(let i=0;i<u.data.length;i++){

                                    let obj = JSON.parse(JSON.stringify( u.data[i] ))
                                    obj.selected = false
                                    obj.name = u.data[i].rank+u.data[i].fname+" "+u.data[i].lname
                                    obj.created = u.data[i].created.split('T')[0]

                                    if( u.data[i].user_otp_limit != '' ){
                                      obj.user_otp_limit = kFormatter( Number( u.data[i].user_otp_limit ) , 4 )
                                    }
                                    


                                    let dd =  u.data[i].user_last_login.split('T')[0]
                                    let date1 = new Date( dd );
                                    let date2 = new Date();

                                    let difference = date2.getTime() - date1.getTime();
                                    let days = Math.ceil(difference / (1000 * 3600 * 24));

                                    obj.user_last_login = days

                                      if( this.currentPage == 1 ){

                                        obj.index = i+  ( (Number( this.currentPage )-1)* Number(this.perPage) )+1

                                      }else{

                                        obj.index = i+  ( (Number( this.currentPage )-1)* Number(this.perPage) )

                                      }

                                    this.arr.push(obj)
            
                                }


                            }

                        }
                        
                        

                      }else{

                              let str = this.filter.trim().split(' ')
                              this.progress_open=true

                              let u = await this.get_users_by_name( this.token, str[0], str[1] , this.currentPage, this.perPage  )                         

                              this.progress_open=false
                            
                              if( u.result == 'Process-Complete' ){

                                
                                
                                
                                  for(let i=0;i<u.data.length;i++){

                                      let obj = JSON.parse(JSON.stringify( u.data[i] ))
                                      obj.selected = false
                                      obj.name = u.data[i].rank+u.data[i].fname+" "+u.data[i].lname
                                      obj.created = u.data[i].created.split('T')[0]

                                      if( u.data[i].user_otp_limit != '' ){
                                            obj.user_otp_limit = kFormatter( Number( u.data[i].user_otp_limit ) , 4 )
                                          }


                                      let dd =  u.data[i].user_last_login.split('T')[0]
                                      let date1 = new Date( dd );
                                      let date2 = new Date();

                                      let difference = date2.getTime() - date1.getTime();
                                      let days = Math.ceil(difference / (1000 * 3600 * 24));

                                      obj.user_last_login = days

                                      if( this.currentPage == 1 ){

                                        obj.index = i+  ( (Number( this.currentPage )-1)* Number(this.perPage) )+1

                                      }else{

                                        obj.index = i+  ( (Number( this.currentPage )-1)* Number(this.perPage) )

                                      }

                                      this.arr.push(obj)
              
                                  }


                              }

                      }
 


              },
              async list_users(){

                  this.arr=[]
                  this.arr_zone=[]
                  this.token = localStorage.getItem('$admin-otp-token') == null ? '0' : localStorage.getItem('$admin-otp-token')

                  this.progress_open=true

                  let d = await this.get_users_countDocuments( this.token )

                  this.progress_open=false
                
                  if( d.result == 'Process-Complete' ){

                     
                    this.countDocuments = Number(d.data)

                    this.currentPage = 1
                    let u = await this.get_all_users( this.token, this.currentPage, this.perPage )
                     
                      for(let i=0;i<u.data.length;i++){

                          let obj = JSON.parse(JSON.stringify( u.data[i] ))
                          obj.selected = false
                          obj.name = u.data[i].rank+u.data[i].fname+" "+u.data[i].lname
                          obj.created = u.data[i].created.split('T')[0]
                          obj.user_otp_limit = kFormatter( Number( u.data[i].user_otp_limit ) , 4 )


                          let dd =  u.data[i].user_last_login.split('T')[0]
                          let date1 = new Date( dd );
                          let date2 = new Date();

                          let difference = date2.getTime() - date1.getTime();
                          let days = Math.ceil(difference / (1000 * 3600 * 24));

                          obj.user_last_login = days

                          obj.index = i+this.currentPage

                          this.arr.push(obj)
  
                      }


                  }else{

                      this.error_log = d.error  
                      this.login_error=true
                      this.dont_go_home=true

                  }
                  
                  

            },
            async next_list_users( ){

                    this.arr=[]
                    this.arr_zone=[]
                    this.token = localStorage.getItem('$admin-otp-token') == null ? '0' : localStorage.getItem('$admin-otp-token')
    
                     
                    this.progress_open=true 
                    let u = await this.get_all_users( this.token, this.currentPage, this.perPage )
                    
                    this.progress_open=false

                    if( u.result == 'Process-Complete' ){

                      for(let i=0;i<u.data.length;i++){

                          let obj = JSON.parse(JSON.stringify( u.data[i] ))
                          obj.selected = false
                          obj.name = u.data[i].rank+u.data[i].fname+" "+u.data[i].lname
                          obj.created = u.data[i].created.split('T')[0]
                          obj.user_otp_limit = kFormatter( Number( u.data[i].user_otp_limit ) , 4 )

                          let dd =  u.data[i].user_last_login.split('T')[0]
                          let date1 = new Date( dd );
                          let date2 = new Date();

                          let difference = date2.getTime() - date1.getTime();
                          let days = Math.ceil(difference / (1000 * 3600 * 24));

                          obj.user_last_login = days
                          
                          if( this.currentPage == 1 ){

                            obj.index = i+  ( (Number( this.currentPage )-1)* Number(this.perPage) )+1

                          }else{

                            obj.index = i+  ( (Number( this.currentPage )-1)* Number(this.perPage) )

                          }
                          

                          this.arr.push(obj)
  
                      }

                    }


                  
                  
                  

            },
            async user_verify(){  
                this.progress_open=true
                this.token = localStorage.getItem('$admin-otp-token') == null ? '0' : localStorage.getItem('$admin-otp-token')
                let d = await this.verify_user_by_token( this.token )

                this.progress_open=false
                
                if( d.result == 'Process-Complete' ){

                    this.admin_level = d.data.level

                    if( d.data.role != 'ADMIN'){

                        this.error_log = 'Role-Mismatch'    
                        this.login_error=true
                        this.user_has_login=false
                        this.dont_go_home=false
                         

                    }else{

                      this.list_users()

                    }

                }else{

                    this.error_log = d.error    
                    this.login_error=true
                    this.user_has_login=false
                    this.dont_go_home=false
                    
                    
                }

            },
            update_user_otp_limit_ : async function( token, _id, user_otp_limit ) {


                        return new Promise((resolve, reject) => {

                                

                                const config = {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                                let requestBody = {                                
                                    
                                    "token" : token,
                                    "_id" : _id,
                                    "user_otp_limit" : user_otp_limit
                                    
                                }
                              
                                const json = JSON.stringify(requestBody) 
                                
                                let end_point = myConfig.server_domain+"/v1/admin/users/otp/limit"
                                
                                this.$refs.topProgress.start()

                                axios.post( end_point, json, config )
                                .then(response => {

                                        this.$refs.topProgress.done()
                                        // ====================================================================
                                        resolve( response.data )

                                }).catch(()=>{ reject() })  

                        })
                                
                              

            },
            update_user_otp_enable_  : async function( token, _id, enable ) {


                        return new Promise((resolve, reject) => {

                                

                                const config = {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                                let requestBody = {                                
                                    
                                    "token" : token,
                                    "_id" : _id,
                                    "enable" : enable
                                    
                                }
                              
                                const json = JSON.stringify(requestBody) 
                                
                                let end_point = myConfig.server_domain+"/v1/admin/users/otp/enable"
                                
                                this.$refs.topProgress.start()

                                axios.post( end_point, json, config )
                                .then(response => {

                                        this.$refs.topProgress.done()
                                        // ====================================================================
                                        resolve( response.data )

                                }).catch(()=>{ reject() })  

                        })
                                
                              

            },
            view_user_hris_  : async function( token, _id ) {


                        return new Promise((resolve, reject) => {

                                

                                const config = {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                                let requestBody = {                                
                                    
                                    "token" : token,
                                    "_id" : _id                                     
                                }
                              
                                const json = JSON.stringify(requestBody) 
                                
                                let end_point = myConfig.server_domain+"/v1/admin/users/hris"
                                
                                this.$refs.topProgress.start()

                                axios.post( end_point, json, config )
                                .then(response => {

                                        this.$refs.topProgress.done()
                                        // ====================================================================
                                        resolve( response.data )

                                }).catch(()=>{ reject() })  

                        })
                                
                              

            },
            update_user_activate_  : async function( token, _id, activate ) {


                        return new Promise((resolve, reject) => {

                                

                                const config = {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                                let requestBody = {                                
                                    
                                    "token" : token,
                                    "_id" : _id,
                                    "activate" : activate
                                    
                                }
                              
                                const json = JSON.stringify(requestBody) 
                                
                                let end_point = myConfig.server_domain+"/v1/admin/users/activate"
                                
                                this.$refs.topProgress.start()

                                axios.post( end_point, json, config )
                                .then(response => {

                                        this.$refs.topProgress.done()
                                        // ====================================================================
                                        resolve( response.data )

                                }).catch(()=>{ reject() })  

                        })
                                
                              

            },
            get_users_name  : async function( token, hris_id ) {


                        return new Promise((resolve, reject) => {

                                

                                const config = {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                                let requestBody = {                                
                                    
                                    "token" : token,
                                    "_id" : hris_id
                                    
                                }
                              
                                const json = JSON.stringify(requestBody) 
                                
                                let end_point = "https://otp.rtaf.mi.th/api/v1/admin/users/username"
                                
                                this.$refs.topProgress.start()

                                axios.post( end_point, json, config )
                                .then(response => {

                                        this.$refs.topProgress.done()
                                        // ====================================================================
                                        resolve( response.data )

                                }).catch(()=>{ reject() })  

                        })
                                
                              

            },
            get_users_id : async function( token, _id ) {


                        return new Promise((resolve, reject) => {

                                

                                const config = {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                                let requestBody = {                                
                                    
                                    "token" : token,
                                    "_id" : _id
                                    
                                }
                              
                                const json = JSON.stringify(requestBody) 
                                
                                let end_point = "https://otp.rtaf.mi.th/api/v1/admin/users/_id"
                                
                                this.$refs.topProgress.start()

                                axios.post( end_point, json, config )
                                .then(response => {

                                        this.$refs.topProgress.done()
                                        // ====================================================================
                                        resolve( response.data )

                                }).catch(()=>{ reject() })  

                        })
                                
                              

            },
            get_users_countDocuments : async function( token ) {


                        return new Promise((resolve, reject) => {

                                

                                const config = {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                                let requestBody = {                                
                                    
                                    "token" : token
                                    
                                }
                              
                                const json = JSON.stringify(requestBody) 
                                
                                let end_point = myConfig.server_domain+"/v1/admin/users/countDocuments"
                                
                                this.$refs.topProgress.start()

                                axios.post( end_point, json, config )
                                .then(response => {

                                        this.$refs.topProgress.done()
                                        // ====================================================================
                                        resolve( response.data )

                                }).catch(()=>{ reject() })  

                        })
                                
                              

            },
            verify_user_by_token : async function( token ) {


                        return new Promise((resolve, reject) => {

                                

                                const config = {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                                let requestBody = {                                
                                    
                                    "token" : token
                                    
                                }
                              
                                const json = JSON.stringify(requestBody) 
                                
                                let end_point = myConfig.server_domain+"/v1/admin/login/verify/token"
                                
                                this.$refs.topProgress.start()

                                axios.post( end_point, json, config )
                                .then(response => {

                                        this.$refs.topProgress.done()
                                        // ====================================================================
                                        resolve( response.data )

                                }).catch(()=>{ reject() })  

                        })
                                
                              

            },
            get_all_users : async function( token, currentPage, perPage ) {


                    return new Promise((resolve, reject) => {

                            const config = {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                            let requestBody = {                                
                                
                                token : token,
                                page : currentPage,
                                page_size : perPage,

                            }
                            
                            const json = JSON.stringify(requestBody)                       
                        
                            
                            // let end_point = myConfig.server_domain+"/admin/users/list"
                            let end_point = "https://otp.rtaf.mi.th/api/v1/admin/users/list"
                            
                            this.$refs.topProgress.start()
                            this.progress_open=true

                            axios.post( end_point, json, config )
                            .then(response => {

                                    this.$refs.topProgress.done()
                                    this.progress_open=false
                                    // ====================================================================
                                    resolve( response.data )

                            }).catch(()=>{ reject() })  

                    })

            },
            
            get_users_by_registration_id : async function( token, registration_id ) {


                    return new Promise((resolve, reject) => {

                            const config = {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                            let requestBody = {                                
                                
                                token : token,
                                registration_id : registration_id 
                            }
                            
                            const json = JSON.stringify(requestBody)                       
                        
                            
                            let end_point = myConfig.server_domain+"/v1/admin/users/search/registration_id"
                             
                            
                            this.$refs.topProgress.start()
                            this.progress_open=true

                            axios.post( end_point, json, config )
                            .then(response => {

                                    this.$refs.topProgress.done()
                                    this.progress_open=false
                                    // ====================================================================
                                    resolve( response.data )

                            }).catch(()=>{ reject() })  

                    })

            },
            get_users_by_username_countDocuments : async function( token, username ) {


                        return new Promise((resolve, reject) => {

                                

                                const config = {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                                let requestBody = {                                
                                    
                                    token : token,
                                    username : username
                                    
                                }
                              
                                const json = JSON.stringify(requestBody) 
                                
                                 
                                let end_point = myConfig.server_domain+"/v1/admin/users/search/username/countDocuments"
                                
                                this.$refs.topProgress.start()

                                axios.post( end_point, json, config )
                                .then(response => {

                                        this.$refs.topProgress.done()
                                        // ====================================================================
                                        resolve( response.data )

                                }).catch(()=>{ reject() })  

                        })
                                
                              

            },
            get_users_by_username : async function( token, username, currentPage, perPage ) {


                    return new Promise((resolve, reject) => {

                            const config = {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                            let requestBody = {                                
                                
                                token : token,
                                username : username,
                                page : currentPage,
                                page_size : perPage,

                            }
                            
                            const json = JSON.stringify(requestBody)                       
                        
                            
                            let end_point = myConfig.server_domain+"/v1/admin/users/search/username"
                             
                            
                            this.$refs.topProgress.start()
                            this.progress_open=true

                            axios.post( end_point, json, config )
                            .then(response => {

                                    this.$refs.topProgress.done()
                                    this.progress_open=false
                                    // ====================================================================
                                    resolve( response.data )

                            }).catch(()=>{ reject() })  

                    })

            },
            get_users_by_name_countDocuments : async function( token, fname, lname ) {


                        return new Promise((resolve, reject) => {

                                

                                const config = {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                                let requestBody = {                                
                                    
                                    token : token,
                                    fname : fname,
                                    lname : lname,
                                    
                                }
                              
                                const json = JSON.stringify(requestBody) 
                                
                                 
                                let end_point = myConfig.server_domain+"/v1/admin/users/search/countDocuments"
                                
                                this.$refs.topProgress.start()

                                axios.post( end_point, json, config )
                                .then(response => {

                                        this.$refs.topProgress.done()
                                        // ====================================================================
                                        resolve( response.data )

                                }).catch(()=>{ reject() })  

                        })
                                
                              

            },
            get_users_by_name : async function( token, fname, lname , currentPage, perPage ) {


                    return new Promise((resolve, reject) => {

                            const config = {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                            let requestBody = {                                
                                
                                token : token,
                                fname : fname,
                                lname : lname,
                                page : currentPage,
                                page_size : perPage,

                            }
                            
                            const json = JSON.stringify(requestBody)                       
                        
                            
                            let end_point = myConfig.server_domain+"/v1/admin/users/search"
                             
                            
                            this.$refs.topProgress.start()
                            this.progress_open=true

                            axios.post( end_point, json, config )
                            .then(response => {

                                    this.$refs.topProgress.done()
                                    this.progress_open=false
                                    // ====================================================================
                                    resolve( response.data )

                            }).catch(()=>{ reject() })  

                    })

            },
            
          
           
    
    },
    mounted() {

        
        this.$refs.topProgress.start()

        setTimeout(() => { this.$refs.topProgress.done() }, 1000);
        
        this.loading=false
        
        this.user_verify()
        
        
        
        
    },
    watch: {
       
      user_otp_limit () {
        
        if( this.data_open == true ){

          if( this.user_otp_limit=='' ){ this.user_otp_limit = '0' }
          this.update_user_otp_limit()

        }
      },
      tabs(){
        if(this.tabs == 3){

            this.username=''
            this.pass=''
            this.confirm_pass=''
            this.customer_email=''
            this.customer_name=''
            this.customer_no=''
            this.customer_zone='0'
            this.customer_address = ''
            this.unitname = ''
        }
      },

      login_error () {
            if(this.login_error == false ){

              if( this.dont_go_home == false ){

                this.$router.push('/')
                
              }
                
            }
      },
      user_has_login  () {
            if(this.user_has_login == false ){

                this.$router.push('/')

            }
      },
      currentPage () {

         if(this.filter.length>0){

            
            this.next_search_users( )
             

          }else{
            
             
            this.next_list_users( )
            

          }

        // if( this.currentPage > 1 ){

        //   if(this.filter.length>0){

            
        //     this.next_search_users( )
             

        //   }else{
            
             
        //     this.next_list_users( )
            

        //   }
        
        // }else if( this.currentPage == 1 ){

        //   if(this.filter.length>0){

            
        //     this.search( )
             

        //   }else{
            
             
        //     this.list_users( )
            

        //   }
        
        // } 
        
        

      },
     

    },
    computed: {

            line_activate_code_show () {

              return this.line_activate_code[0]+' '+this.line_activate_code[1]+this.line_activate_code[2]+this.line_activate_code[3]+' '+this.line_activate_code[4]+this.line_activate_code[5]+this.line_activate_code[6]
            },
            user_code_show () {

              return this.user_code[0]+this.user_code[1]+' '+this.user_code[2]+this.user_code[3]+this.user_code[4]+this.user_code[5]+this.user_code[6]
            },
            customer_no_validate () {

            
                return this.customer_no.length > 2 ? true : false

            },
            customer_name_validate () {

            
                return this.customer_name.length > 0 ? true : false

            },
            
            customer_email_validate () {

            
                return validateEmail(this.customer_email)
            },
            username_validate () {
                
                return this.username.length > 3 ? true : false
            },
            user_pass_validate () {
                
                if( ( this.confirm_pass.length > 3 ) && ( this.pass.length > 3 ) && ( this.confirm_pass == this.pass ) ){
                    return true
                }else{
                    return false
                }
            },
            new_email_validate () {

                return validateEmail(this.user_email)
            },

            customer_address_validate () {
                // console.log( 'customer_address' , this.customer_address )
                if( ( this.customer_address != null ) && ( this.customer_address != undefined ) ){
                  return this.customer_address.length > 1 ? true : false
                }else{
                  return false
                }
                
            },

            unitname_validate () {
                // console.log( 'unitname' , this.unitname )
                if( ( this.unitname != null ) && ( this.unitname != undefined ) ){
                  return this.unitname.length > 1 ? true : false
                }else{
                  return false
                }
            },

            current_pass_validate () {

                if( ( this.current_pass.length > 3 ) ){
                    return true
                }else{
                    return false
                }

            },
            new_pass_validate () {

                if( ( this.new_pass.length > 3 ) ){
                    return true
                }else{
                    return false
                }

            },
            confirm_pass_validate () {

                if( ( this.confirm_pass.length > 3 ) ){
                    return true
                }else{
                    return false
                }

            },
            pass_validate () {

                if( ( this.current_pass.length > 3 ) && ( this.new_pass.length > 3 ) && ( this.confirm_pass.length > 3 ) && ( this.confirm_pass == this.new_pass ) ){
                    return true
                }else{
                    return false
                }

            }
            

    },
    created() {
      
    },
    
    
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