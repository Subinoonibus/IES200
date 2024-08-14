const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const faixasEtarias = [
    { limite: 12, descricao: 'Criança' },
    { limite: 17, descricao: 'Adolescente' },
    { limite: 64, descricao: 'Adulto' },
    { limite: Infinity, descricao: 'Idoso' } // Usamos Infinity para capturar todas as idades acima de 64
];

function classificarFaixaEtaria(idade) {
    for (const faixa of faixasEtarias) {
        if (idade <= faixa.limite) {
            return faixa.descricao;
        }
    }
}

function idadeValida(callback) {
    rl.question("Insira seu nome: ", (nome)=>{
        rl.question("Insira sua idade: ", (input)=>{
            const idade = parseInt(input)

            if (!Number.isInteger(idade) || idade < 0) {
                console.log('Por favor, insira um número inteiro positivo.');
                idadeValida(callback);
            } else {
                callback(idade);
            }
        })
    })
}

idadeValida((idade) => {
    const resultado = classificarFaixaEtaria(idade);
    console.log( nome + ` tem ` + idade + " e é classificado como: " + faixaetaria);

    rl.close();
});

