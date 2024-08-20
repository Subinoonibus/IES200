const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function perguntar(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function calcularSalario() {
    try {
        const codigo = parseInt(await perguntar("Digite o código do funcionário: "));
        const horas = parseFloat(await perguntar("Número de Horas Trabalhadas no mês: "));
        const salarioMinimo = parseFloat(await perguntar("Valor do salário-mínimo: "));

        console.log("Escolha seu Turno:");
        console.log("M. Matutino");
        console.log("V. Vespertino");
        console.log("N. Noturno");

        console.log("Escolha sua Categoria:");
        console.log("F. Funcionário");
        console.log("G. Gerente");

        const categoria = await perguntar("Qual sua Categoria (F/G): ");
        const turno = await perguntar("Qual seu Turno (M/V/N): ");

        let valorHora;
        
        switch (categoria.toUpperCase()) {
            case 'F':
                switch (turno.toUpperCase()) {
                    case 'M':
                        valorHora = 0.1 * salarioMinimo;
                        break;
                    case 'V':
                        valorHora = 0.12 * salarioMinimo;
                        break;
                    case 'N':
                        valorHora = 0.15 * salarioMinimo;
                        break;
                    default:
                        console.log("Turno inválido.");
                        return;
                }
                break;
            case 'G':
                switch (turno.toUpperCase()) {
                    case 'M':
                        valorHora = 0.2 * salarioMinimo;
                        break;
                    case 'V':
                        valorHora = 0.25 * salarioMinimo;
                        break;
                    case 'N':
                        valorHora = 0.3 * salarioMinimo;
                        break;
                    default:
                        console.log("Turno inválido.");
                        return;
                }
                break;
            default:
                console.log("Categoria inválida.");
                return;
        }

        const salarioInicial = valorHora * horas;

        let auxilioAlimentacao;
        if (salarioInicial <= 2 * salarioMinimo) {
            auxilioAlimentacao = 0.15 * salarioInicial;
        } else if (salarioInicial <= 4 * salarioMinimo) {
            auxilioAlimentacao = 0.10 * salarioInicial;
        } else {
            auxilioAlimentacao = 0.05 * salarioInicial;
        }

        const salarioFinal = salarioInicial + auxilioAlimentacao;

        console.log(`Código do Funcionário: ${codigo}`);
        console.log(`Número de Horas Trabalhadas: ${horas}`);
        console.log(`Valor da Hora Trabalhada: R$ ${valorHora.toFixed(2)}`);
        console.log(`Salário Inicial: R$ ${salarioInicial.toFixed(2)}`);
        console.log(`Auxílio-Alimentação: R$ ${auxilioAlimentacao.toFixed(2)}`);
        console.log(`Salário Final: R$ ${salarioFinal.toFixed(2)}`);

        return salarioFinal;

    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

async function slarioTotal() {
    let continuar = true;
    let totalSalarioFinal = 0;

    while (continuar) {
        const salarioFinal = await calcularSalario();
        if (salarioFinal !== undefined) {
            totalSalarioFinal += salarioFinal;
        }

        const resposta = await perguntar("Deseja calcular o salário para outro funcionário? (s/n): ");
        continuar = resposta.toLowerCase() === 's';
    }

    console.log(`Salário Total Pago pela Empresa: R$ ${totalSalarioFinal.toFixed(2)}`);
    rl.close();
}

slarioTotal();

