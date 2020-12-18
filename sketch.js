let reverb, delay ;
let osc = []
var r;
var deltaTime=0;

function preload() {
for(var i =0;i< 6; i++){
    osc[i] = loadSound("bgp5/audio/audio0"+ i +".wav");
  }
}

function setup() {
  let cnv =createCanvas(windowWidth, 800);
  
//   osc = new p5.Oscillator('square');
//   osc.amp(0.5);
for(var i =0;i< 6; i++){
      delay = new p5.Delay();
      delay.process(osc[i], 0.12, .7, 2300);
      reverb = new p5.Reverb();
      reverb.process(osc[i], 10, 5);
  }
//   osc.disconnect();

  cnv.mousePressed(oscStart)
}

function draw() {
    
     waveCycle();
    let dryWet = constrain(map(mouseX, 0, width, 0, 1), 0, 1);
    reverb.drywet(dryWet);
      deltaTime++;
      
      for(var i =0;i< 6; i++){
        let panning = map(mouseX, 0., width,-1.0, 1.0);
        osc[i].pan(panning);
        let playbackRate = map(mouseY, 0.1, height, 1.1, 0.9);
      playbackRate = constrain(playbackRate, 0.01, 4);
      osc[i].rate(playbackRate);
      }
      
}

function waveCycle(){
  noStroke();
  background(10,60);
  
  push();
  translate(width/2, height/2);
  rotate(frameCount/15);
  ellipse(transformMousePointX(mouseX),transformMousePointY(mouseY),20,20);
  
  pop();
  ellipse(mouseX,mouseY,20,20);
}

function oscStart() {

    osc[int(random(0,6))].play();
}

function transformMousePointX(_mouseX){
  var posx;
  posx = _mouseX - width*0.5;

  
  return posx;
}

function transformMousePointY(_mouseY){
  var posy;
  posy = _mouseY - height*0.5;

  
  return posy;
}

function mouseReleased() {
  
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}