function getHistory() {
	return document.getElementById("history-value").innerText;
}

function printHistory(num) {
	document.getElementById("history-value").innerText = num;
}

function getOutput() {
	n = document.getElementById("hidden-output-value").innerText;
	if (Number(n) >= 1 && n.substr(0, 1) == "0") {
		return n.substr(1, 30);
	}
	else {
		return n;
	}
}

function printOutput(num) {
	if (num == "") {
		document.getElementById("output-value").innerText = "";
	}
	else if (num == ".") {
		document.getElementById("output-value").innerText = ".";
	}
	else if (num.endsWith(".")) {
		document.getElementById("output-value").innerText = getFormattedNumber(num) + ".";
	}
	else {
		document.getElementById("output-value").innerText = getFormattedNumber(num);
	}
	document.getElementById("hidden-output-value").innerText = num;
}

function getFormattedNumber(num) {
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}

var clicked_number = false;

var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
	operator[i].addEventListener('click', function () {
		if (this.id == "clear") {
			clicked_number = false;
			printHistory("");
			printOutput("");
		}
		else if (this.id == "backspace") {
			var output = getOutput().toString();
			if (output) {
				output = output.substr(0, output.length - 1);
				if (output != "") {
					printOutput(output);
					clicked_number = true;
				}
				else {
					clicked_number = false;
					printOutput("")
				}
			}
		}
		else {
			var output = getOutput();
			var history = getHistory();
			if (clicked_number==false) {
				history = history.substr(0, history.length - 1);
			}
			if (output != "" || history != "") {
				history = history + output;
				if (this.id == "=") {
					var result = eval(history).toString();
					printOutput(result);
					printHistory("");
					clicked_number = false;
				}
				else {
					history = history + this.id;
					printHistory(history);
					printOutput("");
					clicked_number = false;
				}
			}
			else if (output == "" && history == "" && this.id == "-") {
				printHistory(this.id);
			}
		}
	});
}

var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
	number[i].addEventListener('click', function () {
			clicked_number = true;
			var output = getOutput();
			output = output + this.id;
			printOutput(output);
	});
}

document.getElementById(".").addEventListener('click', function () {
	var output = getOutput();
	output = output + this.id;
	printOutput(output);
});