var mapImage;
var stations;
var temps;
var clat = 38;
var clon = -92;
var zoom = 3.3;
var width = 1280;
var height = 640;
var indexes_in_temp = []
let mapURL = "https://api.mapbox.com/styles/v1/mapbox/cj44mfrt20f082snokim4ungi/static/"+clon.toString()+","+clat.toString()+","+zoom.toString()+",0,0/1280x640?access_token=pk.eyJ1Ijoia2FyaW1wdWZmIiwiYSI6ImNqcDdzazg5YjFranQza21uNG51ZHlkcHMifQ.HxLXvSo5wH4OGoRYvPoYKw"
let stationsURL = 'https://www1.ncdc.noaa.gov/pub/data/normals/1981-2010/station-inventories/temp-inventory.txt'
let tempsURL = 'https://www1.ncdc.noaa.gov/pub/data/normals/1981-2010/products/temperature/mly-tavg-normal.txt'

function preload() {
  mapImage = loadImage(mapURL);
  stations = loadStrings(stationsURL);
  temps = loadStrings(tempsURL);
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
  frameRate(1);
  createCanvas(1280,800);
  translate(1280/2, 640/2);
  imageMode(CENTER);
  image(mapImage,0,0);
  drawTempBox();
  for (var i = 0; i < temps.length;i++) {
    var data = temps[i].split(/ +/);
    indexes_in_temp.push(data[0]);
  }
}

var i = 0;
function draw() {
  translate(1280/2, 640/2);
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
      var bloop = mapColors(temperature);
      fill(bloop[0],bloop[1],bloop[2]);
      ellipse(x,y,4.5,4.5);
    }
    writeMonth(i);
    i++;
  }
  if (i==12) {
    i=0;
  }
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
