const inAdultos = document.querySelector("#inAdultos"); // quantidade de adultos
const inCriancas = document.querySelector("#inCriancas"); // quantidade de criancas
const inHoras = document.querySelector("#inHoras"); // duração do churrasco
const btCalcular = document.querySelector("#btCalcular"); // botão do evento
const containerResposta = document.querySelector("#containerResposta");
const itensTransp = document.querySelectorAll(".transparente"); // exibição da resposta
const outCarne = document.querySelector("#outCarne"); // exibição da quantidade de carne
const outCerveja = document.querySelector("#outCerveja"); // exibição da quantidade de cerveja
const outRefri = document.querySelector("#outRefri"); // exibição da quantidade de refri

btCalcular.addEventListener("click", exibirConsumo);

function exibirConsumo() {
    const adultos = Number(inAdultos.value);
    const criancas = Number(inCriancas.value);
    const horas = Number(inHoras.value);

    if (adultos <= 0 || horas <= 0 || criancas < 0) { // Se algum número for inválido (adultos ou hora igual ou menor que zero, e crinacas < 0)
        document.querySelector("#adv").textContent = `Informe um número válido`;
        limparAdv(); // Chama função para limpar o campo de #adv após passar um 1.2 segundos
        inAdultos.focus();
        return; // Aborta a execução do resto do código
    }

    const consumoCarne = calcularConsumoCarne(adultos, criancas, horas);
    const consumoRefri = calcularConsumoRefri(adultos, criancas, horas);
    const consumoCerveja = calcularConsumoCerveja(adultos, horas);

    const carne = consumoCarne > 999 ? `${(consumoCarne / 1000).toFixed(1)}kg` : `${consumoCarne}gr`;
    const refri = consumoRefri > 999 ? `${(consumoRefri / 1000).toFixed(1)}L` : `${consumoRefri}ml`;
    const cerveja = consumoCerveja > 999 ? `${(consumoCerveja / 1000).toFixed(1)}L` : `${consumoCerveja}ml`;

    mudarClasse();

    document.querySelector("#outCarne").textContent = `${carne} de Carne`
    document.querySelector("#outCerveja").textContent = `${cerveja} de Cerveja`
    document.querySelector("#outRefri").textContent = `${refri} de Refrigerante ou Água`
}

function calcularConsumoCarne(a, c, h) {
    const consumoAdulto = 80; // consumo de carne por hora por adulto (80g a cada hora)
    const consumoAdultoSeis = 110; // consumo de carne por hora por adulto se a duração for maior que 6
    const consumoCrianca = consumoAdulto / 2; // consumo por crianca (metade do adulto)
    const consumoCriancaSeis = consumoAdultoSeis / 2;
    const total = h >= 6 ? (consumoAdultoSeis * a * h) + (consumoCriancaSeis * c * h) : (consumoAdulto * a * h) + (consumoCrianca * c * h);
    return total;
}

function calcularConsumoRefri(a, c, h) {
    const refriAdulto = 200; // consumo de agua ou refri por adulto (200ml a cada hora)
    const refriAdultoSeis = 250; // consumo de agua ou refri por adulto apos seis horas
    const refriCrianca = refriAdulto / 2; // consumo por crianca (metade do adulto)
    const refriCriancaSeis = refriAdultoSeis / 2;
    const total = h >= 6 ? (refriAdultoSeis * a * h) + (refriCriancaSeis * c * h) : (refriAdulto * a * h) + (refriCrianca * c * h);
    return total;
}

function calcularConsumoCerveja(a, h) {
    const consumoCerveja = 240; // Consumo de cerveja por adulto (240 a cada hora)
    const consumoCervejaSeis = 330; // Consumo de cerveja por adulto se a duração for maior que 6
    const total = h >= 6 ? consumoCervejaSeis * a * h : consumoCerveja * a * h;
    return total;
}

function limparAdv() {
    setTimeout(() => {
        document.querySelector("#adv").textContent = ``;
    }, 1200);
}

function mudarClasse() {
    containerResposta.classList.add("exibido");
    containerResposta.classList.remove("oculto");

    for (let i = 0; i < itensTransp.length; i++) {
        setTimeout(() => {
            itensTransp[i].classList.add(`transicao`);
            itensTransp[i].classList.remove("transparente");
        }, i + "000");
    }
}