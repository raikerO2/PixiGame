//This code goes inside the play() function.


let playerCollision = contain(player,{x:0, y:0, width:renderer.view.width, height:renderer.view.height});


if(playerCollision){

if(playerCollision.has("left") || playerCollision.has("right")){
	player.vx = 0;
}

if(playerCollision.has("top") || playerCollision.has("bottom")){
	player.vy = 0;
}
}



function contain(sprite, container){

	var collision = new Set();

	if(sprite.x < container.width){
		sprite.x = container.width;
		collision.add("left");
	}

	if(sprite.y < container.height){
		sprite.y = container.height;
		collision.add("top");
	}

	if(sprite.x + container.width > container.width){
		sprite.x = container.width - sprite.x;
		collision.add("right");
	}

	if(sprite.y + container.height > container.height){
		sprite.y = container.height - sprite.y;
		collision.add("bottom");
	}

	if(collision.size == 0){
		collision = undefined;
	}

	return collision;
}
