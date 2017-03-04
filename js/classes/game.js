var Game = function (){
}	
Game.prototype.setVariables = function(title, boardHth, boardWth){
	this.title = title;
	this.boardHth = boardHth;
	this.boardWth = boardWth;
	this.values = [];
	for(x=0; x<boardHth; x++){
		this.values.push([]);
	}
	this.tries = boardWth * boardHth;
}
Game.prototype.setValues = function(){
	for(var x = 0; x < this.boardHth; x++){
		for(var y = 0; y < this.boardWth; y++){
			this.values[x][y] = ' ';
		}
	}
}