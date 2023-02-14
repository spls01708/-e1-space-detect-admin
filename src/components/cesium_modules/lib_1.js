/* eslint-disable */
 
var {getSatelliteInfo, getMeanMotion, getCatalogNumber, getEpochTimestamp } = require('tle.js');
var satellite = require('satellite.js');
var czml = require("czml-writer");
var TLE = require( 'tle' )

const add_satellite_by_tle = function( Cesium, cc, name, line_1, line_2, timesp, type='PAYLOAD' ) {
 

                let tle_tmp = name+'\n' +
                              line_1+'\n' +
                              line_2; 
 

                let satInfo = getSatelliteInfo(
                                                              tle_tmp,         // Satellite TLE string or array.
                                                              timesp,          // Timestamp (ms)
                                                              18.589976828998569,      // Observer latitude (degrees)
                                                              98.485591343893248,    // Observer longitude (degrees)
                                                              0               // Observer elevation (km)
                );  
                
                let longitude = satInfo.lng
                let latitude = satInfo.lat
                let height = satInfo.height*100
                // ------------------------------------------------------------------------------------------------------ 
                  // var startLatitude = 26.788;
                  // var startLongitude = 31.62900000000001;

                  // var geosatellite = viewer.entities.add({
                  //     id:"geo",
                  //         position : Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
                  // });

                  // var groundstation = viewer.entities.add({
                  //     id:"gs",
                  //     position : Cesium.Cartesian3.fromDegrees(startLongitude, startLatitude, 0),
                  //     polyline : {
                  //         //toggling to true results in no polyline artefacts
                  //         arcType: Cesium.ArcType.NONE,
                  //         // This callback updates positions each frame.
                  //         positions : new Cesium.PositionPropertyArray([
                  //             new Cesium.ReferenceProperty(viewer.entities, 'gs', ['position']),
                  //             new Cesium.ReferenceProperty(viewer.entities, 'geo', ['position']),
                  //           ]),
                  //         width : 1,
                  //         material : Cesium.Color.fromCssColorString( cc ) 
                  //     }
                  // }); 
                // ------------------------------------------------------------------------------------------------------

                let svg = '<svg width="10px" height="13px" preserveAspectRatio="xMaxYMid meet" version="1.1" xmlns="http://www.w3.org/2000/svg">';
                if(type=='PAYLOAD'){
                                      svg += '<polygon points="0,12  4,0  8,12" style="fill:'+cc+';stroke:'+cc+';" />';  
                }else if(type=='DEBRIS'){
                                      svg += '<circle cx="5" cy="6" r="4" style="fill:'+cc+';stroke:'+cc+';"/>';  
                }else if(type=='ROCKET BODY'){
                                      svg += '<rect x="1" y="1" width="9" height="13" style="fill:'+cc+';stroke:'+cc+';"/>'; 
                }
                                                                                                                            
                svg += '</svg>';  
                
                let image = new Image();
                svg = 'data:image/svg+xml;base64,' + window.btoa(svg);
                image.src=svg


                    let label = new Cesium.LabelGraphics();
                    
                    label.text = name       
                    label.show=true    
                    label.font = "0.8em Lucida Console"         
                    label.fillColor = Cesium.Color.fromBytes(hexToRgb(cc).r,hexToRgb(cc).g,hexToRgb(cc).b,255)
                    

                    label.showBackground=true
                    label.scale='0.8'
                    label.backgroundColor = Cesium.Color.fromBytes( 112, 89, 57, 70 )
                    label.horizontalOrigin = Cesium.HorizontalOrigin.LEFT
                    label.verticalOrigin =  Cesium.VerticalOrigin.CENTER
                    label.style = Cesium.LabelStyle.FILL
                    label.pixelOffset =  new Cesium.Cartesian2(12,0)

                let path = new Cesium.PathGraphics();
                path.show=false

                viewer.entities.add({
                                      id: 1,  
                                      name: name,    
                                                                        
                                      position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
                                      billboard:{
                                                  image:image,
                                                  scale: 0.7,
                                                  show: true,
                                                },

                                      path : path,
                                      label : label,
                                    });


}
// -------------------------------------------------------------------------------------------------------------
function addCommas(nStr){
   nStr += '';
   let x = nStr.split('.');
   let x1 = x[0];
   let x2 = x.length > 1 ? '.' + x[1] : '';
   let rgx = /(\d+)(\d{3})/;
   while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
   }
   return x1 + x2;
}



const fn_make_path = async function ( Cesium, viewer, current_czml_date, current_clock_multiplier, current_time, cc, name, line_1, line_2, cb ){
 
      let tle_tmp = name+'\n' +
                     line_1+'\n' +
                     line_2; 

      let meanMotion = getMeanMotion(tle_tmp);
      let period=( ( 1 / Number(meanMotion) )*24 ).toFixed(2)
      // let norad_id=tlejs.getCatalogNumber(tle_tmp)
      // let Epoch=(new Date( tlejs.getEpochTimestamp(tle_tmp) )).toUTCString()

      let tle = TLE.parse( tle_tmp )
      
      
      let orbit = new czml.orbit.fromTle( tle_tmp );
      let time=Math.round((new Date( current_time )).getTime() / 1000);

      
      orbit.setEpoch( time ); //override TLE epoch
      let time_diff=1

      if(current_czml_date.length==2){

      time_diff=get_time_diff(current_czml_date[0] , current_czml_date[1])
      if(time_diff==0){ time_diff=1 }

      orbit.setDuration(60*60*24*time_diff)
      

      }else{

      orbit.setDuration(60*60*24*5)

      }

      let e  = orbit.czml();
      let tmp=''
      let myID = 1

      try{

      
      let timesp = new Date(current_time).getTime()
      let satInfo = getSatelliteInfo(
                                                tle_tmp,         // Satellite TLE string or array.
                                                timesp,  // Timestamp (ms)
                                                18.589976828998569,      // Observer latitude (degrees)
                                                98.485591343893248,    // Observer longitude (degrees)
                                                0               // Observer elevation (km)
                        );

                     

      tmp="<table style='font-size: 0.9em;border: 0px solid #ddd;'>"+
                     "<tr><td>NORAD </td><td> "+tle.number+"</td></tr>"+

                     "<tr><td>International </td><td> "+tle.id+"</td></tr>"+
                     "<tr><td style='border-bottom: 1px solid #ddd;'></td><td style='border-bottom: 1px solid #ddd;'></td></tr>"+
                     
                     "<tr><td>Period  </td><td> "+addCommas( period )+" (hours/day)</td></tr>"+
                     "<tr><td>ความสูง  </td><td> "+addCommas( satInfo.height.toFixed(2) )+" km</td></tr>"+
                     
                     
                     "</table>";
      }catch(e){}

      // --------------------------------------------------------------------------------------------------------------------------
      let type='PAYLOAD'

      let svg = '<svg width="10px" height="13px" preserveAspectRatio="xMaxYMid meet" version="1.1" xmlns="http://www.w3.org/2000/svg">';
      if(type=='PAYLOAD'){
                           svg += '<polygon points="0,12  4,0  8,12" style="fill:'+cc+';stroke:'+cc+';" />';  
      }else if(type=='DEBRIS'){
                           svg += '<circle cx="5" cy="6" r="4" style="fill:'+cc+';stroke:'+cc+';"/>';  
      }else if(type=='ROCKET BODY'){
                           svg += '<rect x="1" y="1" width="9" height="13" style="fill:'+cc+';stroke:'+cc+';"/>'; 
      }
                                                                                                                  
      svg += '</svg>';  
      
      let image = new Image();
      svg = 'data:image/svg+xml;base64,' + window.btoa(svg);
      image.src=svg

         
      let label={
         fillColor: {
            rgba: [ hexToRgb(cc).r,hexToRgb(cc).g,hexToRgb(cc).b,255 ],
         },
         font: "8pt Lucida Console",
         horizontalOrigin: "LEFT",
         pixelOffset: {
            cartesian2: [8, 0],
         },
         style: "FILL",
         text: name,
         showBackground: true,
         backgroundColor: {
            rgba: [112, 89, 57, 70],
         },
      }
         
      
      // --------------------------------------------------------------------------------------------------------------------------

      e[0].clock.multiplier = current_clock_multiplier  
      e[1].id=myID
      e[1].label = label
      e[1].description=tmp
      e[1].position.cartesian=[]
      e[1].path.material.solidColor.color.rgba=[hexToRgb( cc ).r,hexToRgb( cc ).g,hexToRgb( cc ).b,255]
      e[1].path.show = true
      e[1].billboard = {
                        image:image,
                        scale: 1,
                        show: true,
                     }

      await fn_add_position_czml(name, line_1, line_2, e, current_time, time_diff, period)

      setTimeout(() => {
        
         let entity = Cesium.CzmlDataSource.load ( e );

         entity.then(function (dataSource) { 
             
               let tm = viewer.dataSources.add(entity).then(function () { })
 
               cb( dataSource )
         });

      },100) 

}

const fn_add_position_czml = async function ( name, line_1, line_2,  data, pass_current_time, time_diff, period){
            

   let satrec = satellite.twoline2satrec( line_1 , line_2 );

   let cartesian = [];
   let sec=0;
   let t = new Date(pass_current_time);
   
   let nn = Number( period )*60*24*time_diff
    

   for(let i=0;i<nn;i++){ 

     t.setSeconds(t.getSeconds() + 60 ); 

     let positionAndVelocity = satellite.propagate(satrec, t);

     
         cartesian.push(i*60)
         cartesian.push(positionAndVelocity.position.x*1000)
         cartesian.push(positionAndVelocity.position.y*1000)
         cartesian.push(positionAndVelocity.position.z*1000)
     

   }

   data[1].position.cartesian=cartesian
   


}

function hexToRgb(hex) {
   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
   return result ? {
     r: parseInt(result[1], 16),
     g: parseInt(result[2], 16),
     b: parseInt(result[3], 16)
   } : null;
 }
// -------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------
module.exports = {  

   add_satellite_by_tle,
   fn_make_path   
      
}