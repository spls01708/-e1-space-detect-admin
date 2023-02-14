/* eslint-disable */
 
const all_test = require('./_all_test')
const lib_1 = require('./lib_1')

// ------------------------------------------------------------------------------------
  
class __class {

    constructor() { 

    } 
    
     
    add_satellite_by_tle = function ( cesium, color, tle_name, tle_line_1, tle_line_2, timesp, sat_type ) { 
     
        return  lib_1.add_satellite_by_tle( cesium, color, tle_name, tle_line_1, tle_line_2, timesp, sat_type )
    } 

    async fn_make_path ( cesium, viewer, current_czml_date, current_clock_multiplier, current_time, color, tle_name, tle_line_1, tle_line_2, cb ) { 
     
        return  lib_1.fn_make_path( cesium, viewer, current_czml_date, current_clock_multiplier, current_time, color, tle_name, tle_line_1, tle_line_2, cb  )
    } 

}



// ------------------------------------------------------------------------------------

module.exports.cesium_custom_class = __class;
  