//document.onLoad = function() {setupPuzzle};
var gridSize = 3;
if (gridSize > 9) {
	alert("error: your grid is too large");
} else {

var puzzleContainer = document.getElementById("puzzleContainer");
var holeX
var holeY

function setupPuzzle() {
	console.log("The puzzle is being set up");
	apnd("table","mainTable","puzzleContainer");
	var tileNumberer = 1;
	var tileTemp
	for (var i=0; i<gridSize; i++) {
		apnd("tr","row-" + i,"mainTable");
		for (var j=0; j<gridSize; j++) {
			tileTemp = apnd("td","cell-" + j + "-" + i,"row-" + i);
			tileTemp.className = "gridSquare";
			// tileTemp.width = 70;
			// tileTemp.height = 70;
			tileTemp.x = j;
			tileTemp.y = i;
			tileTemp.onclick = function() {checkMoves(this.x,this.y)};

			imgTemp = document.createElement("img")
			imgTemp.id = "img-" + j + "-" + i;
			imgTemp.width = 65;
			imgTemp.height = 65;
			tileTemp.appendChild(imgTemp)

			if (tileNumberer != gridSize * gridSize) {
				// tileTemp.innerHTML = tileNumberer + "a"; //this needs to be changed to allow images
				imgTemp.src = "iya" + tileNumberer + ".png";
				imgTemp.alt = tileNumberer;
				tileNumberer++;
			} else {
				// tileTemp.innerHTML = ""; // this needs to be changed to allow images
				holeX = tileTemp.x;
				holeY = tileTemp.y;
			}
		}
	}
	console.log("Puzzle setup complete");
}
function shufflePuzzle() {
	console.log("Shuffling the puzzle");
	var randX;
	var randY;
	for (var i = 0; i < 100 * gridSize * gridSize; i++) {
		randX = Math.round(Math.random() * (gridSize - 1));
		/*while(randX <= 0) {
			randX = Math.round(Math.random() * gridSize - 1);
		}*/
		randY = Math.round(Math.random() * (gridSize - 1));
		/*while(randY <= 0) {
			randY = Math.round(Math.round() * gridSize - 1);
		}*/
		checkMoves(randX, randY);
	}
}
}

function checkMoves(x,y) {
	//console.log("cell at x=" + x + ", and y=" + y);
	if (holeX == x && holeY < y){
		//console.log("this tile can be moved up");
		move("up",x,y);
	} else if (holeX == x && holeY > y){
		//console.log("this tile can be moved down");
		move("down",x,y);
	} else if (holeX < x && holeY == y) {
		// console.log("this tile can be moved left");
		move("left",x,y);
	} else if (holeX > x && holeY == y) {
		// console.log("this tile can be moved right");
		move("right",x,y);
	} else {
		console.log("this tile cannot be moved");
	}
}

function move(direction,clickedX,clickedY) {
	switch(direction) {
		case "down":
			console.log("moving down");
			console.log("clickedX=" + clickedX + " and clickedY=" + clickedY);
			for (var i = holeY; i > clickedY; i--) {
				console.log("cell-" + clickedX + "-" + i + " is being replaced with cell-" + clickedX + "-" + (i-1));
				document.getElementById("cell-" + clickedX + "-" + i).innerHTML = document.getElementById("cell-" + clickedX + "-" + (i-1)).innerHTML;
				//document.getElementsByClassName("gridSquare").length
			}
			document.getElementById("cell-" + clickedX + "-" + i).innerHTML = "";
			holeY = i;
			break;
		case "up":
			console.log("moving up");
			console.log("clickedX=" + clickedX + " and clickedY=" + clickedY);
			for (var i = holeY; i < clickedY; i++) {
				console.log("cell-" + clickedX + "-" + i + " is being replaced with cell-" + clickedX + "-" + (i+1));
				document.getElementById("cell-" + clickedX + "-" + i).innerHTML = document.getElementById("cell-" + clickedX + "-" + (i+1)).innerHTML;
				//document.getElementsByClassName("gridSquare").length
			}
			document.getElementById("cell-" + clickedX + "-" + i).innerHTML = "";
			holeY = i;
			break;
		case "right":
			console.log("moving right");
			console.log("clickedX=" + clickedX + " and clickedY=" + clickedY);
			for (var i = holeX; i > clickedX; i--) {
				console.log("cell-" + i + "-" + clickedY + " is being replaced with cell-" + (i-1) + "-" + clickedY);
				document.getElementById("cell-" + i + "-" + clickedY).innerHTML = document.getElementById("cell-" + (i-1) + "-" + clickedY).innerHTML;
				//document.getElementsByClassName("gridSquare").length
			}
			document.getElementById("cell-" + i + "-" + clickedY).innerHTML = "";
			holeX = i;
			break;
		case "left":
			console.log("moving left");
			console.log("clickedX=" + clickedX + " and clickedY=" + clickedY);
			for (var i = holeX; i < clickedX; i++) {
				console.log("cell-" + i + "-" + clickedY + " is being replaced with cell-" + (i+1) + "-" + clickedY);
				document.getElementById("cell-" + i + "-" + clickedY).innerHTML = document.getElementById("cell-" + (i+1) + "-" + clickedY).innerHTML;
				//document.getElementsByClassName("gridSquare").length
			}
			document.getElementById("cell-" + i + "-" + clickedY).innerHTML = "";
			holeX = i;
			break;
	}
}

function apnd(nodeType,nodeId,appendTo) {
	var node = document.createElement(nodeType);
  	//var textnode = document.createTextNode(nodeContent);
  	//node.appendChild(textnode);
  	node.id = nodeId;
  	document.getElementById(appendTo).appendChild(node);
  	return node;
}

function $(id) {
	document.getElementById(id);
}