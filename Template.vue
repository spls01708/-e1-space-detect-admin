<template>

    <div style="height:100vh;border:0px solid red;margin-top:0em;margin-left:0em;margin-right:0em;">
    <vue-topprogress ref="topProgress" color="#FF0000"></vue-topprogress>
    <div id="navbar">
        <b-row  >
        
            <nav class="nav-top" >       
            
                <a class="nav__link">
                    
                    
                    <span class="heading-page " style="font-size:1.5em;color:#FFFFFF"> Administrative </span>

                </a>

            </nav>
        </b-row>
    </div>
    <!-- ------------------------------------------------------------------------ -->
    <main class="site-wrapper">
        <div class="pt-table desktop-768" >
            <div class="pt-tablecell page-home relative"  >
                <!-- <div class="page-title  home text-center" style="">

                    <span class="heading-page " style="font-size:1.5em;"> Administrative </span>
                                            
                </div> -->

                <div class="pt-tablecell page-home relative" >                

                <div class="d-none d-xs-none d-sm-none d-lg-block d-lg-block d-xl-block d-md-block d-xxl-none">
                   
                    <div class="hexagon-menu clear">

                                            
                                            

                    </div> 

                </div> 

                <!-- -------------------------------------------------------------------------------------------- -->
                <div class="d-none d-xs-none d-sm-none d-lg-none d-lg-none d-xl-none d-md-none d-xxl-block">
                    xxxx2
                </div>  


                <!-- -------------------------------------------------------------------------------------------- -->   
                <div class="d-block d-sm-block d-lg-none d-xl-none d-xxl-none">
                    <h3 class="text-danger">Display on Destop Only</h3>
                </div>           

                                
                </div>
            </div>
        </div>
    </main>

    <div class="footer">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <nav class="nav" style="height:80px;" >
        
        <router-link to="/users/customers" class="nav__link">
            <i class="material-icons nav__icon" >vpn_key</i>
            <span class="nav__text">Change Password</span>
            
        </router-link>

        <router-link to="/customers/invoice" class="nav__link">
            <i class="material-icons nav__icon" >manage_accounts</i>
            <span class="nav__text">Manage Users</span>
        </router-link>        
        
        <router-link to="/users/customers/password" class="nav__link"> 
           <i class="material-icons nav__icon" >file_upload</i>
           <span class="nav__text">Upload Invoice</span>
        </router-link>

        <router-link to="/users/customers/email" class="nav__link">
            <i class="material-icons nav__icon" >mark_email_unread</i>
            <span class="nav__text">Customers E-mail</span>
        </router-link>

        <router-link to="/users/customers/email" class="nav__link">
            <i class="material-icons nav__icon" >qr_code_2</i>
            <span class="nav__text">Customers Invoice</span>
        </router-link>

        <router-link to="/" class="nav__link">
            <i class="material-icons nav__icon" >logout</i>
            <span class="nav__text">Logout</span>
        </router-link>

       
        </nav>
    </div>

    <!-- --------------------------------------------------------------------------------------------------------------------- -->

        <b-modal v-model="login_error" size="sm"  centered no-close-on-backdrop hide-header hide-header-close  title="Login" 
            :header-bg-variant="headerBgVariant"
            :header-text-variant="headerTextVariant"
            :body-bg-variant="bodyBgVariant"
            :body-text-variant="bodyTextVariant"
            :footer-bg-variant="footerBgVariant"
            :footer-text-variant="footerTextVariant"
        
        >
            <div class="row text-center" style="margin-top:2em;"> 
              
                <span style="color:#FFFFFF;font-size:4em;"><i class="fa fa-exclamation-triangle" ></i></span>
                <span style="color:#FFFFFF;font-size:1em;margin-top:0.5em;"> Error, {{error_log}} </span>

              
            </div>

            <template v-slot:modal-footer="{ }"> 
                <b-button variant="danger" @click="login_error=false" style="margin-right:1em;" class="rounded-0 ">
                    <i class="fa fa-window-close" aria-hidden="true"></i> Exit
                </b-button>
            </template>
        </b-modal>

        <b-modal v-model="change_user_pass_open" size="l"  centered no-close-on-backdrop hide-header hide-header-close  title="Login" 
            :header-bg-variant="headerBgVariant"
            :header-text-variant="headerTextVariant"
            :body-bg-variant="bodyBgVariant"
            :body-text-variant="bodyTextVariant"
            :footer-bg-variant="footerBgVariant"
            :footer-text-variant="footerTextVariant"
        
        >

        
            <b-row class="text-center w-100" >
                
                <b-col>
                <h5 style="color:#FFFFFF;">Change User Password</h5>
                </b-col>

            </b-row>

            <b-row class="mt-2" align-v="center" >
                <b-col  sm="4">
                
                <span class="d-lg-none d-xl-none">Current pass : </span>
                <span class="d-none d-lg-block d-xl-block" style="float:right;">Current pass : </span>
                
                </b-col>
                <b-col  sm="8">
                
                <b-form-input
                    id="filter-input"
                    v-model="current_pass"
                    type="password"
                    placeholder=""
                    
                    style="color:#FFFFFF;background-color:#000000;cursor:pointer;"
                    :state="current_pass_validate"
                ></b-form-input>

                </b-col>

            </b-row>

            <hr/>

            <b-row class="mt-2" align-v="center" >
                
                <b-col  sm="4">
                
                <span class="d-lg-none d-xl-none">New pass  : </span>
                <span class="d-none d-lg-block d-xl-block" style="float:right;">New pass  : </span>
                
                </b-col>
                <b-col  sm="8">
                <b-form-input
                    id="filter-input"
                    v-model="new_pass"
                    type="password"
                    placeholder=""
                    
                    style="color:#FFFFFF;background-color:#000000;cursor:pointer;"
                    
                    :state="new_pass_validate && pass_validate"
                ></b-form-input>

                </b-col>

            </b-row>

            <b-row class="mt-2" align-v="center" >
                
                <b-col  sm="4">
                
                <span class="d-lg-none d-xl-none">Confirm pass : </span>
                <span class="d-none d-lg-block d-xl-block" style="float:right;">Confirm pass : </span>
                
                </b-col>
                <b-col  sm="8">
                <b-form-input
                    id="filter-input"
                    v-model="confirm_pass"
                    type="password"
                    placeholder=""
                    
                    style="color:#FFFFFF;background-color:#000000;cursor:pointer;"
                    
                    :state="confirm_pass_validate && pass_validate"
                ></b-form-input>

                </b-col>

            </b-row>

            

            <template v-slot:modal-footer="{ }">  
                <b-button variant="success" @click="change_user_pass_()" style="margin-right:1em;" class="rounded-0 "
                :disabled="pass_validate==false"
                >
                    <i class="fa fa-check" aria-hidden="true"></i> Change pass
                </b-button>

                <b-button variant="danger" @click="change_user_pass_open=false" style="margin-right:1em;" class="rounded-0 ">
                    <i class="fa fa-window-close" aria-hidden="true"></i> Exit
                </b-button>
            </template>
        </b-modal>

        <b-modal v-model="process_ok" size="sm"  centered no-close-on-backdrop hide-header hide-header-close  title="Login" 
            :header-bg-variant="headerBgVariant"
            :header-text-variant="headerTextVariant"
            :body-bg-variant="bodyBgVariant"
            :body-text-variant="bodyTextVariant"
            :footer-bg-variant="footerBgVariant"
            :footer-text-variant="footerTextVariant"
        
        >
            <div class="row text-center" style="margin-top:2em;"> 
              
                <span style="color:#FFFFFF;font-size:4em;"><i class="far fa-check-circle" ></i></span>
                <span style="color:#FFFFFF;font-size:1em;margin-top:0.5em;"> Process Complate </span>

              
            </div>

            <template v-slot:modal-footer="{ }"> 
                <b-button variant="danger" @click="process_ok=false" style="margin-right:1em;" class="rounded-0 ">
                    <i class="fa fa-window-close" aria-hidden="true"></i> Exit
                </b-button>
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
                change_user_pass_open:false,
                process_ok:false,
                confirm_pass:'',
                new_pass:'',
                current_pass:'',
                loading:false,
                user_has_login:false,
                login_open:false,
                headerBgVariant: 'dark',
                headerTextVariant: 'dark',
                bodyBgVariant: 'dark',
                bodyTextVariant: 'light',
                footerBgVariant: 'dark',
                footerTextVariant: 'dark',
                selection_month:'',
                user:'',
                pass:'',
                error_log:'',
                login_error:false,
                token:'0',
                username:''
               
            }
              
    },
        
    
    methods: {

        async change_user_pass_(){

            this.token = localStorage.getItem('$app-token') == null ? '0' : localStorage.getItem('$app-token')
            let d = await this.change_my_password( )
            this.change_user_pass_open=false
            
            console.log( d )
            if( d.result == 'Process-Complete' ){

                this.process_ok=true

            }else{

                this.error_log = d.error    
                this.login_error=true

            }

        },
        change_my_password : async function( ) {


                    return new Promise((resolve, reject) => {

                            

                            const config = {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                            let requestBody = {                                
                                
                                "token" : this.token,
                                "current_pass" : this.current_pass,
                                "new_pass" : this.new_pass
                                
                            }
                          
                            const json = JSON.stringify(requestBody) 
                            
                            let end_point = myConfig.server_domain+"/v1/login/change/password"
                            
                            this.$refs.topProgress.start()

                            axios.post( end_point, json, config )
                            .then(response => {

                                    this.$refs.topProgress.done()
                                    // ====================================================================
                                    resolve( response.data )

                            })

                    })
                            
                           

        },
        async user_verify(){

            this.token = localStorage.getItem('$app-token') == null ? '0' : localStorage.getItem('$app-token')
            let d = await this.verify_user_by_token( this.token )
            
            if( d.result == 'Process-Complete' ){

                this.username = d.data.username

                if( d.data.role != 'Admin'){

                    this.error_log = 'Role-Mismatch'    
                    this.login_error=true
                    this.user_has_login=false

                }else{

                    this.user_has_login=true
                    this.login_error=false
                }

            }else{

                this.error_log = d.error    
                this.login_error=true
                this.user_has_login=false
                
                
            }

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
                            
                            let end_point = myConfig.server_domain+"/v1/login/verify/token"
                            
                            this.$refs.topProgress.start()

                            axios.post( end_point, json, config )
                            .then(response => {

                                    this.$refs.topProgress.done()
                                    // ====================================================================
                                    resolve( response.data )

                            })

                    })
                            
                           

        },
    
    },
    mounted() {

        
        this.$refs.topProgress.start()

        setTimeout(() => { this.$refs.topProgress.done() }, 1000);
        
        this.loading=false
        this.user = localStorage.getItem('$app-user'); 
        this.token = localStorage.getItem('$app-token'); 
        this.user_verify()

        
        
        
        
    },
    watch: {

        login_error () {
            if(this.login_error == false ){

                this.$router.push('/')

            }
        },
        user_has_login  () {
            if(this.user_has_login == false ){

                this.$router.push('/')

            }
        },
        
        
    },
    computed: {
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


</script>

<!-- menu design will like this concept. The creator has used a hexagon => https://codepen.io/uiswarup/pen/dyyqaGR -->
<style scoped>

#navbar {
  overflow: hidden;
  background-color: #330066;
  
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