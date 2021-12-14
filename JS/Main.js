mapboxgl.accessToken = 'pk.eyJ1IjoiamxhYTEzNjI0IiwiYSI6ImNrbzdnZzAzYTA2dDEyd2xrNGVoa242aHkifQ.fMOf-c4Vcc5JmV3Owr1Kzw';
// Use a minimal variant of the Mapbox Dark style, with certain features removed.
const sound_map = new mapboxgl.Map({
style: 'mapbox://styles/examples/cj68bstx01a3r2rndlud0pwpv',
center: {
lng: -74.0064,
lat: 40.7081
},
zoom: 15,
pitch: 55,
container: 'sound_map',
antialias: true
});
 
sound_map.addControl(new mapboxgl.FullscreenControl());
 
sound_map.on('load', () => {
const bins = 16;
const maxHeight = 200;
const binWidth = maxHeight / bins;
 
// Divide the buildings into 16 bins based on their true height, using a layer filter.
for (let i = 0; i < bins; i++) {
sound_map.addLayer({
'id': `3d-buildings-${i}`,
'source': 'composite',
'source-layer': 'building',
'filter': [
'all',
['==', 'extrude', 'true'],
['>', 'height', i * binWidth],
['<=', 'height', (i + 1) * binWidth]
],
'type': 'fill-extrusion',
'minzoom': 15,
'paint': {
'fill-extrusion-color': '#aaa',
'fill-extrusion-height-transition': {
duration: 0,
delay: 0
},
'fill-extrusion-opacity': 0.6
}
});
}
 
// Older browsers might not implement mediaDevices at all, so we set an empty object first
if (navigator.mediaDevices === undefined) {
navigator.mediaDevices = {};
}
 
// Some browsers partially implement mediaDevices. We can't just assign an object
// with getUserMedia as it would overwrite existing properties.
// Here, we will just add the getUserMedia property if it's missing.
if (navigator.mediaDevices.getUserMedia === undefined) {
navigator.mediaDevices.getUserMedia = (constraints) => {
// First get ahold of the legacy getUserMedia, if present
const getUserMedia =
navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
 
// Some browsers just don't implement it - return a rejected promise with an error
// to keep a consistent interface
if (!getUserMedia) {
return Promise.reject(
new Error(
'getUserMedia is not implemented in this browser'
)
);
}
 
// Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
return new Promise((resolve, reject) => {
getUserMedia.call(navigator, constraints, resolve, reject);
});
};
}
 
navigator.mediaDevices
.getUserMedia({ audio: true })
.then((stream) => {
// Set up a Web Audio AudioContext and AnalyzerNode, configured to return the
// same number of bins of audio frequency data.
const audioCtx = new (window.AudioContext ||
window.webkitAudioContext)();
 
const analyser = audioCtx.createAnalyser();
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;
 
const source = audioCtx.createMediaStreamSource(stream);
source.connect(analyser);
 
analyser.fftSize = bins * 2;
 
const dataArray = new Uint8Array(bins);
 
function draw(now) {
analyser.getByteFrequencyData(dataArray);
 
// Use that data to drive updates to the fill-extrusion-height property.
let avg = 0;
for (let i = 0; i < bins; i++) {
avg += dataArray[i];
sound_map.setPaintProperty(
`3d-buildings-${i}`,
'fill-extrusion-height',
10 + 4 * i + dataArray[i]
);
}
avg /= bins;
 
// Animate the map bearing and light color over time, and make the light more
// intense when the audio is louder.
sound_map.setBearing(now / 500);
const hue = (now / 100) % 360;
const saturation = Math.min(50 + avg / 4, 100);
sound_map.setLight({
color: `hsl(${hue},${saturation}%,50%)`,
intensity: Math.min(1, (avg / 256) * 10)
});
 
requestAnimationFrame(draw);
}
 
requestAnimationFrame(draw);
})
.catch((err) => {
console.log('The following gUM error occurred:', err);
});
});

//Speech Recognition
var bar;
var test_1=0;

function setup() {
  bar = new p5.SpeechRec('en-US'); 
  bar.onResult = showResult; // function to run when recognizor
  bar.continuous = true;//make the phone call for ever
  bar.interimResults = true;// give interim results
  bar.start(); // start recognizing speech
}

function showResult(){
	var lastWord = bar.resultString.split(' ').pop();
	// var enter = document.getElementById("test");

	if(lastWord=='map'){
		window.open("/SONYC.html", '_blank');	
	}
	if(lastWord=='Google' & test_1==0){
		test_1=1;
		window.open("https://www.google.com/", '_blank');
	}
	if(lastWord=='data'){
		//    window.location.replace("https://portal.311.nyc.gov/article/?kanumber=KA-02893"); // similar behavior as an HTTP redirect
		// window.location.href = "https://portal.311.nyc.gov/article/?kanumber=KA-02893"; // similar behavior as clicking on a link
		window.open('https://portal.311.nyc.gov/article/?kanumber=KA-02893', '_blank');
	   }
}
