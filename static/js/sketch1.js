let hh, clap, bass, og; // the variables for each of our drums
let hPat, cPat, bPat, ohPat; // array Patterns for each of our instruments
let hPhrase, cPhrase, bPhrase, ohPhrase; // Phrases for p5Js
let drums,drums1,drums2,drums3; // Object to which we will attach allthe //drums 
let bpmCNTRL;
let beatLength;
let sPat;
let textbox;
let hhVolumeSend, kickVolumeSend, ohVolumeSend,snareVolumeSend; 
let reverbKick, reverbHiHat, reverbSnare, reverbOh;
let snrReverbSndCntrl, kickReverbSndCntrl, hihatReverbSndCntrl, ohReverbSndCntrl;
let selectDrumPattern, buttonGiveRecommendation;

let mrNoisy, playButton, stopButton;
let myRadio;


bPat = [];
cPat = [];
hPat = [];
ohPat = [];
let arrays = {
  'Kick' : bPat,
  'HiHat': hPat,
  'Clap': cPat ,
  'OH': ohPat
};

var kicks = [];
var his = [];
var snr = [];
var ohs = [];

function preload() {
  
	/*
		elements are added to the array using
		push method
		push adds one value to the end of the array
		for the sound array, each element is a sound file
		which is first loaded using the loadSound function
		the loadSound returns the sound data
		which is pushed onto the array
		so each sound is accessible in the order added starting at 0
		sounds[0] is the first sound
		sounds[1] is second
		sounds[2] is sound three
	*/
	kicks.push(loadSound('../../static/kik1.mp3'));
  console.log('done');
	kicks.push(loadSound('../../static/kik2.mp3'));
    console.log('done');
	kicks.push(loadSound('../../static/kik3.mp3'));
    console.log('done');
  	kicks.push(loadSound('../../static/kik4.mp3'));
    console.log('done');
    ohs.push(loadSound('../../static/oh1.mp3'));
  console.log('done');
	ohs.push(loadSound('../../static/oh2.mp3'));
    console.log('done');
	ohs.push(loadSound('../../static/oh3.mp3'));
    console.log('done');
  ohs.push(loadSound('../../static/oh4.mp3'));
    console.log('done');
	his.push(loadSound('../../static/hh1.mp3'));
	console.log('done');
	his.push(loadSound('../../static/hh4.wav'));
	console.log('done');
	his.push(loadSound('../../static/hh3.mp3'));
	console.log('done');
  his.push(loadSound('../../static/hh4.mp3'));
	console.log('done');
	snr.push(loadSound('../../static/sn1.mp3'));
	console.log('done');
	snr.push(loadSound('../../static/sn2.mp3'));
	console.log('done');
	snr.push(loadSound('../../static/sn3.mp3'));
	console.log('done');
  snr.push(loadSound('../../static/sn4.mp3'));
	console.log('done');
  
}


function setup() {

  mrNoisy = new p5.Noise();
  mrNoisy.setType('brown');
  mrNoisy.amp(0.00000001);
  console.log('the array here' + arrays['Kick']);
stopButton = createButton('Stop');
stopButton.position(510, 400);
stopButton.size(100, 50)
stopButton.style('background-color', 'red');
stopButton.mousePressed(() => {playStop()});
  
playButton = createButton('Start');
playButton.size(100, 50)
playButton.style('background-color', 'green');
playButton.position(370, 400);
playButton.mousePressed(() => {playStart()});
  
    selectDrumPattern = createSelect();
    selectDrumPattern.position(20, 20);
    for (let key in arrays) {
                selectDrumPattern.option(key);
            }
        buttonGiveRecommendation = createButton('Generate a Recommendation');
        buttonGiveRecommendation.position(20, 50);
        buttonGiveRecommendation.mousePressed(()=> {sendArrayToFlask()});

    inferDrumPattern = createSelect();
    inferDrumPattern.position(20, 90);
    for (let key in arrays) {
                    inferDrumPattern.option(key);
            }
            buttonInferRecommendation = createButton('Chain the Recommendation');
            buttonInferRecommendation.position(20, 120);
            buttonInferRecommendation.mousePressed(()=> {sendArrayInferToFlask()});

  
  let cnv = createCanvas(500, 150);
  cnv.position(180,180);
  cnv.mousePressed(canvasPressed);
  beatLength = 16;
  hh = his[0];
  clap = snr[0];
  bass = kicks[0];
  oh = ohs[0];
  myRadio = createRadio();
  myRadio.position(80, 80);
  myRadio.size(60);
  
  // Kick Settings
  
  kickVolumeSend = createSlider(0, 1, 0.5, 0.01);
  kickVolumeSend.position(850,260);
  
  reverbKick = new p5.Reverb();
  reverbKick.process(bass, 2, 0);
  
  kickReverbSndCntrl = createSlider(0, 1, 0, 0.01);
  kickReverbSndCntrl.position(680,260);
  
  // Open Hi Hat Settings
  ohVolumeSend = createSlider(0, 1, 0.5, 0.01);
  ohVolumeSend.position(850,300);

  reverbOh = new p5.Reverb();
  reverbOh.process(oh, 2, 0);
  
  ohReverbSndCntrl = createSlider(0, 1, 0, 0.01);
  ohReverbSndCntrl.position(680,300);
  
  // Snare Settings
  snareVolumeSend = createSlider(0, 1, 0.5, 0.01);
  snareVolumeSend.position(850,225);
  
  reverbSnare = new p5.Reverb();
  reverbSnare.process(clap, 2, 0);
  
  snrReverbSndCntrl = createSlider(0, 1, 0, 0.01);
  snrReverbSndCntrl.position(680,225);
  
  // hihat Settings
  hhVolumeSend = createSlider(0, 1, 0.5, 0.01);
  hhVolumeSend.position(850,190);
  
  reverbHiHat = new p5.Reverb();
  reverbHiHat.process(hh, 2, 0);
  
  hihatReverbSndCntrl = createSlider(0, 1, 0, 0.01);
  hihatReverbSndCntrl.position(680,190);
  
  
  //Choosing samples 
  
  chooseKick = createSelect();
  chooseKick.position(120,260);
  chooseKick.option('kik1','0');
  chooseKick.option('kik2','1');
  chooseKick.option('kik3','2');
  chooseKick.option('kik4','3');
  chooseKick.changed(function() {
   bass = kicks[chooseKick.value()];
  reverbKick.process(bass, 2, 0);
    bass.setVolume(0.5);
    console.log(chooseKick.value());
  })
  chooseOh = createSelect();
  chooseOh.position(120,300);
  chooseOh.option('oh1','0');
  chooseOh.option('oh2','1');
  chooseOh.option('oh3','2');
  chooseOh.option('oh4','3');
  chooseOh.changed(function() {
   oh = ohs[chooseOh.value()];s
  reverbOh.process(oh, 2, 0);
    oh.setVolume(0.5);
    console.log(chooseOh.value());
  })
  chooseSnare = createSelect();
  chooseSnare.position(120,225);
  chooseSnare.option('snr1','0');
  chooseSnare.option('snr2','1');
  chooseSnare.option('snr3','2');
  chooseSnare.option('snr4','3');
  chooseSnare.changed(function() {
   clap = snr[chooseSnare.value()];
     reverbSnare.process(clap, 2, 0);
    clap.setVolume(0.5);
    console.log(chooseSnare.value());
  })
  chooseHih = createSelect();
  chooseHih.position(120,190);
  chooseHih.option('hh1','0');
  chooseHih.option('hh2','1');
  chooseHih.option('hh3','2');
  chooseHih.option('hh4','3');
  chooseHih.changed(function() {
   hh = his[chooseHih.value()];
    reverbHiHat.process(hh, 2, 0);
    hh.setVolume(0.5);
    console.log(chooseHih.value());
  })
  
  arrays['HiHat'] = [1,0,0,1,0,1,0,1,1,1,1,1,1,0,1,0]
  arrays['Clap'] =  [1,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0]
  arrays['Kick'] = [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0]
  arrays['OH'] = [0,1,0,0,0,1,0,0,0,1,0,0,1,0,1,0]
  sPat = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
  
  
  // new p5.Phrase(name, callback, sequence)
  
  hPhrase = new p5.Phrase('hh', (time) => {hh.play(time); }, arrays['HiHat']);
  cPhrase = new p5.Phrase('clap', (time) => {clap.play(time); }, arrays['Clap']);
  bPhrase = new p5.Phrase('bass', (time) => {bass.play(time); }, arrays['Kick']);
  ohPhrase = new p5.Phrase('oh', (time) => {oh.play(time); }, arrays['OH']);
  
  

  textbox = createInput('Reverb Send');
  textbox.position(675, 150);
  
  textbox = createInput('Mixer');
  textbox.position(850, 150);
  
  //HiHat Part
  drums = new p5.Part(); 
  drums.addPhrase(hPhrase);
  drums.addPhrase('seq', sequence, sPat);
  drums.addPhrase(bPhrase);
  drums.addPhrase(ohPhrase);
  drums.addPhrase(cPhrase);
  
//   // Bass Part
//   drums2 = new p5.Part();
//   drums2.addPhrase(bPhrase);
  
//   // Snare Part
//   drums3 = new p5.Part();
//   drums3.addPhrase(cPhrase);
  
//   drums4 = new p5.Part();
//   drums4.addPhrase(ohPhrase);
  
  // BPM control 
  bpmCNTRL = createSlider(30,600,85,1);
  bpmCNTRL.position(180, 330);
  bpmCNTRL.input(() => {drums.setBPM(bpmCNTRL.value())});
                       // drums2.setBPM(bpmCNTRL.value());
                       // drums3.setBPM(bpmCNTRL.value());
                       // drums4.setBPM(bpmCNTRL.value())});
  drums.setBPM('85');
  // drums2.setBPM('85');
  // drums3.setBPM('85');
  // drums4.setBPM('85');
  let val = bpmCNTRL.value();
  console.log(val);
  textbox = createInput('');
  textbox.position(330, 330);
  
  // Initial update of the textbox with the slider's default value
  textbox.value(bpmCNTRL.value());
  drawMatrix();
}
function playStart(){
if (hh.isLoaded() && bass.isLoaded() && clap.isLoaded()) {
      console.log('here');
      mrNoisy.start();
      if(!drums.isPlaying){ 
        drums.metro.metroTicks = 0;
        // drums2.metro.metroTicks = 0;
        // drums3.metro.metroTicks = 0;
        // drums4.metro.metroTicks = 0;
        // drums1.loop();
        // drums2.loop();
        // drums3.loop();
        drums.loop();
  
}
}
}
function playStop() {
        mrNoisy.stop();
        console.log('no one here');
        drums.stop();
        // drums1.stop();
  
        // drums2.stop();
        // drums3.stop();
}
  
    
// function keyPressed(){
//   if (key == " ") {
//     if (hh.isLoaded() && bass.isLoaded() && clap.isLoaded()) {
//       console.log('here');
//       if(!drums.isPlaying){ 
//         drums.metro.metroTicks = 0;
//         // drums2.metro.metroTicks = 0;
//         // drums3.metro.metroTicks = 0;
//         // drums4.metro.metroTicks = 0;
//         // drums1.loop();
//         // drums2.loop();
//         // drums3.loop();
//         drums.loop();
//       } else {  
//         console.log('no one here');
//         // drums1.stop();
//         // drums2.stop();
//         // drums3.stop();
//         drums.stop();
        
//       }
//     }
//   }
// }

function sendArrayToFlask() {
  let selectedID = selectDrumPattern.value();
  let selectedArray = arrays[selectedID];

  fetch('http://127.0.0.1:5000/manipulate_array', { // Use your actual ngrok URL
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: selectedID, array: selectedArray}),
  })
  .then(response => response.json())
  .then(data => {
    updateArrayInPlace(data.id, data.modifiedArray);
  })
  .catch(error => console.error('Error:', error));

       
}

function sendArrayInferToFlask() {
  let selectedID = selectDrumPattern.value();
  let selectedArray = arrays[selectedID];

  let selected2ID = inferDrumPattern.value();
  //let selected2Array = arrays[selectedID];

  fetch('http://127.0.0.1:5000/manipulate_array', { // Use your actual ngrok URL
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: selected2ID, array: selectedArray}),
  })
  .then(response => response.json())
  .then(data => {
    updateArrayInPlace(data.id, data.modifiedArray);
  })
  .catch(error => console.error('Error:', error));
  



}


function updateArrayInPlace(id, newArray) {
  const originalArray = arrays[id];
  // Ensure the original array is at least as long as the new array
  originalArray.length = newArray.length;
  
  // Update each element in place
  for (let i = 0; i < newArray.length; i++) {
      originalArray[i] = newArray[i];
  }

  // If you need to trigger updates or re-draw your UI, do it here
  drawMatrix();
  // updateDrumPatterns(); // If you have a function to re-initialize your drum patterns
}


function canvasPressed() {
  let rowClicked = floor(4*mouseY/height);
  let indexClicked = floor(16*(mouseX-100)/(width-100));
  console.log(indexClicked);
  
  if(indexClicked>=0) {
    if (rowClicked == 0) {
      console.log('first Row Clicked' + indexClicked);  
      arrays['HiHat'][indexClicked] = +!arrays['HiHat'][indexClicked];
    }
    if (rowClicked == 1) {
    arrays['Clap'][indexClicked] = +!arrays['Clap'][indexClicked];
    console.log('second Row Clicked'+ indexClicked);
    
    }
    if (rowClicked == 2) {
    arrays['Kick'][indexClicked] = +!arrays['Kick'][indexClicked];
    console.log('third Row Clicked'+ indexClicked);
    
    }
    if (rowClicked == 3) {
    arrays['OH'][indexClicked] = +!arrays['OH'][indexClicked];
    console.log('Fourth Row Clicked'+ indexClicked);
    
    }
  }
  
  drawMatrix(); 
  
}

function drawMatrix() {


    // Creating the sequencer visualizer
  // Using the width and the height of the canvas to build the grid 
  background(51);
  stroke('blue');
  strokeWeight(2);
  fill('white');
  
  for (let i = 0; i< beatLength+1; i++) {
    //startx, starty, endx, endy
    line(i*(width-100)/beatLength + 100, 0, i*(width-100)/beatLength + 100, height);
  }
  for (let i = 0; i< 5; i++) {
    line(0, i*height/4, width, i*height/4);
  }
  noStroke();
  for (let i =0; i< beatLength; i++) {
    if(arrays['HiHat'][i] == 1) {
      ellipse(i*(width-100)/beatLength  +0.5*(width-100)/beatLength + 100, height/8, 10);
    }
    if(arrays['Clap'][i] == 1) {
      ellipse(i*(width-100)/beatLength + 100  +0.5*(width-100)/beatLength, height*3/8, 10);
    }
    if(arrays['Kick'][i] == 1) {
      ellipse(i*(width-100)/beatLength + 100  +0.5*(width-100)/beatLength, height*5/8, 10);
    }
    if(arrays['OH'][i] == 1) {
      ellipse(i*(width-100)/beatLength + 100  +0.5*(width-100)/beatLength, height*7/8, 10);
    }
    textSize(20);
    textWrap(WORD);
    text('Hi-Hat', 22, 15, 125);
    text('Snare', 25, 45, 125);
    text('Kick',28, 85, 125);
    text('OpenHat',19, 120, 125);
   

}
}

function sequence(time, beatIndex) {
  setTimeout(()=> {
    drawMatrix();
    drawPlayHead(beatIndex);
  }, time*1000);
}

function drawPlayHead(beatIndex) {
  stroke('red');
  strokeWeight(0.5);
  fill(255,0,0,30);
  rect((beatIndex-1)*(width-100)/beatLength + 100, 0, (width-100)/beatLength, height);
  
}
function draw() {

  let kickVolume = kickVolumeSend.value();
  bass.setVolume(kickVolume);
  let ohVolume = ohVolumeSend.value();
  oh.setVolume(ohVolume);
  let hhVolume = hhVolumeSend.value();
  hh.setVolume(hhVolume);
  let snareVolume = snareVolumeSend.value();
  clap.setVolume(snareVolume);
  // Update the textbox with the slider's current value
  textbox.value(bpmCNTRL.value() + " bpm");
  let wetness = snrReverbSndCntrl.value();
  reverbSnare.drywet(wetness);
  let wetness2 = hihatReverbSndCntrl.value();
  reverbHiHat.drywet(wetness2);
  let wetness3 = kickReverbSndCntrl.value();
  reverbKick.drywet(wetness3);
  let wetness4 = ohReverbSndCntrl.value();
  reverbOh.drywet(wetness4);
}

 