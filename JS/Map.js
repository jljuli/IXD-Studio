
mapboxgl.accessToken = 'pk.eyJ1IjoiamxhYTEzNjI0IiwiYSI6ImNrbzdnZzAzYTA2dDEyd2xrNGVoa242aHkifQ.fMOf-c4Vcc5JmV3Owr1Kzw';
const beforeMap = new mapboxgl.Map({
container: 'before',
style: 'mapbox://styles/jlaa13624/ckx5egq4j0rjk15n9ql5tsa9m',
center:[-74.0060, 40.7128],
zoom: 14
});
 
const afterMap = new mapboxgl.Map({
container: 'after',
style: 'mapbox://styles/jlaa13624/ckx444b8512eu14o88tkmkotg',
center:[-74.0060, 40.7128],
zoom: 14
});


 
// A selector or reference to HTML element
const container = '#comparison-container';
 
const map = new mapboxgl.Compare(beforeMap, afterMap, container, {
// Set this to enable comparing two maps by mouse movement:
// mousemove: true
});


// Navigation Control
var nav = new mapboxgl.NavigationControl();
afterMap.addControl(nav,'top-left');


// Cursor

beforeMap.on('mousemove',function(event){ 
    console.log('test')
    if(beforeMap.loaded()){
        var features = beforeMap.queryRenderedFeatures(event.point,{
            layers:['BKMN']
        });
        beforeMap.getCanvas().style.cursor = features.length ? 'pointer':'';
    }	
  });

  beforeMap.on('click',function(event){//
    console.log('map onlick called');
    var geometry = event.point;
    var parameters = {
        layers:['BKMN']
    };
    var features = beforeMap.queryRenderedFeatures(geometry, parameters);
    var zip = features[0];//
    
    if(features.length){
        console.log(zip);
        var Cluster = zip.properties.Cluster || '—'; 
        var Noise = zip.properties.Noise|| '—';
        var Collection_Truck = zip.properties.Collection_Truck|| '—';
        var Commerical = zip.properties.Commerical || '—'; 
        var Helicopter = zip.properties.Helicopter || '—'; 
        var Worship = zip.properties.Worship || '—'; 
        var Park = zip.properties.Park || '—'; 
        var Sidewalk = zip.properties.Sidewalk || '—'; 
        var Vehicle = zip.properties.Vehicle || '—'; 
        
  
        var popup = new mapboxgl.Popup()
        .setLngLat(event.lngLat) // Stores the geographic location
        .setHTML('<dl>'+
        '<dt>Cluster</dt>'+
        '<dd>'+ Cluster +'</dd>'+
        '<dt> Noise</dt>'+
        '<dd>'+ Noise +'</dd>'+
        '<dt>Commercial Noise</dt>'+
        '<dd>'+ Commerical +'</dd>'+
        '<dt>Collection Truck Noise</dt>'+
        '<dd>'+ Collection_Truck +'</dd>'+
        '<dt> Helicopter Noise</dt>'+
        '<dd>'+ Helicopter +'</dd>'+
        '<dt> House of Worship Noise</dt>'+
        '<dd>'+ Worship +'</dd>'+
        '<dt>Park Noise</dt>'+
        '<dd>'+ Park +'</dd>'+
        '<dt> Street/ Sidewalk Noise</dt>'+
        '<dd>'+ Sidewalk +'</dd>'+
        '<dt>Vehicle Noise</dt>'+
        '<dd>'+ Vehicle +'</dd>'+
        '</dl>')
        .addTo(beforeMap);
         }
  });




afterMap.on('mousemove',function(event){ 
  console.log('test')
  if(afterMap.loaded()){
      var features = afterMap.queryRenderedFeatures(event.point,{
          layers:['BKMN']
      });
      afterMap.getCanvas().style.cursor = features.length ? 'pointer':'';
  }	
});

// Onclick Popup
afterMap.on('click',function(event){//
    console.log('map onlick called');
    var geometry = event.point;
    var parameters = {
        layers:['BKMN']
    };
    var features = afterMap.queryRenderedFeatures(geometry, parameters);
    var lot = features[0];//
    
    if(features.length){
        console.log(lot);
        var bbl = lot.properties.bbl || '—'; // if the first value is undefined or empty, will get the second value
        var borough = lot.properties.borough || '—';
        var zipcode = lot.properties.zipcode || '—';
        var noise = lot.properties.noisePerCapita || '—';

  
        var popup = new mapboxgl.Popup()
        .setLngLat(event.lngLat) // Stores the geographic location
        .setHTML('<dl>'+
        '<dt>Borough, Tax Block & Lot</dt>'+
        '<dd>'+ bbl +'</dd>'+
        '<dt>Borough</dt>'+
        '<dd>'+ borough +'</dd>'+
        '<dt>Zip Code</dt>'+
        '<dd>'+ zipcode +'</dd>'+
        '<dt>Noise per Capita</dt>'+
        '<dd>'+ noise +'</dd>'+
        '</dl>')
        .addTo(afterMap);
         }
  });

  // https://p5js.org/reference/#/p5.Oscillator
