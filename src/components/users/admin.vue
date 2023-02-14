<template>

    <div style="height:100vh;border:0px solid red;margin-top:0em;margin-left:0em;margin-right:0em;">
    <vue-topprogress ref="topProgress" color="#FF0000"></vue-topprogress>
    <div id="navbar">
        <b-row  >
        
            <nav class="nav-top" >       
            
                <a class="nav__link">
                    
                    
                    <span class="heading-page" style="font-size:1.5em;color:#FFFFFF;"> Satellite Orbit Simulator </span>

                </a>

            </nav>
        </b-row>
    </div>
    <!-- ------------------------------------------------------------------------ -->
    <main class="site-wrapper">
        <div class="pt-table desktop-768" >
            <div class="pt-tablecell page-home relative"  >
                 

                <!-- -------------------------------------------------------------------------------------------- -->
                <div  class="d-none d-xs-none d-sm-none d-lg-block d-lg-block d-xl-block d-md-block d-xxl-block d-xxl-block d-xxxl-none">
                    <div class="hexagon-menu clear">

                                             
                                            

                                             
                                            <div class="hexagon-item ml-2"> </div>
                                            <div class="hexagon-item"> </div>

                                            <div class="hexagon-item">
                                                <div class="hex-item">
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                </div>
                                                <div class="hex-item">
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                </div>

                                                <div >
                                                    <router-link to="/view" >
                                                        <a  class="hex-content">
                                                            <span class="hex-content-inner">
                                                                <span class="icon">
                                                                    
                                                                    <i class="material-icons" style="font-size:0.8em;">satellite_alt</i>
                                                                </span>
                                                                <span class="title" style="font-size:0.8em;">View</span>
                                                            </span>
                                                            <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1a472a"></path></svg>
                                                        </a>
                                                    </router-link>
                                                </div>
                                                
                                            </div> 


                                            <div class="hexagon-item">
                                                <div class="hex-item">
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                </div>
                                                <div class="hex-item">
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                </div>
                                                <div  >
                                                    <router-link to="/tle" >
                                                        <a  class="hex-content">
                                                            <span class="hex-content-inner">
                                                                <span class="icon">
                                                                    <i class="material-icons" style="font-size:0.8em;">star</i>
                                                                </span>
                                                                <span class="title" style="font-size:0.8em;">TLE</span>
                                                            </span>
                                                            <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#660066"></path></svg>
                                                        </a>
                                                    </router-link>
                                                </div>
                                                

                                            </div>
                                            
                                            <div class="hexagon-item"  >
                                                <div class="hex-item">
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                </div>
                                                <div class="hex-item">
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                </div>


                                                <router-link to="/users" >
                                                    <a  class="hex-content">
                                                        <span class="hex-content-inner">
                                                            <span class="icon">
                                                                <i class="fas fa-users-cog" style="font-size:0.8em;"></i>
                                                            
                                                            </span>
                                                            <span class="title" style="font-size:0.8em;">Manage Users</span>
                                                        </span>
                                                        <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#990000"></path></svg>
                                                    </a>
                                                </router-link>
                                            </div>    
                                           
                                            
                                            
                                            
    
                                            

                                             
                                           
                                            
                                            
                    </div>                                  
                                  
                    
                </div>  


                <!-- -------------------------------------------------------------------------------------------- -->   
                <div class="d-block d-sm-block d-lg-none d-xl-none d-xxl-none">
                    <h3 class="text-danger">Display on Destop Only</h3>
                </div>           

                                
            </div>
            
        </div>
    </main>

    <div class="footer">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <p class="heading-page" style="font-size:14px;font-weight:bold;float:right;margin-right:10px;">©2022</p> 
        <!-- <nav class="nav" style="height:40px;" >
        
        

        <router-link to="/admin/search" class="nav__link"> 
           <i class="material-icons nav__icon" >person_search</i>
            
           
        </router-link>

        <router-link to="/users/manage" class="nav__link">
            <i class="material-icons nav__icon" >manage_accounts</i>
             
        </router-link>        
        
        <router-link to="/admin/hris" class="nav__link"> 
           <i class="material-icons nav__icon" >contacts</i>
            
            
        </router-link>
        
         

        <router-link to="/" class="nav__link">
            <i class="material-icons nav__icon" >logout</i>
             
        </router-link>

       
        </nav> -->
    </div>

    <!-- --------------------------------------------------------------------------------------------------------------------- -->

        <b-modal v-model="login_error" size="sm"  centered no-close-on-backdrop hide-header hide-header-close  title="Login" 
            
        
        >
            <div class="row text-center text-danger" style="margin-top:2em;"> 
              
                <span style="font-size:4em;"><i class="fa fa-exclamation-triangle" ></i></span>
                <span style="font-size:1em;margin-top:0.5em;"> Error, {{error_log}} </span>

              
            </div>

            <template v-slot:modal-footer="{ }"> 
                <b-button variant="danger" @click="login_error=false" block class="rounded-0 ">
                    <i class="fa fa-window-close" aria-hidden="true"></i> Exit
                </b-button>
            </template>
        </b-modal>

         

        <!-- -----------------------------------------------------------------------------------------------------------------------------------     -->
         
    

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
                admin_select_zone_open:false,      
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
                username:'',
                admin_level : '',
                current_admin_level : '',
               
            }
              
    },
        
    
    methods: {
         
         
         
        async user_verify(){

            // this.token = localStorage.getItem('$admin-otp-token') == null ? '0' : localStorage.getItem('$admin-otp-token')
            // let d = await this.verify_user_by_token( this.token )
            
            // if( d.result == 'Process-Complete' ){

            //     console.log( d )
            //     this.username = d.data.username

            //     if( d.data.role != 'ADMIN'){

            //         this.error_log = 'Role-Mismatch'    
            //         this.login_error=true
            //         this.user_has_login=false

            //     }else{

            //         this.admin_level = d.data.level
            //         this.user_has_login=true
            //         this.login_error=false

            //         this.admin_level = JSON.parse(JSON.stringify( d.data.user_orgname ))
            //         this.current_admin_level = JSON.parse(JSON.stringify( d.data.user_orgname ))

            //         let select_zone_flag = localStorage.getItem('$admin-otp-can-select-zone') == null ? '1' : localStorage.getItem('$admin-otp-can-select-zone')

            //         if( select_zone_flag == 1){

            //             localStorage.setItem( '$admin-otp-can-select-zone', 0 );
             

            //         }
                    
            //     }

            // }else{

            //     this.error_log = d.error    
            //     this.login_error=true
            //     this.user_has_login=false
                
                
            // }

        },
        verify_user_by_token : async function( token ) {


                    // return new Promise((resolve, reject) => {

                            

                    //         const config = {
                    //             headers: {
                    //                 'Content-Type': 'application/json'
                    //             }
                    //         }
                    //         let requestBody = {                                
                                
                    //             "token" : token
                                
                    //         }
                          
                    //         const json = JSON.stringify(requestBody) 
                            
                    //         let end_point = myConfig.server_domain+"/v1/admin/login/verify/token"
                            
                    //         this.$refs.topProgress.start()

                    //         axios.post( end_point, json, config )
                    //         .then(response => {

                    //                 this.$refs.topProgress.done()
                    //                 // ====================================================================
                    //                 resolve( response.data )

                    //         })

                    // })
                            
                           

        },
    
    },
    mounted() {

        
        this.$refs.topProgress.start()

        setTimeout(() => { this.$refs.topProgress.done() }, 1000);
        
        this.loading=false
        this.user = localStorage.getItem('$admin-otp-user'); 
        this.token = localStorage.getItem('$admin-otp-token'); 
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