(function(){
	
	var module = {};
	
	module.canvas = document.getElementById('canvas');
	module.ctx = this.canvas.getContext('2d');
	module.eating = false;
	
	module.roundedRect = function(x, y, width, height, radius, color){
		this.ctx.beginPath();
		this.ctx.moveTo(x,y+radius);
		this.ctx.lineTo(x,y+height-radius);
		this.ctx.arcTo(x,y+height,x+radius,y+height,radius);
		this.ctx.lineTo(x+width-radius,y+height);
		this.ctx.arcTo(x+width,y+height,x+width,y+height-radius,radius);
		this.ctx.lineTo(x+width,y+radius);
		this.ctx.arcTo(x+width,y,x+width-radius,y,radius);
		this.ctx.lineTo(x+radius,y);
		this.ctx.arcTo(x,y,x,y+radius,radius);
		this.ctx.stroke();

		this.ctx.fillStyle = color;
		this.ctx.fill();
	}
	
	module.redrawTable = function(){
		var userSize = Pacman.config.userSize;
		var userLineX = Pacman.config.userLineX;
		var userLineY = Pacman.config.userLineY;
		
		this.checkEnd(this.userPosition);
		
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		this.roundedRect(12,12,500,500,15, Pacman.config.colors.table);
		
		var me = this;
		this.blocksMatrix.forEach(function(blockItem){
			me.roundedRect(blockItem.left, blockItem.top, 60, 60, 16, Pacman.config.colors.blocks);
	    });
		
		var mouth;
		switch(this.direction){
			case 'r':
				mouth = {
					start: Math.PI/7,
					end: -Math.PI/7
				}
				break;
			case 'l':
				mouth = {
					start: Math.PI/7 + Math.PI,
					end: -Math.PI/7 + Math.PI
				}
				break;
			case 't':
				mouth = {
					start: Math.PI/7 + Math.PI*1.5,
					end: -Math.PI/7 + Math.PI*1.5
				}
				break;
			case 'b':
				mouth = {
					start: Math.PI/7 + Math.PI/2,
					end: -Math.PI/7 + Math.PI/2
				}
				break;
		}
		
		if(this.eating){
			mouth.start -= 0.3;
			mouth.end += 0.3;
		}
		this.eating = !this.eating;
		
		this.ctx.beginPath();
		this.ctx.arc(this.userPosition.x, this.userPosition.y, userSize, mouth.start, mouth.end, false);
		this.ctx.lineTo(this.userLineX, this.userLineY);
	    
		this.ctx.fillStyle = Pacman.config.colors.user;
		this.ctx.fill();
		
		for(var i = 0; i < this.enemies.length; i++){
			this.drawEnemy(this.enemies[i]);
		}
	}
	
	module.drawEnemy = function(enemyConfig){
		var ctx = this.ctx;
		ctx.fillStyle = enemyConfig.color;
		ctx.beginPath();
		var x = enemyConfig.x;
		var y = enemyConfig.y;
		//kapa
	    ctx.moveTo(x, y);
	    ctx.lineTo(x, y-14);
	    ctx.bezierCurveTo(x, y-22, x+3, y-28, x+14, y-28);
	    ctx.bezierCurveTo(x+22, y-28, x+28, y-22, x+28, y-14);
	    ctx.lineTo(x+28, y);
	    
	    //recke
	    ctx.lineTo(x+23.333, y-4.666);
	    ctx.lineTo(x+18.666, y);
	    ctx.lineTo(x+14, y-4.666);
	    ctx.lineTo(x+9.333, y);
	    ctx.lineTo(x+4.666, y-4.666);
	    ctx.lineTo(x, y);
	    ctx.fill();
	
	    //beonjace
	    ctx.fillStyle = "white";
	    ctx.beginPath();
	    
	    ctx.moveTo(x+8, y-20);
	    ctx.bezierCurveTo(x+5, y-20, x+4, y-17, x+4, y-15);
	    ctx.bezierCurveTo(x+4, y-13, x+5, y-10, x+8, y-10);
	    ctx.bezierCurveTo(x+11, y-10, x+12, y-13, x+12, y-15);
	    ctx.bezierCurveTo(x+12, y-17, x+11, y-20, x+8, y-20);
	    
	    ctx.moveTo(x+20, y-20);
	    ctx.bezierCurveTo(x+17, y-20, x+16, y-17, x+16, y-15);
	    ctx.bezierCurveTo(x+16, y-13, x+17, y-10, x+20, y-10);
	    ctx.bezierCurveTo(x+23, y-10, x+24, y-13, x+24, y-15);
	    ctx.bezierCurveTo(x+24, y-17, x+23, y-20, x+20, y-20);
	    
	    ctx.fill();
	
	    //zenice
	    ctx.fillStyle = "black";
	    ctx.beginPath();
	    ctx.arc(x+18, y-14, 2, 0, Math.PI*2, true);
	    ctx.fill();
	
	    ctx.beginPath();
	    ctx.arc(x+6, y-14, 2, 0, Math.PI*2, true);
	    ctx.fill();
	}
	
	window.Pacman = window.Pacman || {};
	Pacman = Object.assign(Pacman, module);
}());