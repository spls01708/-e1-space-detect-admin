/* eslint-disable */
 
const all_tles = require('./_all_tles')

// ------------------------------------------------------------------------------------
  
class tle {

    constructor() { 

    } 
    
    thaicom_4_tles = async function ( ) { 
     
        return JSON.parse(JSON.stringify( all_tles.thaicom_4_tles ) )
    } 

    thaicom_6_tles = async function ( ) { 
     
        return JSON.parse(JSON.stringify( all_tles.thaicom_6_tles ) )
    } 

    thaicom_8_tles = async function ( ) { 
     
        return JSON.parse(JSON.stringify( all_tles.thaicom_8_tles ) )
    } 
    
}



// ------------------------------------------------------------------------------------

module.exports.sat_tle = tle;
  