var mapImage;
var earthQuakes;
var stations;
var temps;
var clat = 38;
var clon = -92;
var zoom = 3.3;
var width = 1024;
var height = 512;
var indexes_in_temp = []

//https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/-77.03968,38.89744,3.3,0,0/300x200?access_token=pk.eyJ1Ijoia2FyaW1wdWZmIiwiYSI6ImNqcDdzazg5YjFranQza21uNG51ZHlkcHMifQ.HxLXvSo5wH4OGoRYvPoYKw
//https://api.mapbox.com/styles/v1/mapbox/cj8gg22et19ot2rnz65958fkn/static/-85.35923,33.77361,2.3,0,0/300x200?access_token=pk.eyJ1Ijoia2FyaW1wdWZmIiwiYSI6ImNqcDdzazg5YjFranQza21uNG51ZHlkcHMifQ.HxLXvSo5wH4OGoRYvPoYKw
let mapURL = "https://api.mapbox.com/styles/v1/mapbox/cj44mfrt20f082snokim4ungi/static/-92,38,3.3,0,0/1280x640?access_token=pk.eyJ1Ijoia2FyaW1wdWZmIiwiYSI6ImNqcDdzazg5YjFranQza21uNG51ZHlkcHMifQ.HxLXvSo5wH4OGoRYvPoYKw"


function preload() {
  mapImage = loadImage(mapURL);
  stations = loadStrings('https://www1.ncdc.noaa.gov/pub/data/normals/1981-2010/station-inventories/temp-inventory.txt');
  temps = loadStrings('https://www1.ncdc.noaa.gov/pub/data/normals/1981-2010/products/temperature/mly-tavg-normal.txt');
}

function mercX(lon) {
  lon = radians(lon);
  var a = (256/PI)*pow(2,zoom);
  var b = lon+PI;
  return a*b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256/PI)*pow(2,zoom);
  var b = tan(PI/4 + lat/2);
  var c = PI - log(b);
  return a*c;
}

function setup () {
  frameRate(60);
  createCanvas(1024,512);
  translate(width/2, height/2);
  imageMode(CENTER);
  image(mapImage,0,0);
  for (var i = 0; i < temps.length;i++) {
    var data = temps[i].split(/ +/);
    indexes_in_temp.push(data[0]);
  }
}

var i = 0;
var k = 0;
function draw() {
  translate(width/2, height/2);
  var cx = mercX(clon);
  var cy = mercY(clat);
  if (i<12) {
    for (var k = 0; k < stations.length-1;k++) {
      var data = stations[k].split(/ +/);
      var id = data[0];
      var lat = data[1]
      var lon = data[2];
      var index = indexes_in_temp.indexOf(id);
      var temp_data = temps[index].split(/ +/);
      var temp_str = temp_data[i+1];
      var ub = temp_str.length
      var temperature = temp_str.substring(0,ub-1);
      var x = mercX(lon) - cx;
      var y = mercY(lat) - cy;
      noStroke();
      var redVal = 0;
      var blueVal = 0
      if (temperature < -100) {
        redVal = 0;
        blueVal = 255;
      }
      else if (temperature < 0) {
        redVal = 0;
        blueVal = 255;
      }
      else if (temperature < 100) {
        redVal = 20;
        blueVal = 235;
      }
      else if (temperature < 200) {
        redVal = 40;
        blueVal = 215;
      }
      else if (temperature < 300) {
        redVal = 60;
        blueVal = 195;
      }
      else if (temperature < 400) {
        redVal = 80;
        blueVal = 175;
      }
      else if (temperature < 500) {
        redVal = 100;
        blueVal = 155;
      }
      else if (temperature < 600) {
        redVal = 120;
        blueVal = 135;
      }
      else if (temperature < 700) {
        redVal = 140;
        blueVal = 115;
      }
      else if (temperature < 800) {
        redVal = 160;
        blueVal = 95;
      }
      else if (temperature < 900) {
        redVal = 180;
        blueVal = 75;
      }
      else if (temperature < 1000) {
        redVal = 200;
        blueVal = 55;
      }
      else if (temperature < 11000) {
        redVal = 220;
        blueVal = 35;
      }
      fill(redVal,0,blueVal);
      ellipse(x,y,4.5,4.5);
    }
    i++;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*
for (var i = 0; i < stations.length; i++) {
  var data = stations[i].split(/ +/);
  var lat = data[1]
  var lon = data[2];

  var x = mercX(lon) - cx;
  var y = mercY(lat) - cy;
  noStroke();
  fill(255,0,0);
  ellipse(x,y,3,3);
}

for (var i = 0; i < earthQuakes.length; i++) {
  var data = earthQuakes[i].split(/,/);
  var lat = data[1]
  var lon = data[2];
  var mag = data[4];
  mag = pow(10,mag);
  mag = sqrt(mag);

  var magmax = sqrt(pow(10,10));
  var d = map(mag,0,magmax,0,1000);
  stroke(0,0,0);
  var x = mercX(lon) - cx;
  var y = mercY(lat) - cy;
  fill(255,0,200);
  ellipse(x,y,d,d)
}
*/
