/*
	Ideas:
*/

var nightMode = false;
var buttonsDoCopy = true;
document.onload = $n("nightMode")[0].checked = false; $n("copytype")[0].checked = true; $n("copytype")[1].checked = false;

charList = ["⁰","¹","²","³","⁴","⁵","⁶","⁷","⁸","⁹","br","₀","₁","₂","₃","₄","₅","₆","₇","₈","₉","br","⁻","⁺","⁼","₋","₊","₌","±","∓","br","×","÷","•","≠","≤","≥","√","∛","∜","∫","°","br","→","←","⇄","br","½","⅓","⅔","¼","¾","br","∂","∇","br","Α","α","Β","β","Γ","γ","Δ","δ","Ε","ε","Ζ","ζ","Η","η","Θ","θ","Ι","ι","Κ","κ","Λ","λ","Μ","μ","Ν","ν","Ξ","ξ","Ο","ο","Π","π","Ρ","ρ","Σ","σ","Τ","τ","Υ","υ","Φ","φ","Χ","χ","Ψ","ψ","Ω","ω"];

for (var i = 0; i < charList.length; i++) {
	if (charList[i] == 'br') {
		apnd("br","","putButtonsHere")
	} else {
		curButton = apnd("div","","putButtonsHere");
		curButton.classList = ["copyButton"];
		curButton.innerHTML = charList[i];
		curButton.addEventListener("click", setInput);
	}
}

function toggleNightMode() {
	copyButtons = document.getElementsByClassName("copyButton");
	labels = document.getElementsByTagName("label");
	if (nightMode) {
		for (var i = 0; i < copyButtons.length; i++) {
			copyButtons[i].style.borderColor = "black";
			copyButtons[i].style.color = "black";
		}
		for (var i = 0; i < labels.length; i++) {
			labels[i].style.color = "black";
		}
		document.bgColor = "white";
		$i("input").style.color = "black";
		$i("input").style.backgroundColor = "white";
		nightMode = false;
	} else {
		for (var i = 0; i < copyButtons.length; i++) {
			copyButtons[i].style.borderColor = "white";
			copyButtons[i].style.color = "white";
		}
		for (var i = 0; i < labels.length; i++) {
			labels[i].style.color = "white";
		}
		document.bgColor = "black";
		$i("input").style.color = "white";
		$i("input").style.backgroundColor = "black";
		nightMode = true;
	}
}

function apnd(nodeType,nodeId,appendTo) {
	var node = document.createElement(nodeType);
	node.id = nodeId;
	document.getElementById(appendTo).appendChild(node);
	return node;
}

function setInput() {
	// console.log("running setInput() with " + this.innerHTML);
	if (buttonsDoCopy) {
		$i("input").value = this.innerHTML;
		var copyText = document.querySelector("#input");
		copyText.select();
		document.execCommand("copy");
	} else {
		$i("input").value = $i("input").value + this.innerHTML;
		$i("input").focus()
	}	
}

console.log("imported")
var unicodeData;

var oReq = new XMLHttpRequest();
console.log(oReq)
oReq.onload = reqListener;
console.log(oReq)
oReq.open("get", "unicodeData.json", true);
console.log(oReq)
oReq.send();
console.log(oReq)
// Maybe this only works on a server?

function reqListener(e) {
    unicodeData = JSON.parse(this.responseText);
}

function copyTextbox() {
	var copyText = document.querySelector("#input");
	copyText.select();
	document.execCommand("copy");
}

function clearTextbox() {$i("input").value = "";}

function buttonsCopy() {buttonsDoCopy = true; $i("copyTextboxContentsButton").hidden = true;}

function buttonsType() {buttonsDoCopy = false;$i("copyTextboxContentsButton").hidden = false;}

function $i(id) {return document.getElementById(id);}

function $n(name) {return document.getElementsByName(name);}