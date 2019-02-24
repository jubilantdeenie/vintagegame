// Randomize enemies.

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 

}
 
// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
	this.x;
	this.y;
	this.speed;
	
	
};

// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {
	
	if (this.x > 550 || this.x < -150) { 
			
			if(this.speed < 0){
				this.speed = getRandomIntInclusive(2, 8);
			}
			else{
				this.speed = getRandomIntInclusive(-2, -8);
			}
			
	
		if (this.speed > 0) {
			this.sprite = 'images/enemy-bug.png';
		} else {
			this.sprite = 'images/enemy-bug2.png';
		}  
	
	}
		
	this.x += this.speed;
		
};


// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function() {
	
    this.sprite = 'images/char-princess-girl.png';
	this.x = 200;
	this.y = 400;
	this.speed = 0;
	
};


// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
	
	player.speed = player.speed * dt;
    
	for (i = 0; i < allEnemies.length; i++) {
		
		if (Math.abs(player.x - allEnemies[i].x) <= 25 &&
			Math.abs(player.y - allEnemies[i].y) <= 25)  {
			player.x = 200;
			player.y = 400;
		}
		
	} 
	
	//Winning conditions
	if (player.y <= 10) {
		
		//Winner modal pop-up by W3. https://www.w3schools.com/howto/howto_css_modals.asp
		let modal = document.getElementById('myModal');
		modal.style.display = 'block';
					
		let span = document.getElementById('close');
	

		//	When the user clicks anywhere outside of the modal, close it
		span.onclick = function(event) {
			modal.style.display = 'none';
		}
		
		player.y = 400;
	
	}
	
};


// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	
};


//Move player
// handleInput method source attribution https://medium.com/letsboot/classic-arcade-game-with-js-5687e4125169
Player.prototype.handleInput = function(playerInput) {
	
	 if (playerInput == 'left' && this.x > 0) {
        this.x -= 5;
    }

    if (playerInput == 'right' && this.x < 405) {
        this.x += 5;
    }

    if (playerInput == 'up' && this.y > 0) {
        this.y -= 5;
    }

    if (playerInput == 'down' && this.y < 405) {
        this.y += 5;
    }

};


// Instantiate enemies
let allEnemies = [];

var enemy;
   
for (i = 0; i < 10; i++){
	enemy = new Enemy();
	enemy.x = -150;
	enemy.speed = getRandomIntInclusive(2, 7);
	
	if (i <= 3){
		enemy.y = 60;
	}
	else if (i <= 6){
		enemy.y = 140;
	}
	else {
		enemy.y = 225;
	}
	
	if (i % 2){
		enemy.x = 550;
		enemy.sprite = 'images/enemy-bug2.png';
	}
	
	allEnemies.push(enemy);
}


// Instantiate player 
var player = new Player();


// Keypress listener 
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

   player.handleInput(allowedKeys[e.keyCode]);
   
 }); 