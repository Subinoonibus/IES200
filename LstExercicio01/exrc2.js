const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const faixasEtarias = [
    { limite: 15, descricao: 'Criança' },
    { limite: 30, descricao: 'Joven' },
    { limite: 60, descricao: 'Adulto' },
    { limite: 120, descricao: 'Idoso' } 
];

function classificarFaixaEtaria(idade) {
    for (const faixa of faixasEtarias) {
        if (idade <= faixa.limite) {
            return faixa.descricao;
        }
    }
}

function obterEntradaValida(prompt, validaFuncao, callback) {
    rl.question(prompt, (input) => {
        if (validaFuncao(input)) {
            callback(input);
        } else {
            console.log('Entrada inválida. Tente novamente.');
            obterEntradaValida(prompt, validaFuncao, callback);
        }
    });
}

function validarIdade(input) {
    const idade = parseInt(input, 10);
    return Number.isInteger(idade) && idade >= 0;
}

function obterInformacoesUsuario() {
    obterEntradaValida('Digite seu nome: ', (input) => input.trim() !== '', (nome) => {
        obterEntradaValida('Digite sua idade: ', validarIdade, (idade) => {
            const faixaEtaria = classificarFaixaEtaria(parseInt(idade, 10));
            console.log(`${nome} tem ${idade} anos e é classificado como: ${faixaEtaria}`);
            rl.close();
        });
    });
}

obterInformacoesUsuario();