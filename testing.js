//Inside the setup function
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let skeleton,state;

skeleton.vx = 0;
skeleton.vy = 0;
skeleton.x = renderer.view.width / 2 - skeleton.width / 2;
skeleton.y = renderer.view.height / 2 - skeleton.height / 2;

let left  = keyboard(65),
		right = keyboard(68),
		up    = keyboard(87),
		down  = keyboard(83);

	//left
	left.press = () => {
		skeleton.vx = -2;
		skeleton.vy = 0;
	};
	left.release = () => {
		if(!right.isDown && skeleton.vy === 0){
			skeleton.vx = 0;
		}
	};

	//right
	right.press = () => {
		skeleton.vx = 2;
		skeleton.vy = 0;
	}
	right.release = () => {
		if(!left.isDown && skeleton.vy === 0) {
			skeleton.vx = 0;
		}
	}

	//up
	up.press = () => {
		skeleton.vy = -2;
		skeleton.vx = 0;
	}
	up.release = () => {
		if(!down.isDown && skeleton.vx === 0) {
			skeleton.vy = 0;
		}
	}

	//down
	down.press = () => {
		skeleton.vy = 2;
		skeleton.vx = 0;
	}
	down.release = () => {
		if(!up.isDown && skeleton.vx === 0) {
			skeleton.vy = 0;
		}
	}


	 state = play;
	 gameLoop();

	 //Outside the setup function
	 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	 function gameLoop(){
		requestAnimationFrame(gameLoop);
		state();

		renderer.render(stage);
	}

	function play(){

		skeleton.x += skeleton.vx;
		skeleton.y += skeleton.vy;
	}

	function keyboard(keyCode){
		let key = {};
		key.code = keyCode;
		key.isDown = false;
		key.isUp = true;
		key.press = undefined;
		key.release = undefined;

		key.downHandler = event => {
			if(event.keyCode === key.code) {
				if(key.isUp && key.press){
					key.press();
				}
				key.isDown = true;
				key.isUp = false;
			}
			event.preventDefault();
		};

		key.upHandler = event => {
			if(event.keyCode === key.code) {
				if(key.isDown && key.release){
					key.release();
				}
				key.isUp = true;
				key.isDown = false;
			}
			event.preventDefault();
		};

		window.addEventListener(
			"keydown", key.downHandler.bind(key), false
			);
		window.addEventListener(
			"keyup", key.upHandler.bind(key), false
			);

		return key;

	}
