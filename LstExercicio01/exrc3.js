const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function vldNota(nota) {
    return nota >= 0 && nota <= 10;
}

function vldPeso(peso) {
    return peso > 0;
}

function calcularMedia(nota1, peso1, nota2, peso2, nota3, peso3) {
    const mediaPonderada = (nota1 * peso1 + nota2 * peso2 + nota3 * peso3) / (peso1 + peso2 + peso3);

    const classificacoes = [
        { limite: 10, descricao: "A" },
        { limite: 9, descricao: "B" },
        { limite: 8, descricao: "C" },
        { limite: 7, descricao: "D" },
        { limite: 6, descricao: "E" },
        { limite: 5, descricao: "F" }
    ];

    const desempenho = classificacoes.find(d => mediaPonderada >= d.limite).descricao;

    console.log(`A média ponderada do aluno é ${mediaPonderada.toFixed(2)} sendo classificada como ${desempenho}`);
}

function perguntarNotasEPesos() {
    rl.question('Digite a Nota 1: ', (nota1) => {
        nota1 = parseFloat(nota1);
        if (!vldNota(nota1)) {
            console.log('Nota inválida! Insira uma nota entre 0 e 10.');
            return perguntarNotasEPesos();
        }
        rl.question('Digite o Peso da Nota 1: ', (peso1) => {
            peso1 = parseFloat(peso1);
            if (!vldPeso(peso1)) {
                console.log('Peso inválido! Insira um peso maior que 0.');
                return perguntarNotasEPesos();
            }
            rl.question('Digite a Nota 2: ', (nota2) => {
                nota2 = parseFloat(nota2);
                if (!vldNota(nota2)) {
                    console.log('Nota inválida! Insira uma nota entre 0 e 10.');
                    return perguntarNotasEPesos();
                }
                rl.question('Digite o Peso da Nota 2: ', (peso2) => {
                    peso2 = parseFloat(peso2);
                    if (!vldPeso(peso2)) {
                        console.log('Peso inválido! Insira um peso maior que 0.');
                        return perguntarNotasEPesos();
                    }
                    rl.question('Digite a Nota 3: ', (nota3) => {
                        nota3 = parseFloat(nota3);
                        if (!vldNota(nota3)) {
                            console.log('Nota inválida! Insira uma nota entre 0 e 10.');
                            return perguntarNotasEPesos();
                        }
                        rl.question('Digite o Peso da Nota 3: ', (peso3) => {
                            peso3 = parseFloat(peso3);
                            if (!vldPeso(peso3)) {
                                console.log('Peso inválido! Insira um peso maior que 0.');
                                return perguntarNotasEPesos();
                            }
                            calcularMedia(nota1, peso1, nota2, peso2, nota3, peso3);
                            rl.close();
                        });
                    });
                });
            });
        });
    });
}

perguntarNotasEPesos();