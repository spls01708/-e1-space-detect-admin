/* eslint-disable */
 
const axios = require('axios')
const server_config = require('./config')


// ------------------------------------------------------------------------------------

const fn_admin_login = async function( server_domain, user, pass, request ) {

 

}

const fn_login = async function( server_domain, user, pass, request ) {

 
}

const fn_encrypt_login = async function( server_domain, encryption_data, sender_publicKey ) {


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
            
            let end_point = server_domain+"/v2/mfa/encrypt/login"
             
            axios.post( end_point, json, config )
            .then(response => {

             
                    resolve( response.data )

            }).catch( (e) => {
                
                    reject(e)    
            })

    })
            
           

}

const fn_admin_encrypt_login = async function( server_domain, encryption_data, sender_publicKey ) {

      

}
// ------------------------------------------------------------------------------------

module.exports = { 

    fn_admin_login,
    fn_login,
    fn_encrypt_login,
    fn_admin_encrypt_login

};

  