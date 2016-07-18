(function(){
	
	var module = {}
	
	module.clearGame = function(){
		this.direction = Pacman.config.direction;
		this.blocksMatrix = [];
		this.enemies = [];
		this.userLineX = Pacman.config.userLineX;
		this.userLineY = Pacman.config.userLineY;
		this.userPosition = {
				x: Pacman.config.userPosition.x,
				y: Pacman.config.userPosition.y
		};
	};
	
	module.setGame = function(){
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 4; j++){
				this.blocksMatrix.push({
					top: (i+1)*Pacman.config.blockDistance + i*Pacman.config.blockSize,
					left: (j+1)*Pacman.config.blockDistance + j*Pacman.config.blockSize
				});
			}
		}
		
		for(var i = 0; i < 5; i++){
			this.enemies.push({
				color: Pacman.config.colors.enemies[i],
				x: i*54 + 90,
				y: i*60 + 270,
				movingStack: 0
			});
		}
	};
	
	module.stopGame = function(){
		var r = confirm("Gameover! Start again?");
		clearInterval(this.activeGameInterval);
		if (r == true) {	
			this.loadGame();
		}
	};
	
	module.getRandomMoving = function(){
		var directionNumber = Math.ceil(Math.random()*4);
		var moveObj = {
				x: 0,
				y: 0
		}
		switch(directionNumber){
			case 1:
				moveObj.y = -5;
				break;
			case 2:
				moveObj.x = 5;
				break;
			case 3:
				moveObj.y = 5;
				break;
			case 4:
				moveObj.x = -5;
				break;
		}
		return moveObj;
	};
	
	module.loadGame = function() {
		this.clearGame();
		this.setGame();
		this.redrawTable();
		var me = this;
		this.activeGameInterval = setInterval(function(){
			me.enemies.forEach(function(enemyItem){
				me.moveEnemyItem(enemyItem);
			})
			me.redrawTable();
		}, 200);
	};
	
	module.moveEnemyItem = function(enemyItem){
		if(enemyItem.movingStack == 0 || enemyItem.movingStack > 10) {
			if(enemyItem.movingStack > 10){
				enemyItem.movingStack = 0;
			}
			enemyItem.move = this.getRandomMoving();
		}
		
		var direction = '';
		
		if(enemyItem.move.x != 0){
			direction = enemyItem.move.x > 0 ? 'r' : 'l'; 
		} else {
			direction = enemyItem.move.y > 0 ? 'b' : 't';
		}
		
		enemyItem.movingStack++;
		if(this.checkEnemyDirection(direction, enemyItem)){
			enemyItem.x+=enemyItem.move.x;
			enemyItem.y+=enemyItem.move.y;
		} else {
			enemyItem.move = this.getRandomMoving();
			this.moveEnemyItem(enemyItem);
		}
	};
	
	module.checkEnemyDirection = function(direction, enemyItem){
		var blockSize = Pacman.config.blockSize;
		switch(direction){
			case 'l':
				if(enemyItem.x<20){
					return false;
				}
				break;
			case 'r':
				if(enemyItem.x>450){
					return false;
				}
				break;
			case 't':
				if(enemyItem.y<50){
					return false;
				}
			case 'b':
				if(enemyItem.y>500){
					return false;
				}
				break;
		}
		var available = true;
		this.blocksMatrix.forEach(function(blockItem){
			switch(direction){
				case 'l':
				case 'r':
					if(blockItem.top <= enemyItem.y + 5 && blockItem.top + blockSize > enemyItem.y - 2 * 5){
						available = false;
					}
					break;
				case 't':
				case 'b':
					if(blockItem.left <= enemyItem.x + 5 && blockItem.left + blockSize > enemyItem.x - 2 * 5){
						available = false;
					}
					break;
			}
		});
		return available;
	};
	
	function drawDots(){
	    for(var i=0;i<8;i++){
	    	ctx.fillRect(51+i*16,35,4,4);
	    }
	
		for(i=0;i<6;i++){
	        ctx.fillRect(115,51+i*16,4,4);
		}
	
		for(i=0;i<8;i++){
	        ctx.fillRect(51+i*16,99,4,4);
		}	
	}
	
	module.checkMatrixColision = function(direction){
		var available = true;
		var me = this;
		this.blocksMatrix.forEach(function(blockItem){
			switch(direction){
				case 'l':
				case 'r':
					if(blockItem.top <= me.userPosition.y + Pacman.config.userSize && blockItem.top + Pacman.config.blockSize > me.userPosition.y - 2 * Pacman.config.userSize){
						available = false;
					}
					break;
				case 't':
				case 'b':
					if(blockItem.left <= me.userPosition.x + Pacman.config.userSize && blockItem.left + Pacman.config.blockSize > me.userPosition.x - 2 * Pacman.config.userSize){
						available = false;
					}
					break;
			}
		});
		return available;
	};
	
	module.moveLeft = function(){
		if(Pacman.config.playgroundRange.left <= Pacman.config.userPosition.x - Pacman.config.movingStep && this.checkMatrixColision('l')){
			this.userPosition.x-=Pacman.config.movingStep;
			this.userLineX-=Pacman.config.movingStep;
			this.direction = 'l';
			this.redrawTable();
		}
	};
	module.moveRight = function(){
		if(Pacman.config.playgroundRange.right >= Pacman.config.userPosition.x + Pacman.config.movingStep && this.checkMatrixColision('r')){
			this.userPosition.x+=Pacman.config.movingStep;
			this.userLineX+=Pacman.config.movingStep;
			this.direction = 'r';
			this.redrawTable();
		}
	};
	module.moveTop = function(){
		if(Pacman.config.playgroundRange.top <= Pacman.config.userPosition.y - Pacman.config.movingStep && this.checkMatrixColision('t')){
			this.userPosition.y-=Pacman.config.movingStep;
			this.userLineY-=Pacman.config.movingStep;
			this.direction = 't';
			this.redrawTable();
		}
	};
	module.moveBottom = function(){
		if(Pacman.config.playgroundRange.bottom >= Pacman.config.userPosition.y + Pacman.config.movingStep && this.checkMatrixColision('b')){
			this.userPosition.y+=Pacman.config.movingStep;
			this.userLineY+=Pacman.config.movingStep;
			this.direction = 'b';
			this.redrawTable();
		}
	};
	
	module.checkEnd = function(userPosition){
		var userDead = false;
		var me = this;
		this.enemies.forEach(function(enemy){
			//user dolazi sa desne strane
			if(userPosition.x > enemy.x && userPosition.x < enemy.x + 20){
				//user dolazi odozdo
				if(userPosition.y > enemy.y && userPosition.y < enemy.y + 20){
					userDead = true;
				}
				//user dolazi odozgo
				if(userPosition.y + 20 > enemy.y && userPosition.y + 20 < enemy.y + 20){
					userDead = true;
				}
			}
			//user dolazi sa leve strane
			if(userPosition.x < enemy.x + 20 && userPosition.x > enemy.x){
				//user dolazi odozdo
				if(userPosition.y > enemy.y && userPosition.y < enemy.y + 20){
					userDead = true;
				}
				//user dolazi odozgo
				if(userPosition.y + 20 > enemy.y && userPosition.y + 20 < enemy.y + 20){
					userDead = true;
				}
			}
		});
		if(userDead){
			this.stopGame();
		}
	};
	
	module.movePlayer = function(event){
		switch(event.keyCode){
			case 37:
				this.moveLeft();
				break;
			case 38:
				this.moveTop();
				break;
			case 39:
				this.moveRight();
				break;
			case 40:
				this.moveBottom();
				break;
		}
	};
	
	window.Pacman = window.Pacman || {};
	Pacman = Object.assign(Pacman, module);
	
}());