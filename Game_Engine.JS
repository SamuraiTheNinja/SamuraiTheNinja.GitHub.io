//document.write("Hello World");

var currentKey = null;
var keysState = new Array(256);

function Scene(framerate, width, height, positionx, positiony, backgroundImage){
	
	//basic setup
	this.touchable = 'createTouch' in document;		//find out if device has touch interface	
    this.canvas = document.createElement("canvas");	
    this.canvas.style.backgroundColor = "yellow";
	document.body.appendChild(this.canvas);
	this.context = this.canvas.getContext("2d");

	
//variables
	this.sizeX = width;
	this.sizeY = height;
	this.positionX = positionx;
	this.positionY = positiony;
	this.frameRate = framerate;
	this.image = new Image();
	this.image.src = backgroundImage;
	this.currentKey;
	this.mouseDown;
	this.mouseClicked;
	this.mousePositionX;
	this.mousePositionY;
	
	
//methods	
	this.start = function(){
		//init keyboard
		this.canvas.width = this.sizeX;
		this.canvas.height = this.sizeY;
		this.canvas.positionX = this.positionX;
		this.canvas.positionY = this.positionY;
		this.initKeys();
		document.onkeydown = this.updateKeys; //assign callback function updateKeys to onkeydown event
		document.onkeyup = this.clearKeys; //assign callback function clearKeys to onkeyup
        this.intID = setInterval(localCritSec, this.frameRate); //50fps? 50ms frames?
		document.onmousedown = function(){
			this.mouseDown = true;
			this.mouseClicked = true;
		}
		document.onmouseup = function(){
			this.mouseDown = false;
			this.mouseClicked = false;
		}
	}
	this.end = function(){
		clearInterval(this.intID);
	}
	this.clear = function(){
		this.context.clearRect(0, 0, this.sizeX, this.sizeY);
		if (this.bgColor == "image"){ //redraw image background
			ctx = this.context;
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.drawImage(this.image, 0, 0, this.sizeX, this.sizeY);
			ctx.restore();
		}
	}
	this.pause = function(){
		if (this.paused == true){
			this.paused = false;
			clearInterval(this.intID); 								//end old interval which calls the game each frame
			this.intID = setInterval (localPause, this.frameRate / 2);	//start new interval which calls pause menu every other frame
		}
		else if (this.paused == false){
			this.paused = true;
			clearInterval(this.intID);								//end old interval which calls pause
            this.intID = setInterval(localCritSec, this.frameRate);		//start new interval which calls game each frame again
		}
		else{
			this.paused = false;
			clearInterval(this.intID); 								//end old interval which calls the game each frame
			this.intID = setInterval (localPause, this.frameRate / 2);	//start new interval which calls pause menu every other frame
		}
	}
	this.getMousePos = function(){
		this.mousePositionX = e.pageX;
		this.mousePositionY = e.pageY;
	}
	this.toggleCursor = function(){
		if (this.cursorOn == true){
			this.cursorOn = false;
			this.canvas.style.cursor = "none";
		}
		else if (this.cursorOn == false){
			this.cursorOn = true;
			this.canvas.style.cursor = "default";
		}
		else{
			this.cursorOn = false;
			this.canvas.style.cursor = "none";
		}
	}
	this.toggleVisability = function(){
		if (this.visable == true){
			this.visable = false;
			//this.canvas.style.visibility = 'hidden';
		}
		else if (this.visable == false){
			this.visable = true;
			//this.canvas.style.visibility = 'visible';
		}
		else{
			this.visable = false;
			//this.canvas.style.visibility = 'hidden';
		}
	}
	this.setSize = function(width, height){
		sizeX = width;
		sizeY = height;
		this.canvas.width = width;
		this.canvas.height = height;
	}
	this.setPosition = function(left, top){
		this.positionX = left;
		this.positionY = top;
	}
	this.getFrameRate = function(){
        return this.frameRate;
	}
	this.setFrameRate = function(input){
        this.frameRate = input;
	}
	this.addSprite = function(input){
        if (this.spriteArrayExists == 2){
			this.spriteArray.push(input);			
		}
		else if (this.spriteArrayExists == 1){
			this.spriteArray = [this.sprite, input];
			this.spriteArrayExists = 2;
		}
		else{
			this.sprite = input;
			this.spriteArrayExists = 1;			
		}
	}
	this.listSprites = function(){
		function print(index, item){
            console.log(index + ": " + item);
		}
        this.spriteArray.forEach(print);
	}
	this.initKeys = function(){
		for (keyNum = 0; keyNum < 256; keyNum++){
			keysState[keyNum] = false;
		}
	}
	this.updateKeys = function(e){
		//find key in array and set that key to true
		currentKey = e.keyCode;
		//console.log(e.keyCode);
		keysState[e.keyCode] = true;
	}
	this.clearKeys = function(e){
        currentKey = null;
		keysState[e.keyCode] = false;
	}
	this.generateFloor = function(wavyness){//generates sprites that become the floor
		
	}
	this.setBackgroundColor = function(input){
		this.bgColor = input;
		if (input == "image"){
			ctx = this.context;
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.drawImage(this.image, 0, 0, this.sizeX, this.sizeY);
			ctx.restore();
		}
		else{
			this.canvas.style.backgroundColor = input;
		}
	}
}

function localCritSec(){
	//gets called once per frame
	//then calls user defined update function
	if (this.bgColor == "image"){
		ctx = this.context;
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.drawImage(this.image, 0, 0, this.sizeX, this.sizeY);
		ctx.restore();
	}
	critSec();
}
function localPause(){
	//gets called when game is paused
	//default pause shown here, also link to user defined one
	pause();
}

//================================================================
//====================SPRITE======================================
//================================================================

function Sprite(scene, imageFile, sizex, sizey){

//variables
	this.image = new Image();
	this.image.src = imageFile;
	this.canvas = scene.canvas;
	this.context = this.canvas.getContext("2d");
	this.cHeight = parseInt(this.canvas.height);
	this.cWidth = parseInt(this.canvas.width);
	this.sizeX = sizex;
	this.sizeY = sizey;
	this.imgAngle = Math.PI / 2;
	this.moveAngle = Math.PI / 2;
	this.visable = true;
	this.speed = 0;
	this.accel = 0;
	this.x = this.cHeight / 2;
	this.y = this.cWidth / 2;
	this.dx = 10;
	this.dy = 10;
	this.ddx = 0;
	this.ddy = 0;
	this.scene = scene;
	this.hasMass = true;
    this.boundAction = "REAL_BOUNCE";
	
	scene.addSprite(this); //add yourself to your scene's sprite list
	
	
//methods
	this.setImage = function(input){
		this.image.src = input;
	}
	this.draw = function(){
		ctx = this.context;
		ctx.save(); //remember current coordinate system
		ctx.translate(this.x, this.y);//translates coordinate system
		ctx.rotate(this.imgAngle - Math.PI / 2); //rotates coordinate system
		if (this.visable == true){
			ctx.drawImage(this.image, 
						0 - (this.sizeX / 2), 
						0 - (this.sizeY / 2), 
						this.sizeX, this.sizeY); //draws image on center of our coordinate system
		}
		ctx.restore();//go back to the coordinate system from when we saved.
		
	}
	this.update = function(){
		this.dx += this.ddx;
		this.dy += this.ddy;
		this.x += this.dx;
		this.y += this.dy;
		//console.log("ddx:" + this.ddx.toFixed(0) + " ddy:" + this.ddy);
		//console.log("dx:" + this.dx.toFixed(0) + " dy:" + this.dy);
		//console.log("x:" + this.x.toFixed(0) + " y:" + this.y);
		this.cHeight = parseInt(this.canvas.height);
		this.cWidth = parseInt(this.canvas.width);
		this.checkBounds();
		if (this.visable){
			this.draw();
		}
	}
	this.toggleVisability = function(){
		if (this.visable == true){ 	this.visable = false;}
		else{						this.visable = true;}
	}
	this.setSpeed = function(input){
        this.speed = input;
		this.dx = input * Math.cos(this.moveAngle);
		this.dy = input * Math.sin(this.moveAngle);
	}
	this.addAccel = function(input){
		this.accel = input;
		this.ddx -= input * Math.cos(this.moveAngle); 
		this.ddy -= input * Math.sin(this.moveAngle); // minus because orientation of axis reversed
	}
	this.setImgAngle = function(degrees){
		this.imgAngle = this.degToRad(degrees);
	}
	this.changeImgAngleBy = function(degrees){
		this.setImgAngle(this.radToDeg(this.imgAngle) + degrees);
	}
	this.getImgAngle = function(){
		return this.radToDeg(this.imgAngle) - 180;
	}
	this.rotateBy = function(degrees){
		this.changeImgAngleBy(degrees);
	}
	this.turnBy = function(degrees){
		this.setImgAngle(this.radToDeg(this.imgAngle) + degrees);
		this.setMoveAngle(this.radToDeg(this.moveAngle) + degrees);
	}
	this.setMoveAngle = function(degrees){
		this.moveAngle = this.degToRad(degrees);
	}
	this.setAngle = function(degrees){//sets both moveAngle and ImgAngle
		this.moveAngle = this.degToRad(degrees);
		this.ImgAngle = this.degToRad(degrees);
	}
	this.vectProject = function(){
		this.dx = this.speed * Math.cos(this.moveAngle);
		this.dy = this.speed * Math.sin(this.moveAngle);
	}
	this.addForce = function(force, degrees){
		this.ddx += force * Math.cos(this.degToRad(degrees));
		this.ddy += force * Math.sin(this.degToRad(degrees));
		this.accel = Math.sqrt(this.ddx * this.ddx + this.ddy * this.ddy);
	}
	this.setBoundAction = function(input){
		this.boundAction = input;
	}
	this.checkBounds = function(){
		offRight = false;
		offLeft = false;
		offTop = false;
		offBottom = false;
		this.onGround = false;
		
		//check if off screen in any direction
		if ((this.x + (this.sizeX / 2)) >= this.cWidth){
			offRight = true;
		}
		if ((this.x - (this.sizeX / 2)) <= 0){
			offLeft = true;
		}
		if ((this.y + (this.sizeY / 2)) >= this.cHeight){
			offBottom = true;
			//console.log("offbottom");
		}
		if ((this.y - (this.sizeY / 2)) <= 0){
			offTop = true;
		}
		
		//Handle bound actions
		if (this.boundAction == "WRAP"){
			if (offRight){
				this.x = this.cWidth;
			} else if (offLeft){
				this.x = 0;
			} else if (offTop){
				this.y = 0;
			} else if (offBottom){
				this.y = this.cHeight;
			}
		}
		else if (this.boundAction == "BOUNCE"){
			if (offLeft){
				this.dx = -this.dx;
				if (this.x - (this.sizeX / 2) < 0){
					this.x = this.sizeX / 2;
				}
			} else if (offRight){
				this.dx = -this.dx;
				if (this.x + (this.sizeX / 2) > this.cWidth){
					this.x = this.cWidth - (this.sizeX / 2);
				}
			}
			if (offTop){
				this.dy = -this.dy;
				if (this.y - (this.sizeY / 2) < 0){
					this.y = this.sizeY / 2;
				}
			} else if (offBottom){
				this.dy= -this.dy;
				if (this.y + (this.sizeY / 2) > this.cHeight){
					this.y = this.cHeight - (this.sizeY / 2);
				}
			}
		}
		else if (this.boundAction == "STOP"){
			if (offBottom || offTop || offLeft || offRight){
				this.speed = 0;
				this.ddx = 0;
				this.ddy = 0;
				this.onGround = true;
			}
		}
		else if (this.boundAction == "DIE"){
			if (offBottom || offTop || offLeft || offRight){
				this.visable = false;
			}
		}
		else if (this.boundAction == "CONTINUE"){
			if (offRight){
				this.x = 0;
			} else if (offLeft){
				this.x = cWidth;
			} else if (offTop){
				this.y = cHeight;
			} else if (offBottom){
				this.y = 0;
			}
		}
		else if (this.boundAction == "FLOOR_ONLY"){
			if (offRight){
				this.x = 0;
			} else if (offLeft){
				this.x = this.cWidth;
			}
			if (offBottom){
				if (this.speed != 0){this.setSpeed(0);}
				if (this.ddx != 0){this.ddx = 0;}
				if (this.dx != 0){this.dx = 0;}
				if (this.dy != 0){this.dy = 0;}
				this.y = this.cHeight - (this.sizeY / 2);
				//console.log("cHeight  - (this.sizeY / 2):  " + (this.cHeight - (this.sizeY / 2)));
				//console.log("y = " + this.y);
				this.onGround = true;
			}
		}
		else {}//continue forever
	}
	this.collidesWith = function(otherSprite){
		if (this.visable){
			if (otherSprite.visable){
				if (this.x + (this.sizeX / 2) < otherSprite.x - (otherSprite.sizeX / 2)){ return false;} //my right bigger than your left
				if (this.x - (this.sizeX / 2) > otherSprite.x + (otherSprite.sizeX / 2)){ return false;} //your right bigger than my left
				if (this.y + (this.sizeY / 2) < otherSprite.y - (otherSprite.sizeY / 2)){ return false;} //my bottom lower (higher value) than your top
				if (this.y - (this.sizeY / 2) > otherSprite.y + (otherSprite.sizeY / 2)){ return false;} //my top higher (lower value) than your bottom
				return true;
			}
		}
		
	}
	this.distanceTo = function(otherSprite){
		differenceX = this.X - otherSprite.X;
		differenceY = this.Y - otherSprite.Y;
		return Math.sqrt((differenceX * differenceX) + (differenceY * differenceY));
	}
	this.angleTo = function(otherSprite){
		myX = this.x + (this.sizeX/2);
		myY = this.y + (this.sizeY/2);
		otherX = sprite.x + (otherSprite.sizeX/2);
		otherY = sprite.y + (otherSprite.sizeY/2);
		
		diffX = myX - otherX;
		diffY = myY - otherY;
		return radToDeg(Math.atan2(diffY, diffX)); //return degrees
	}
	this.degToRad = function(degrees){
		degrees -= 180;
		return degrees * Math.PI / 180;
	}
	this.radToDeg = function(rad){
		rad = rad * 180 / Math.PI;
		return rad + 180;
	}
	
}//end sprite


function sound(){}
function timer(){}
function inputs(){} //command pattern, detach inputs from the actions they would each perform

function delay(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

//keyboard constants
K_A = 65; K_B = 66; K_C = 67; K_D = 68; K_E = 69; K_F = 70; K_G = 71;
K_H = 72; K_I = 73; K_J = 74; K_K = 75; K_L = 76; K_M = 77; K_N = 78;
K_O = 79; K_P = 80; K_Q = 81; K_R = 82; K_S = 83; K_T = 84; K_U = 85;
K_V = 86; K_W = 87; K_X = 88; K_Y = 89; K_Z = 90;
K_LEFT = 37; K_RIGHT = 39; K_UP = 38;K_DOWN = 40; K_SPACE = 32;
K_ESC = 27; K_PGUP = 33; K_PGDOWN = 34; K_HOME = 36; K_END = 35;
K_0 = 48; K_1 = 49; K_2 = 50; K_3 = 51; K_4 = 52; K_5 = 53;
K_6 = 54; K_7 = 55; K_8 = 56; K_9 = 57; 

//boundary action constants
WRAP = 0; BOUNCE = 1; STOP = 3; DIE = 4; CONTINUE = 5; FLOOR_ONLY = 6; 