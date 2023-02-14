<template>

    <div style="height:100vh;border:0px solid red;margin-top:0em;margin-left:0em;margin-right:0em;">
    <vue-topprogress ref="topProgress" color="#FF0000"></vue-topprogress>

    <div id="navbar">
        <b-row  >
        
            <nav class="nav-top" >       
            
                <a class="nav__link">
                    
                    
                    <span class="heading-page ml-3 d-none d-xs-none d-sm-none d-lg-block d-lg-block d-xl-block d-md-block d-xxl-block d-xxl-block" style="font-size:1.5em;color:#FFFFFF"> data elements edit </span>
                    <span class="heading-page ml-2 d-block d-sm-block d-lg-none d-xl-none d-xxl-none" style="font-size:1.1em;color:#FFFFFF"> data elements edit </span>

                </a>

            </nav>
        </b-row>
    </div>

    <main class="site-wrapper">
         
                        <div class="d-block d-sm-block d-lg-none d-xl-none d-xxl-none">
                        
                            <div class="container pt-2" style=" overflow-x:hidden;">
                                <b-row class="text-center" align-v="center" style="height:80vh;">
                                    <b-col>
                                        <h5 style="color:red;">Not Subport Mobile Screen</h5>
                                    </b-col>
                                </b-row>                          
                            </div>

                        </div>
                        <div  >

                            <div class="container pt-2" style=" overflow-x:hidden; margin-top:-2em;">
                                <b-row class="text-center" align-v="center" style="height:80vh;">
                                    <b-col cols="3"></b-col>
                                    <b-col class="align-self-center ">
                                        <div class="card rounded-0 border-3" style="border-color:#97C1EA;">
                                            <article class="card-body">
                                                 

                                                <!-- <img :src="require('@/assets/6283043.png')" height="90" /> -->

                                                <!-- Moon Satellite Loader         -->
                                                <!-- https://codepen.io/ppsirius/pen/vKEeeq -->
                                                <b-row class="text-center w-100" >
                                                    <b-col sm=2></b-col>
                                                <b-col class="text-center w-100">

                                                <div class="svg-wrapper">
                                                <svg class="moon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111.77 111.77">
                                                    <circle cx="55.89" cy="55.89" r="55.64" fill="none" stroke="#355764" stroke-miterlimit="10" stroke-width=".5" stroke-dasharray="4"/>
                                                    <circle cx="55.89" cy="55.89" r="43.65" fill="#752eff"/>
                                                    <path d="M73 91.22a52.22 52.22 0 0 1-51.1-62.71 43.64 43.64 0 0 0 60.8 61.8 52.45 52.45 0 0 1-9.7.91z" fill="#5d2fea" fill-rule="evenodd"/>
                                                    <circle cx="49.01" cy="38.35" r="6.88" fill="#4c2bd8"/>
                                                    <path d="M45.79 32.82a10.1 10.1 0 0 1 9.78 7.61 6.87 6.87 0 0 0-10.7-7.56c.3-.03.6-.05.92-.05z" fill="#3923b7" fill-rule="evenodd"/>
                                                    <circle cx="74.07" cy="31.47" r="2.02" fill="#4c2bd8"/>
                                                    <path d="M73.12 29.85A3 3 0 0 1 76 32.08a2 2 0 0 0-3.14-2.22h.27z" fill="#3923b7" fill-rule="evenodd"/>
                                                    <circle cx="80.11" cy="77.6" r="2.02" fill="#4c2bd8"/>
                                                    <path d="M79.16 76A3 3 0 0 1 82 78.21 2 2 0 0 0 78.89 76h.27z" fill="#3923b7" fill-rule="evenodd"/>
                                                    <circle cx="54.47" cy="17.54" r="1.17" fill="#4c2bd8"/>
                                                    <path d="M53.92 16.6a1.72 1.72 0 0 1 1.66 1.3 1.17 1.17 0 0 0-1.82-1.29h.16z" fill="#3923b7" fill-rule="evenodd"/>
                                                    <circle cx="33.27" cy="88.97" r="1.17" fill="#4c2bd8"/>
                                                    <path d="M32.72 88a1.72 1.72 0 0 1 1.66 1.3 1.17 1.17 0 0 0-1.81-1.3h.16z" fill="#3923b7" fill-rule="evenodd"/>
                                                    <circle cx="25.28" cy="36.79" r="1.77" fill="#4c2bd8"/>
                                                    <path d="M24.46 35.37a2.6 2.6 0 0 1 2.51 2 1.77 1.77 0 0 0-2.75-1.95h.24z" fill="#3923b7" fill-rule="evenodd"/>
                                                    <circle cx="82.51" cy="51.39" r="3.84" fill="#4c2bd8"/>
                                                    <path d="M80.71 48.3a5.63 5.63 0 0 1 5.46 4.25 3.84 3.84 0 0 0-6-4.22z" fill="#3923b7" fill-rule="evenodd"/>
                                                    <circle cx="54.47" cy="64.73" r="3.75" fill="#4c2bd8"/>
                                                    <path d="M52.71 61.71A5.5 5.5 0 0 1 58 65.86a3.74 3.74 0 0 0-5.83-4.12z" fill="#3923b7" fill-rule="evenodd"/>
                                                    <circle cx="26.57" cy="75.59" r="2.99" fill="#4c2bd8"/>
                                                    <path d="M25.17 73.18a4.39 4.39 0 0 1 4.25 3.31 3 3 0 0 0-4.65-3.29z" fill="#3923b7" fill-rule="evenodd"/>
                                                <!--      <circle cx="28.31" cy="7.63" r="3.03" fill="#44daf9"/> -->
                                                </svg>
                                                <svg class="moon-satelite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111.8 111.8">
                                                    <circle fill="#355764" cx="28.3" cy="7.6" r="3"/>
                                                </svg>
                                                
                                                </div>

                                                </b-col>
                                                </b-row>
                                                
                                                

                                                <p class="text-center heading-page" style="font-size:1.1em;font-weight:bold;"> </p>
                                                <form class="ml-1 mr-1" style="margin-bottom:-1em;">
                                                    <div class="form-group">
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                    <span class="input-group-text border-primary border-2" style=" color:navy;"> <i class="fa fa-user"></i> </span>
                                                        </div>
                                                        <input name="" class="form-control rounded-0 border-primary border-2" placeholder="Username" type="text" v-model="user" >
                                                    </div> 
                                                    </div>  
                                                    <div class="form-group">
                                                    <div class="input-group ">
                                                        <div class="input-group-prepend">
                                                    <span class="input-group-text border-primary border-2" style=" color:navy;"> <i class="fa fa-lock"></i> </span>
                                                    </div>
                                                    <input class="form-control rounded-0 border-primary border-2" placeholder="******" type="password" v-model="pass" @keyup.enter="login_()">
                                                    </div>  
                                                    </div>  
                                                </form>

                                                    

                                                    <i class="fa fa-circle  text-primary" aria-hidden="true" style="font-size:0.6em;"></i>
                                                    <i class="fa fa-circle  text-primary ml-2" aria-hidden="true" style="font-size:0.6em;"></i>
                                                    <i class="fa fa-circle  text-primary ml-2" aria-hidden="true" style="font-size:0.6em;"></i>

                                                    <div class="form-group ml-1 mr-1 bbtn">
                                                         
                                                        <button class=" mt-1 btn btn-outline-primary rounded-0 w-100 border-2"   @click="login_()" ><i class="fa fa-sign-in"></i><span style="margin-left:5px;"> เข้าสู่ระบบ  </span></button>
                                                    </div>  
                                                     
                                                
                                            </article>
                                        </div>
                                    </b-col>
                                    <b-col cols="3"></b-col>
                                </b-row>
                                 
                            </div>
                        </div>

                 
    </main>
    <div class="footer">
        <p class="heading-page" style="font-size:14px;font-weight:bold;float:right;margin-right:10px;">NBTC, SPACE DETECT ©2022</p>        
    </div>

        <b-modal v-model="login_open" size="l"  centered no-close-on-backdrop hide-header hide-header-close  title="Login" 
            
        
        >

        
            <b-row class="text-center w-100" >
                
                <b-col>
                <h5 style="color:#00000;">User Login</h5>
                </b-col>

            </b-row>

            <b-row class="mt-2" align-v="center" >
                <b-col  sm="2">
                <!-- <i class="fa fa-user-circle" aria-hidden="true"></i> -->
                <span class="d-lg-none d-xl-none text-dark">User : </span>
                <span class="d-none d-lg-block d-xl-block text-dark" style="float:right;">User : </span>
                
                </b-col>
                <b-col  sm="10">
                
                <b-form-input
                    id="filter-input"
                    v-model="user"
                    type="search"
                    placeholder=""
                    
                    style="color:#00000;background-color:#FFFFFF;cursor:pointer;"
                    :state="user_validate"
                ></b-form-input>

                </b-col>

            </b-row>

            <b-row class="mt-2" align-v="center" >
                
                <b-col  sm="2">
                <!-- <i class="fa fa-key" aria-hidden="true"></i> -->
                <span class="d-lg-none d-xl-none text-dark">Pass : </span>
                <span class="d-none d-lg-block d-xl-block text-dark" style="float:right;">Pass : </span>
                
                </b-col>
                <b-col  sm="10">
                <b-form-input
                    id="filter-input"
                    v-model="pass"
                    type="password"
                    placeholder=""
                    
                    style="color:#00000;background-color:#FFFFFF;cursor:pointer;"
                    @keyup.enter="login_()"
                    :state="login_pass_validate"
                ></b-form-input>

                </b-col>

            </b-row>

            

            <template v-slot:modal-footer="{ }">  
                <b-button variant="success" @click="login_()" style="margin-right:1em;" class="rounded-0 "
                :disabled="user_validate==false || login_pass_validate==false"
                >
                    <i class="fa fa-check" aria-hidden="true"></i> Login
                </b-button>

                <b-button variant="danger" @click="login_open=false" style="margin-right:1em;" class="rounded-0 ">
                    <i class="fa fa-window-close" aria-hidden="true"></i> Exit
                </b-button>
            </template>
        </b-modal>

        <!-- ---------------------------------------------------------------------------------------------------------------------------------- -->

         
        <!-- ---------------------------------------------------------------------------------------------------------------------- -->
        <b-modal v-model="regiter_ok" size="sm"  centered no-close-on-backdrop hide-header hide-header-close  title="Login" 
             
        
        >
            <div class="row text-center" style="margin-top:2em;"> 
              
                <span style="color:#FFFFFF;font-size:4em;"><i class="far fa-check-circle" ></i></span>
                <span style="color:#FFFFFF;font-size:1em;margin-top:0.5em;"> User Register Complate </span>

              
            </div>

            <template v-slot:modal-footer="{ }"> 
                <b-button variant="danger" @click="regiter_ok=false" style="margin-right:1em;" class="rounded-0 ">
                    <i class="fa fa-window-close" aria-hidden="true"></i> Exit
                </b-button>
            </template>
        </b-modal>

        <b-modal v-model="regiter_error" size="sm"  centered no-close-on-backdrop hide-header hide-header-close  title="Login" 
             
        >
            <div class="row text-center" style="margin-top:2em;"> 
              
                <span style="color:#FFFFFF;font-size:4em;"><i class="fa fa-exclamation-triangle" ></i></span>
                <span style="color:#FFFFFF;font-size:1em;margin-top:0.5em;"> Error, {{error_log}} </span>

              
            </div>

            <template v-slot:modal-footer="{ }"> 
                <b-button variant="danger" @click="regiter_error=false" style="margin-right:1em;" class="rounded-0 ">
                    <i class="fa fa-window-close" aria-hidden="true"></i> Exit
                </b-button>
            </template>
        </b-modal>
        <!-- ---------------------------------------------------------------------------------------------------------------------- -->
        

        <b-modal v-model="login_error" size="sm"  centered no-close-on-backdrop hide-header hide-header-close  title="Login" 
           
        >
            <div class="row text-center text-danger" style="margin-top:2em;"> 
              
                <span style=" font-size:4em;"><i class="fa fa-exclamation-triangle" ></i></span>
                <span style=" font-size:1em;margin-top:0.5em;"> Error, {{error_log}} </span>

              
            </div>

            <template v-slot:modal-footer="{ }"> 
                <b-button variant="danger" @click="login_error=false" block class="rounded-0 ">
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

import load from './load'
import myConfig from './config.js'

export default {
  name: 'calendar',
  components: {
		vueTopprogress,
        load
	},
  data() {
            return {     
                login_ok:false,
                login_error:false,
                regiter_ok:false,
                regiter_error:false,
                register_open:false,
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
                confirm_pass:'',
                user_name:'',
                user_email:'',
                error_log:'',
               
               
            }
              
    },
        
    
    methods: {
         
        
        async login_(){

            // let d = await this.user_login( )

            // this.pass=''

            // if( d.result == 'Process-Complete' ){

            //     this.login_ok=true
            //     this.login_open=false

            //     localStorage.setItem( '$admin-otp-token', d.token );
            //     localStorage.setItem( '$admin-otp-user', d.user );
                 
            //     if( d.role == 'ADMIN'){

                    // this.$router.push('/users/admin')
            this.$router.push('/tle')

            //     }else{

            //         this.error_log = 'ADMIN ONLY'  
            //         this.login_error=true
                    
            //     }

            // }else{

            //     this.error_log = d.error    
            //     this.login_error=true
            //     localStorage.setItem( '$admin-otp-token', '' );
                
            // }

        },
         
        user_login: async function(  ) {


                    return new Promise((resolve, reject) => {

                            

                            const config = {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                            let requestBody = {                                
                                
                                "user" : this.user,
                                "pass" : this.pass,
                                
                            }
                          
                            const json = JSON.stringify(requestBody) 
                            
                            let end_point = myConfig.server_domain+"/v1/admin/login"
                            
                            this.$refs.topProgress.start()

                            axios.post( end_point, json, config )
                            .then(response => {

                                    this.$refs.topProgress.done()
                                    // ====================================================================
                                    resolve( response.data )

                            })

                    })
                            
                           

        },
        user_verify(){
                            
                            this.$refs.topProgress.start()

                            const config = {
                                headers: {
                                  'Content-Type': 'application/json'
                                }
                            }
                            
                            let requestBody = {
                              token : localStorage.getItem('$app-housing-token')
                            }

                            const json = JSON.stringify(requestBody)                       
                            let end_point = "https://otp.rtaf.mi.th/api/v2/mfa/verify"
                            
                            axios.post( end_point, json, config )
                            .then(response => { 
                                
                                
                                this.$refs.topProgress.done()
                                

                                if( response.data.result  == "Process-Complete" ){

                                    this.login_open = false
                                    this.user_has_login = true                                    
                                        
                                    
                                 
                                }else{

                                    
                                    this.login_open = true
                                    this.user_has_login = false
                                }

                             })

            },
                
            
           
    
    },
    mounted() {

        
        this.$refs.topProgress.start()

        setTimeout(() => { this.$refs.topProgress.done() }, 1000);
        
        this.loading=false
        this.register_open=false
        this.user = localStorage.getItem('$admin-otp-user') == null ? '' : localStorage.getItem('$admin-otp-user')
        // this.user_verify()

        
        
        
        
    },
    watch: {

        login_open () {
            if(this.login_open==true){

                this.user = localStorage.getItem('$admin-otp-user') == null ? '' : localStorage.getItem('$admin-otp-user')
                this.pass = ''
                this.user_has_login = false

            }

        },
        register_open ()  {
            if(this.register_open==true){

                this.user = ''
                this.pass = ''
                this.confirm_pass=''
                this.user_name=''
                this.user_email=''
                this.error_log=''
                

            }

        },
        user_has_login (){

            if(this.user_has_login==false){

                localStorage.setItem( '$admin-otp-token', '' );

            }

        }

        

    },
    computed: {

        email_validate () {

            
            return validateEmail(this.user_email)
        },
        user_validate () {
            
            return this.user.length > 3 ? true : false
        },
        user_pass_validate () {
            
            if( ( this.confirm_pass.length > 3 ) && ( this.pass.length > 3 ) && ( this.confirm_pass == this.pass ) ){
                return true
            }else{
                return false
            }
        },
        user_name_validate () {

            return this.user_name.length > 0 ? true : false

        },

        login_pass_validate () {
            
            return this.pass.length > 3 ? true : false
        },


            

    },
    created() {
      
    },
    
    
}

function validateEmail(email) 
{
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
}

</script>

<!-- menu design will like this concept. The creator has used a hexagon => https://codepen.io/uiswarup/pen/dyyqaGR -->
<style scoped>

#navbar {
  overflow: hidden;
  background-color: navy;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  
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
/* 
.page-home .hexagon-item:nth-last-child(1), .page-home .hexagon-item:nth-last-child(2), .page-home .hexagon-item:nth-last-child(3) {
    -webkit-transform: rotate(30deg) translate(87px, -80px);
    -moz-transform: rotate(30deg) translate(87px, -80px);
    -ms-transform: rotate(30deg) translate(87px, -80px);
    -o-transform: rotate(30deg) translate(87px, -80px);
    transform: rotate(30deg) translate(87px, -80px);
} */

.hexagon-menu::-webkit-scrollbar {
    display: none;
}

  
.bbtn :hover{
    letter-spacing:0.25em ;
}

</style>
 

<style>
    @import "../assets/style.css";

</style>

<style>
    @import "https://pro.fontawesome.com/releases/v5.10.0/css/all.css";
</style>

<style>
    @import "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-social/5.1.1/bootstrap-social.min.css";
</style>
 

<!-- Moon Satellite Loader         -->
<!-- https://codepen.io/ppsirius/pen/vKEeeq --> 
<style lang="scss" scoped>

$cubic: cubic-bezier(0.5, 0.8, 0.5, 0.2);

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
 
 
.svg-wrapper {
   position: relative;
   width: 160px;
   height: 160px;
   
   svg {
      position: absolute;
      top: 0;
      width: 100%;
   }
   
   .moon-satelite {
     animation-name: spin;
     animation-duration: 5s;
     animation-iteration-count: infinite;
     animation-timing-function: $cubic;
   }
}

</style>