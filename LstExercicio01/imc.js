const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calcularIMC(peso, altura) {
    let alturaM = altura / 100;
    return peso / (alturaM * alturaM);
}

function classificarIMC(imc) {
    if (imc < 16.0) {
        return "Baixo peso muito grave";
    } else if (imc >= 16.0 && imc < 16.99) {
        return "Baixo peso grave";
    } else if (imc >= 17.0 && imc < 18.49) {
        return "Baixo peso";
    } else if (imc >= 18.5 && imc < 24.99) {
        return "Peso normal";
    } else if (imc >= 25.0 && imc < 29.99) {
        return "Sobrepeso";
    } else if (imc >= 30.0 && imc < 34.99) {
        return "Obesidade grau I";
    } else if (imc >= 35.0 && imc < 39.99) {
        return "Obesidade grau II";
    } else {
        return "Obesidade grau III";
    }
}

rl.question("Digite o seu nome: ", (nome) => {
    rl.question("Digite a sua altura em centímetros: ", (altura) => {
        rl.question("Digite o seu peso em kg: ", (peso) => {

            alturaCm = parseInt(altura);
            peso = parseInt(peso);

            let imc = calcularIMC(peso, altura);

            let classificacao = classificarIMC(imc);

            console.log(nome + ` possui um Indice de Massa Corporal igual a ` + imc.toFixed(2) + ', sendo classificado como: ' + classificacao);


            rl.close();
        });
    });
});

