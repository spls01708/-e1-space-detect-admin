/* eslint-disable */
 
const all_footprints = require('./_all_footprints')

// ------------------------------------------------------------------------------------
  
class sat {

    constructor() { 

    } 
    
    thaicom_4_footprints = async function ( ) { 
     
        return JSON.parse(JSON.stringify( all_footprints.thaicom_4_footprints ) )
    } 

    thaicom_6_footprints = async function ( ) { 
     
        return JSON.parse(JSON.stringify( all_footprints.thaicom_6_footprints ) )
    } 

    thaicom_8_footprints = async function ( ) { 
     
        return JSON.parse(JSON.stringify( all_footprints.thaicom_8_footprints ) )
    } 
    
}



// ------------------------------------------------------------------------------------

module.exports.sat_footprints = sat;
  