const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const classificacoes = [
    { limite: 5, descricao: 'F' },
    { limite: 6, descricao: 'E' },
    { limite: 7, descricao: 'D' },
    { limite:8, descricao: 'C' },
    { limite: 9, descricao: 'B' },
    { limite: 10, descricao: 'A' } 
];
