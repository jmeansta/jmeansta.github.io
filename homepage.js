var pbList = document.getElementsByClassName("projectBox")

s = "10px auto "
for (var i = pbList.length - 1; i >= 0; i--) {
	s = s + "10px auto "
}
document.body.style.gridTemplateRows = s;

// at 600 px wide it starts to look weird: you should switch to mobile layout
// To switch, take the p and h1 out of the div, and style the p with grid-column: 1/3;

for (var i = pbList.length - 1; i >= 0; i--) {
	pbList[i].style.gridRowStart = 2*(i+2);
	pbList[i].style.gridRowEnd = 2*(i+2);
	pbInnerDiv = apnd("div",pbList[i])
	moveNode(pbList[i].querySelector("h1"),pbInnerDiv)
	moveNode(pbList[i].querySelector("p"),pbInnerDiv)
	// still need to move and format the link
	// alert(i)
}

function apnd(nodeType,appendTo) {
    var node = document.createElement(nodeType);
    // node.id = nodeId; // pass nodeId to re-enable
    appendTo.appendChild(node);
    return node
}

function moveNode(node,newContainer) {
  newContainer.appendChild(node.cloneNode(true));
  node.remove();
} 

// the js ultimately needs to:
// - wrap h1 and p in each projectbox in a div (really just format the box for mobile/desktop)
// - assign each projectbox a row in the grid
// - dynamically update the number of rows the grid has