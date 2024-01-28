//SISTEMA BOM DIA | BOA TARDE | BOA NOITE

// Declaração de variaveis para pegar o elemento do html e definir a hora atual.
const greetingElement = document.getElementById("greeting");
const currentHour = new Date().getHours();

// Função para interpretar qual a melhor mensagem baseado na hora atual
const greetingMessage =
currentHour >= 5 && currentHour < 12
    ? "Bom dia!"
    : currentHour >= 12 && currentHour < 18
    ? "Boa tarde!"
    : "Boa noite!";

// Exibe a mensagem no HTML
greetingElement.textContent = greetingMessage;