function getHistory() {
	return document.getElementById("history-value").innerText;
}

function printHistory(num) {
	document.getElementById("history-value").innerText = num;
}

function getOutput() {
		return document.getElementById("output-value").innerText;
}

function printOutput(num) {
	if (num == "0") {
		document.getElementById("output-value").innerText = "0";
	}
	else if (num == "") {
		document.getElementById("output-value").innerText = "";
	}
	else if (num == ".") {
		document.getElementById("output-value").innerText = ".";
	}
	else{
		document.getElementById("output-value").innerText = num;
	}	
}

var clicked_number = false;
var screen = "";
var memory = "";
var op1 = "";
var op2 = "";

var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
	operator[i].addEventListener('click', function () {
		if (this.id == "clear") {
			printHistory("");
			printOutput("0");
		}
		else if (this.id == "backspace") {
			var output = getOutput().toString();
			if (output!="0") {
				output = output.substr(0, output.length - 1);
				printOutput(output);
				clicked_number = true;
				if (output == ""|| output=="-") {
					printOutput("0");
					clicked_number = true;
				}
			}
		}
		else {
			memory = Number(screen);
			screen = Number(getOutput());
			op2 = op1;
			op1 = this.id;
			var output = getOutput();
			var history = getHistory();
			if (clicked_number==false&&this.id!="="&&getHistory()!="") {
				history = history.substr(0, history.length - 1);
				printHistory(history+this.id);
			}
			else {
				history = history + output + this.id;
				printHistory(history);
				switch(op2) {
					case "+":
						printOutput(memory + screen);
						break;
					case "-":
						printOutput(memory - screen);
						break;
						case "*":
						printOutput(memory * screen);
						break;
					case "/":
						printOutput(memory / screen);
						break;
						case "%":
						printOutput(memory/100*screen);
						break;
				}
				clicked_number=false;
				screen = Number(getOutput());
				if(this.id=="="){
					printHistory("");
				}
			}
		}
	});
}

var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
	number[i].addEventListener('click', function () {
		if (getOutput()=="0"){
			printOutput("");
		}
		if(clicked_number==false){
			printOutput("");
		}
		clicked_number = true;
		var output = getOutput();
		output = Number(output + this.id);
		if(output==""){
			printOutput("0");
		}
		else{
			printOutput(output);
		}
	});
}

document.getElementById(".").addEventListener('click', function () {
	if(clicked_number==false){
		printOutput("0.")
		clicked_number = true;
	}
	if(getOutput()==""){
		printOutput("0.");
		clicked_number = true;
	}
	else if(getOutput().includes(".")){}
	else {
	 var output = getOutput();
	 output = output + this.id;
	 printOutput(output);
	}
});