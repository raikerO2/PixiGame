<html>
<head>
	<link rel="stylesheet" type="text/css" href="style.css">
	<title>Pixi First Game</title>
</head>
<body>
<script src="bin/pixi.js"></script>
<script>
"use strict";

	//Shorcut Keys.
	let Container = PIXI.Container,
	Texture 	  = PIXI.Texture,
	TextureCache  = PIXI.utils.TextureCache,
	loader 		  = PIXI.loader,
	gpuCorrector  = PIXI.SCALE_MODES.NEAREST,
	Rectangle 	  = PIXI.Rectangle,
	BaseTexture   = PIXI.BaseTexture,
	Sprite 		  = PIXI.Sprite;



	//left,right,up,down Keys.
	let w = 87,
		a = 65,
		s = 83,
		d = 68;

	//Global variables
	let state, skeleton;

	//Caching the textures.
	let base 	= new BaseTexture("sprites_1.json"),
		texture = new Texture(base),
		sprite 	= new Sprite(texture);

	//Creating the canvas
	let stage 	= new Container(),
	 renderer 	= PIXI.autoDetectRenderer(512,512);
		document.body.appendChild(renderer.view);

	//Loading the assets with the PIXI.loader.
	loader
		.add("sprites_1.json")
		.on("progress", onLoadEventHandler)
		.load(setup);

	//Console.log assets progress/file.
	function onLoadEventHandler(loader, resource){
		console.log(`progress: ${loader.progress}`);
		console.log(`asset: ${resource.url}`);
	}


	//Constructs the assets using a setup function.
	function setup(){

		//Texture atlas function.
		function frame(source, x, y, width, height){
			let texture, imageFrame;
		if(typeof source === "string"){
			if(TextureCache[source]){
				texture = new Texture(TextureCache[source]);
			}

		}else if(source instanceof Texture){
				texture = new Texture(source);
		}if(!texture){
			console.log(`Please load the asset: ${source}`);
		}else{
		imageFrame 		= new Rectangle(x, y, width, height);
		texture.frame 	= imageFrame;

		texture.baseTexture.scaleMode 
						= gpuCorrector;

			return texture;
		}
	  }

	  //Creating the assets.
	   let dungeon 	= new Sprite(frame("dungeon.png",1,36,512,512));
	   let door 	= new Sprite(frame("doorClosed.png",66,1,32,32));
	   skeleton 	= new Sprite(frame("skeleton.png",1,1,29,32));
	   let treasure = new Sprite(frame("treasure.png",32,1,32,32));

	   //Default asset Velocity
	   skeleton.vx 	= 0;
	   skeleton.vy 	= 0;

	   skeleton.accelerationX = 0;
	   skeleton.accelerationY = 0;
	   skeleton.frictionX = 1;
	   skeleton.frictionY = 1;

	   skeleton.speed = 0.2;
	   skeleton.drag = 0.98;

	   //Positioning the assets.
	  door.position.set(32,1);
	  treasure.position.set(renderer.view.width / 2 - treasure.width / 2 + 150,
	  						renderer.view.height / 2 - treasure.height / 2);
	  skeleton.position.set(renderer.view.width /2 - skeleton.width /2 - 150,
	  						renderer.view.height / 2 - skeleton.height /2);

	  //Inserting assets to the stage element.
	  stage.addChild(dungeon);
	  stage.addChild(door);
	  stage.addChild(skeleton);
	  stage.addChild(treasure);

	  //Inheriting a method for each keypressr
	  let up 	= keyboard(w),
	  	left 	= keyboard(a),
	  	down    = keyboard(s),
	  	right 	= keyboard(d);

	  //Up key movement.
	  up.press = () => {
	  	skeleton.accelerationY = -skeleton.speed;
	  	skeleton.frictionY = 1;
	  };
	  up.release = () => {
	  	if(!down.isDown){
	  		skeleton.accelerationY = 0;
	  		skeleton.frictionY = skeleton.drag;
	  	}
	  };

	  //Left key movement.
	  left.press = () => {
	  	skeleton.accelerationX = -skeleton.speed;
	  	skeleton.frictionX = 1;
	  };
	  left.release = () => {
	  	if(!right.isDown){
	  		skeleton.accelerationX = 0;
	  		skeleton.frictionX = skeleton.drag;
	  	}
	  };

	  //Right key movement.
	  right.press = () => {
	  	skeleton.accelerationX = skeleton.speed;
	  	skeleton.frictionX = 1;
	  };
	  right.release = () => {
	  	if(!left.isDown){
	  		skeleton.accelerationX = 0;
	  		skeleton.frictionX = skeleton.drag;
	  	}
	  };

	  //Down key movement.
	  down.press = () => {
	  	skeleton.accelerationY = skeleton.speed;
	  	skeleton.frictionY = 1;
	  };
	  down.release = () => {
	  	if(!up.isDown){
	  		skeleton.accelerationY = 0;
	  		pixie.frictionY = pixie.drag;
	  	}
	  };

	  //Outputing the assets.
	  state = play;
	  gameLoop();
	}

	//Loop function 60fps
	function gameLoop(){
		requestAnimationFrame(gameLoop);

		state();
		renderer.render(stage);
		console.log("FPS");
	}

	//A function play that moves the assets.
	function play(){
		skeleton.vx += skeleton.accelerationX;
		skeleton.vy += skeleton.accelerationY;

		skeleton.vx *= skeleton.frictionX;
		skeleton.vy *= skeleton.frictionY;

		skeleton.x += skeleton.vx;
		skeleton.y += skeleton.vy;
	}

	//Keyboard function that holds the handlers.
	function keyboard(keyCode){
		let key 	= {};
		key.code 	= keyCode;
		key.isUp 	= true;
		key.isDown  = false;
		key.release = undefined;
		key.press 	= undefined;

		key.upHandler = event => {
			if(event.keyCode === key.code){
				if(key.isDown && key.release){
					key.release();
				}
				key.isUp = true;
				key.isDown = false;
			}
			event.preventDefault();
		};

		key.downHandler = event => {
			if(event.keyCode === key.code){
				if(key.isUp && key.press){
					key.press();
				}
				key.isUp = false;
				key.isDown = true;
			}
			event.preventDefault();
		};

		window.addEventListener("keydown", key.downHandler.bind(key), false);
		window.addEventListener("keyup", key.upHandler.bind(key), false);

		return key;

	}

</script>
</body>
</html>