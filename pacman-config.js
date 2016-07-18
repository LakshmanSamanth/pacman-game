(function(){
	
	var module = {};
	
	module.direction = 'r';
	module.userPosition = {
			x: 37,
			y: 37
	};
	
	module.userLineX = 37;
	module.userLineY = 37;
	module.movingStep = 8;
	module.userSize = 20;
	module.blockDistance = 70;
	module.blockSize = 40;
	
	module.colors = {
			table: "#ccffcc",
			blocks: "#009900",
			user: "#ffa64d",
			enemies: ['purple','grey','red', 'yellow', 'blue']
	};
	
	module.playgroundRange = {
			top: 25,
			left: 25,
			right: 500,
			bottom: 500
	};
	
	window.Pacman = window.Pacman || {};
	Pacman.config = module;
}());