function getHistory() {
	return document.getElementById("history-value").innerText;
}

function printHistory(num) {
	document.getElementById("history-value").innerText = num;
}

function getOutput() {
	return document.getElementById("output-value").innerText;
}

function printOutput(num) {//mostra na tela de resultado o que for passado como parâmetro no 'num'. Caso não haja valor, não aparece zero, a tela fica vazia. 
	if (num == "") {
		document.getElementById("output-value").innerText = num;
	}
	else {
		document.getElementById("output-value").innerText = getFormattedNumber(num);
	}
}

function getFormattedNumber(num) {//altera o que estiver sendo passado por parâmetro no 'num' para formato de número e depois esse número para formato de String. Haja um número negativo na tela, o sinal de negativa sera detectado como NaN (not a number), então o if 
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}

function reverseNumberFormat(num) {//retira as vírgulas do valor passado por parâmetro em 'num'
	return Number(num.replace(/,/g, ''));
}

var operator = document.getElementsByClassName("operator");//cria um vetor para a classe de operadores em que cada elemento será um botão operador.
for (var i = 0; i < operator.length; i++) {//cria um 'for' para adicionar de uma vez só o evento de ouvir o clique para todos os botões de operador do vetor criado anteriormente, já criando a função que será realizada no clique.
	operator[i].addEventListener('click', function () {
		if (this.id == "clear") {//se for o botão de limpar, zera histórico e resultado
			printHistory("");
			printOutput("0");
		}
		else if (this.id == "backspace") {//se for botão de apagar vai pegar o que está na tela de resultado, tirar as vírgulas e passar tudo pra String e jogar na variável output local. Se houver algum valor nessa String criada, irá remover o último número e então jogar na função de imprimir no Output para sair na tela em formato de número.
			var output = reverseNumberFormat(getOutput()).toString();
			if (output) {
				output = output.substr(0, output.length - 1);
				if (output != "") {
					printOutput(output);
				}
				else {
					printOutput("0")
				}
			}
		}
		else {
			var output = getOutput();
			var history = getHistory();
			if (output == "" && history != "") {
				if (isNaN(history[history.length - 1])) {
					history = history.substr(0, history.length - 1);
				}
			}
			if (output != "" || history != "") {
				output = output == "" ? output : reverseNumberFormat(output);
				history = history + output;
				if (this.id == "=") {
					var result = eval(history);
					printOutput(result);
					printHistory("");
				}
				else {
					history = history + this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
	});
}

var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {//cria um 'for' para adicionar de uma vez só o evento de ouvir o clique para todos os botões de número do vetor criado anteriormente, já criando a função que será realizada no clique.
	number[i].addEventListener('click', function () {
		var output = reverseNumberFormat(getOutput());//pega o que está na tela de resultado, tira as vírgulas e joga para a variável output
		if (output != NaN) { //Se output é um número
			output = output + this.id;//vai adicionando o número do botão ao número que está na tela
			printOutput(output);//imprime na tela o que está na variável local output
		}
	});
}

document.getElementById(".").addEventListener('click', function(){
	var output = getOutput();
	output = output + this.id;
	printOutput(output);
});
