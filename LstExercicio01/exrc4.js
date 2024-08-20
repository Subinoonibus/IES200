const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const precosPorRegiao = {
  '1': 1.20,
  '2': 1.10,
  '3': 1.15,
};

const descontosPorRegiao = {
  '1': 0.12,
  '2': 0.10,
  '3': 0.08,
};

const precoCombustivelPorLitro = 0.00;

function pergunta(query) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function solicitarRastreamento() {
  while (true) {
    const resposta = await pergunta('Você deseja rastrear a entrega? ([s] para Sim/[n] para Não): ');
    if (resposta.toLowerCase() === 's') {
      return 200.00;
    } else if (resposta.toLowerCase() === 'n') {
      return 0; 
    } else {
      console.log('Resposta inválida. Por favor, responda "s" ou "n".');
    }
  }
}

async function processarDados() {
  try {
    const numeroDePecas = parseInt(await pergunta('Digite o número de peças: '));
    if (isNaN(numeroDePecas) || numeroDePecas < 0) throw new Error('Número de peças inválido.');

    const taxaRastreamento = await solicitarRastreamento();
    const regiao = (await pergunta('Escolha uma região (1: Sudeste, 2: Sul, 3: Centro-Oeste): ')).toLowerCase();
    if (!precosPorRegiao.hasOwnProperty(regiao)) throw new Error('Região inválida.');

    const precoPorPeca = precosPorRegiao[regiao];
    const desconto = numeroDePecas > 1000 ? descontosPorRegiao[regiao] : 0;
    const distancia = parseFloat(await pergunta('Digite a distância até o destino em quilômetros: '));
    if (isNaN(distancia) || distancia < 0) throw new Error('Distância inválida.');

    const custoSemDesconto = numeroDePecas * precoPorPeca;
    const valorDesconto = custoSemDesconto * desconto;
    const custoComDesconto = custoSemDesconto - valorDesconto;
    const custoTotal = custoComDesconto + taxaRastreamento;
    const consumoCombustivel = distancia;
    const custoCombustivel = consumoCombustivel * precoCombustivelPorLitro;

    console.log(`O custo total para ${numeroDePecas} peças, com desconto de R$${valorDesconto.toFixed(2)} e taxa de rastreamento de R$${taxaRastreamento.toFixed(2)}, é: R$${custoTotal.toFixed(2)}.`);
    console.log(`O custo estimado do combustível para a distância de ${distancia} km é: R$${custoCombustivel.toFixed(2)}.`);
    console.log(`Custo total incluindo o combustível: R$${(custoTotal + custoCombustivel).toFixed(2)}.`);
  } catch (error) {
    console.error(error.message);
  } finally {
    rl.close();
  }
}

processarDados();