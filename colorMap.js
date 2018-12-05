var width = 1280;
var height = 640;
var rangeBoxWidth = 60;
var rangeBoxHeight = 30;
var colorArray = [[63, 18, 18],[139,20,24],[186,42,33],[244, 122, 66],[250,174,11],[186,209,17],[38,178,45],[28,101,28],[47,66,81],[89,102,180],[60,135,200],[48,95,187],[84,96,196],[176,123,231],[255,255,255]];

function drawTempBox() {
  for (var i = 0; i < colorArray.length; i++) {
    fill(colorArray[i][0],colorArray[i][1],colorArray[i][2]);
    rect((i*rangeBoxWidth)-(1280/2),-(640/2),rangeBoxWidth,rangeBoxHeight);
    if (i != 14)
      fill(255,255,255);
    else fill(0,0,0);
    textSize(15);
    textAlign(CENTER,TOP);
    text(">"+(110-i*10),(i*rangeBoxWidth)-(1280/2)+20,-(640/2));
  }
}

function mapColors(temp) {
  if (temp > 1100) {
    return [230,166,183];
  }
  else if  (temp > 1000) {
    return [139,20,24];
  }
  else if  (temp > 900) {
    return [186,42,33];
  }
  else if  (temp > 800) {
    return [22,95,0];
  }
  else if  (temp > 700) {
    return [250,174,11];
  }
  else if  (temp > 600) {
    return [186,209,17];
  }
  else if  (temp > 500) {
    return [38,178,45];
  }
  else if  (temp > 400) {
    return [28,101,28];
  }
  else if  (temp > 300) {
    return [47,66,81];
  }
  else if  (temp > 200) {
    return [89,102,180];
  }
  else if  (temp > 100) {
    return [60,135,200];
  }
  else if  (temp > 00) {
    return [48,95,187];
  }
  else if  (temp > -100) {
    return [84,96,196];
  }
  else if  (temp > -200) {
    return [176,123,231];
  }
  else {
    return [255,255,255];
  }
}
