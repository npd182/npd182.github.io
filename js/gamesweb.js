var player;
var color;
var winner;
var firstTime = true;
var game = new Game();
function initGame(title, boardHth, boardWth){
	game.setVariables(title, boardHth, boardWth);
	game.setValues();
	winner = false;
	switch(game.title){
		case 'connect4':
			player = 'red';
			color = 'FF0000';
			$('#title').html('Connect 4');
			break;
		case 'tictactoe':
			player = 'X';
			$('#title').html('Tic Tac Toe');
			break;
	}
	printMessage();
	if(firstTime){
		$("#reset").show();
		if(game.title == 'connect4'){
			renderButtons();
			$("#board").show();
		}
		renderBoard();
		firstTime = false;
	}
	else{
		if(game.title == 'connect4'){
			$(".boardC4").css("background-color",'#FFFFFF');
			$(".placerButton").css("background-color",'#'+color);
		}
		else if(game.title == 'tictactoe'){
			for (var x = 0; x < game.boardWth; x++) {
				for (var y = 0; y < game.boardHth; y++){
				printMark(x,y);
				}
			}
		}
	}
	if(game.title == 'connect4'){
		$("#tictactoe").hide();
		$("#connect4").html("Start again!");
	}
	else if(game.title == 'tictactoe'){
		$("#connect4").hide();
		$("#tictactoe").html("Start again!");	
	}
}

function printMessage(){
	if(!winner){
		if(game.tries > 0){
			$("#message").html("It's player "+player+" turn!");
		}
		else{
			$("#message").html("It's a draw! Try again!");
		}
	}
	else{
		$("#message").html("Player "+player+" is the winner!");
	}
}

function renderBoard(){
	var board = "";
	for (var i = 0; i < game.boardHth; i++) {
		for (var c = 0; c < game.boardWth; c++){
			if(game.title == 'connect4'){
				board += "<button class=\"boardC4\" id=\""+i+""+c+"\" type=\"button\" disabled></button>";
			}
			else if(game.title == 'tictactoe'){
				board += "<button class=\"boardTTT\" id=\""+i+""+c+"\" type=\"button\" onClick='placeMark("+i+","+c+")'>"+game.values[i][c]+"</button>";	
			}
		}
	board += "<br>";
	}
	if(game.title == 'connect4'){
		$("#board").html(board);
	}
	else if(game.title == 'tictactoe'){
		$("#panel").html(board);
		drawBoardLines();
	}
}

function renderButtons(){
	var buttons = "";
	for (var i = 0; i < game.boardWth; i++){
		buttons += "<button class=\"placerButton\" type=\"button\" onClick='placeToken("+i+")'>V</button>";
	}
	$("#pButtons").html(buttons);
}

function placeToken(x){
	for(var y=5; y >= 0; y--){
		if (!winner && game.tries>0 && game.values[y][x] == ' '){
			game.values[y][x] = player;
			$("#"+y+""+x).css("background-color",'#'+color);
			checkIfWinner(y,x);
			if(!winner){
				changePlayer();
				game.tries--;
				$(".placerButton").css("background-color",'#'+color);			
			}
			printMessage();
			break;
		}
		else{
			if(winner){
				alert("There is already a winner!");
				break;
			}
		}
	}
}

function printMark(x,y){
	$("#"+x+""+y).html(game.values[x][y]);
}

function placeMark(x,y){
	if(!winner && game.tries>0 && game.values[x][y] == ' '){
		game.values[x][y] = player;
		checkIfWinner(x,y);
		if(!winner){
			changePlayer();
		}
		game.tries--;
		printMark(x,y);
		printMessage();
	}
	else{
		if(winner){
			alert("There is already a winner!");
		}
		else{
			alert("You can't place a mark where there is already one!");			
		}
	}
}

function changePlayer(){
	switch(game.title){
		case 'connect4':
			if (player == 'red'){
				player = 'yellow';
				color = 'FFF000';
			} 
			else{
			player = 'red';
			color = 'FF0000';
			}
			break;
		case 'tictactoe':
			if (player == 'X'){
				player = 'O';
			} 
			else{
			player = 'X';
			}	
			break;
	}	
}

function checkIfWinner(y,x){
	var col = row = diag1 = diag2 = rdiag1 = rdiag2 = '';
	var winCon = '';
	var con;
	switch(game.title){
		case 'connect4':
			con = 4;
			break;
		case 'tictactoe':
			con = 3;
			break;
	}
	for (var c = 0; c < con; c++){
		winCon += player;
	}
	
	for (var i = 0; i < game.boardWth; i++){
		row += game.values[y][i];
	}

	for (var i = 0; i < game.boardHth; i++){
		col += game.values[i][x];
	}
	switch(game.title){
		case 'connect4':
			for (var c = 0; c < 4; c++){
				if(y <=2 && x <= 3){
					diag1 += game.values[y+c][x+c];
				}
				if(y >= 3&& x >= 3){
					diag2 += game.values[y-c][x-c];
				}
				if(y >= 3 && x <= 3){
					rdiag1 += game.values[y-c][x+c];
				}
				if(y <=2 && x >=3){
					rdiag2 += game.values[y+c][x-c];
				}
			}
			break;
		case 'tictactoe':
			for (var c = 0; c < 3; c++){
				diag1 += game.values[c][c];
				rdiag1 += game.values[c][(3-(c+1))];
			}
			break;
	}
	if (row.indexOf(winCon) > -1 || col.indexOf(winCon) > -1
		||rdiag1.indexOf(winCon) > -1 || rdiag2.indexOf(winCon) > -1 
		|| diag1.indexOf(winCon) > -1 || diag2.indexOf(winCon) > -1){
		winner = true;
	}

}

function drawBoardLines(){  //making the tic tac toe board (borders on the edges are the same colour as the background)
	$('#00').css("border-left", "3px solid darkgrey");
	$('#00').css("border-top", "3px solid darkgrey");
	$('#00').css("border-right", "3px solid black");
	$('#00').css("border-bottom", "3px solid black");
	$('#01').css("border-left", "3px solid black");
	$('#01').css("border-bottom", "3px solid black");
	$('#01').css("border-right", "3px solid black");
	$('#01').css("border-top", "3px solid darkgrey");
	$('#02').css("border-left", "3px solid black");
	$('#02').css("border-bottom", "3px solid black");
	$('#02').css("border-top", "3px solid darkgrey");
	$('#02').css("border-right", "3px solid darkgrey");
	$('#10').css("border-top", "3px solid black");
	$('#10').css("border-right", "3px solid black");
	$('#10').css("border-bottom", "3px solid black");
	$('#10').css("border-left", "3px solid darkgrey");
	$('#11').css("border-bottom", "3px solid black");
	$('#11').css("border-right", "3px solid black");
	$('#11').css("border-top", "3px solid black");
	$('#11').css("border-left", "3px solid black");
	$('#12').css("border-bottom", "3px solid black");
	$('#12').css("border-left", "3px solid black");
	$('#12').css("border-top", "3px solid black");
	$('#12').css("border-right", "3px solid darkgrey");
	$('#20').css("border-top", "3px solid black");
	$('#20').css("border-right", "3px solid black");
	$('#20').css("border-bottom", "3px solid darkgrey");
	$('#20').css("border-left", "3px solid darkgrey");
	$('#21').css("border-bottom", "3px solid darkgrey");
	$('#21').css("border-left", "3px solid black");
	$('#21').css("border-top", "3px solid black");
	$('#21').css("border-right", "3px solid black");
	$('#22').css("border-left", "3px solid black");
	$('#22').css("border-top", "3px solid black");
	$('#22').css("border-bottom", "3px solid darkgrey");
	$('#22').css("border-right", "3px solid darkgrey");
}

function resetPage(){
	firstTime = true;
	$("#pButtons").html('');
	$("#panel").html('');
	$("#board").html('');
	$('#title').html('Games Web');
	$("#message").html('Select game:');
	$(".backBoard").hide();
	$("#tictactoe").show();
	$("#connect4").show();
	$("#connect4").html("Connect 4");
	$("#tictactoe").html("Tic Tac Toe");
	$("#reset").hide();
}