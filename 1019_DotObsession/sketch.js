var whichshape = 0;
var dia = 20;
var thetext = '●';
var thetext2 = '■';
var inp; // input box
var clearbutton,randombutton, savebutton; // buttons
var sr,sg,sb; //sliders
var checkbox;
var themic; //microphone

// this runs when you first start the sketch
function setup() {
    // drawing area for the "canvas"
    // windowWidth, windowHeight are the full size of the browser window
    createCanvas(windowWidth, windowHeight);
    // clear the screen
    background("#669999");
    fill("#669999");
    stroke("#FFC300"); 
    textAlign(CENTER);

    //Mic
    themic = new p5.AudioIn();
    themic.start();

    //Background Sqaure as a "div"
    div = createDiv('');
    div.position(25,25);
    div.style("width","200px");
    div.style("height","1000px");
    div.style("z-index","0");
    div.style("background","rgba(255,255,255,1)");
    div.style("box-shadow","0 0 50px rgba(0,0,0,0.2)");//semi transparent black shaodw
   

   
    //Input Box
    inp = createInput('Enter the Input!');
    inp.position(50,100);
    inp.size(150,20);
    inp.style('font-family','Permanent Marker');
    inp.style('font-style','20px');
    inp.input(setText);// functions that runs when setting


    // clear button
    clearbutton = createButton('CLEAR (C)');
    clearbutton.position(50,170);
    clearbutton.size(150,100);
    clearbutton.style('font-family','Permanent Marker');
    clearbutton.style('font-size','20px');
    clearbutton.mousePressed(clearMe);

    // bgcolor button
    bgcolorbutton = createButton('Background Color (B)');
    bgcolorbutton.position(50,320);
    bgcolorbutton.size(150,100);
    bgcolorbutton.style('font-family','Permanent Marker');
    bgcolorbutton.style('font-size','20px');
    bgcolorbutton.mousePressed(bgcolorMe);

    //random button
    randombutton = createButton('RANDOM (R)');
    randombutton.position(50,470);
    randombutton.size(150,100);
    randombutton.style('font-family','Permanent Marker');
    randombutton.style('font-size','20px');
    randombutton.mousePressed(randomMe);

    //save button
    savebutton = createButton('SAVE (S)');
    savebutton.position(50,620);
    savebutton.size(150,100);
    savebutton.style('font-family','Permanent Marker');
    savebutton.style('font-size','20px');
    savebutton.mousePressed(saveMe);

    //sliders
    sr = createSlider(0,255,102); //min,max,default
    sr.position(50,770);
    sr.style('width','150px');
    sg = createSlider(0,255,153); //min,max,default
    sg.position(50,820);
    sg.style('width','150px');
    sb = createSlider(0,255,153); //min,max,default
    sb.position(50,870);
    sb.style('width','150px');

    //checkbox
    checkbox = createCheckbox('Sqaures?',false);
    checkbox.position(50,920);
    let box = checkbox.elt.getElementsByTagName('input')[0];
    box.style.width='30px';
    box.style.height='30px';
    checkbox.style('font-family','Permanent Marker');
    checkbox.style('font-size','20px');
    checkbox.changed(checkMe); //callback function

  }
  
  function draw() {
    var lvl = themic.getLevel()*100.;


    if(whichshape==0) ellipse(random(width),random(height), lvl, lvl);
    if(whichshape==0) text(thetext,mouseX,mouseY);
    if(whichshape==1) rect(random(width),random(height), lvl, lvl);
    if(whichshape==1) text(thetext2,mouseX,mouseY);

    var r = sr.value();
    var g = sg.value();
    var b = sb.value();
    fill(r,g,b);

    textSize(lvl*10.);
    //text(thetext,mouseX,mouseY);
  }

/*

  // Keyboard
  function keyTyped(){
    if(key=='c')background("#669999");
    if(key=='r') whichshape = 1- whichshape;
    if(key=='d'){
      fill(random(255),random(255),random(255));
    }
  }
    function keyPressed(){
    if(key=='Shift') big = 1;
    }
  function keyReleased(){
    if(key == 'Shift') big = 0;
    }

*/

    function setText(){
      thetext = this.value(); //set the text to the value
    }

    function clearMe(){
      background("#669999");
      sr.value(102);
      sg.value(153);
      sb.value(153);
    }

    function bgcolorMe(){
      background(random(255),random(255),random(255));
    }

    function randomMe(){
      sr.value(random(255));
      sg.value(random(255));
      sb.value(random(255));
    }
    
    function saveMe(){
      saveCanvas(); // Save as picture
    }

    function checkMe(){
      whichshape = this.checked();
    }


    // Keyboard
    function keyTyped(){
      if(key=='c') clearMe();
      if(key=='b') bgcolorMe();
      if(key=='r') randomMe();
      if(key=='s') saveMe();
    }


    function mouseReleased(){
      dia = 20;
    }

    function mouseDragged(){
      dia++;
    }

    function mouseClicked(){

      //text(thetext2,mouseX,mouseY);
    }


/*
    // Mouse

    function mousePressed(){
      fill(random(255),random(255),random(255));
    }

    function mouseReleased(){
      dia = 20;
    }

    function mouseDragged(){
      dia++;
    }

    function mouseMoved(){
      console.log("Moved!")
    }

    function mouseClicked(){
      whichshape = 1- whichshape;
      if(whichshape==0){
        noFill();
        stroke(0,0,128);
      }
      else{
        noStroke();
        fill(random(255),random(255),random(255));
      }
    }
*/


