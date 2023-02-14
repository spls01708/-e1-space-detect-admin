/* eslint-disable */
 
const axios = require('axios')
const server_config = require('./config')


// ------------------------------------------------------------------------------------

const fn_get_qr = async function( server_domain, request ) {


                    return new Promise((resolve, reject) => { 

                        let end_point = server_domain+"/v1/qr/login/request/"+request 

                        axios.get( end_point )
                        .then(response => {
                            
                             
                            resolve( response.data )

                        }).catch( (e) => {
                                
                            reject(e)    
                        })


                    })
                            
                           

}
 
// ------------------------------------------------------------------------------------

module.exports = { 

    fn_get_qr

};

  