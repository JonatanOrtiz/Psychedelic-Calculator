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
	if (num == "") {
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
				if (output == "") {
					printOutput("0");
					clicked_number = true;
				}
			}
		}
		else {
			var output = getOutput();
			var history = getHistory();
			if (clicked_number==false&&this.id!= "=") {
				history = history.substr(0, history.length - 1);
				printHistory(getOutput()+history+this.id);
				printOutput("");
			}
			else if (this.id == "=") {
				history = history + output;
				var result = eval(history).toString();
				if(isNaN(result)){
					printOutput("Indefinido");
				}
				else{
				printOutput(result);
				printHistory("");
				}
			}
			else {
				history = history + output + this.id;
				printHistory(history);
				printOutput("");
				clicked_number=false;
			}
		}
	});
}

var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
	number[i].addEventListener('click', function () {
		if (getOutput()=="0"){
			printOutput("")
		}
		clicked_number = true;
		var output = getOutput();
		output = Number(output + this.id);
		if(output==""){
			printOutput("0")
		}
		else{
			printOutput(output);
		}
	});
}

document.getElementById(".").addEventListener('click', function () {
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