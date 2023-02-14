/* eslint-disable */
 
const axios = require('axios')
const server_config = require('./config')


// ------------------------------------------------------------------------------------

const fn_admin_verify = async function( server_domain, token ) {


                     

}

const fn_verify = async function( server_domain, token ) {


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
            
            let end_point = server_domain+"/v2/mfa/verify"
             
            axios.post( end_point, json, config )
            .then(response => {

             
                    resolve( response.data )

            }).catch( (e) => {
                
                    reject(e)    
            })

    })
            
           

}



// ------------------------------------------------------------------------------------

module.exports = { 

    fn_admin_verify,
    fn_verify

};

  