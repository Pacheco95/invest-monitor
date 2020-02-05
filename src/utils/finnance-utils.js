function formatCurrency(amount, decimalCount = 2, decimal = ",", thousands = ".") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e);
  }
}

function montante(pv, rate, aporte, n) {
  rate = 1 + rate;
  const poweredRate = rate ** n;

  return poweredRate * pv + aporte * ((1 - poweredRate) / (1 - rate));
}

/**
 * Calcula o valor do aporte para conseguir atingir um determinado
 * valor em um tempo e taxa de juros pré determinados.
 * Ex: desejo ter um milhão de reais daqui a 10 anos com um investimento de rentabilidade a
 *     16% a.a. com uma quantia inicial de 10 mil reais :)
 * É só chamar a função assim: aporte(10000, 0.16, 1e6, 10)
 * A rentabilidade e o período devem estar na mesma unidade de tempo
 * @param {number} pv quanto de grana vc tem hoje
 * @param {number} rate rentabilidade anual em %
 * @param {number} fv quanto de grana vc quer ter
 * @param {number} n durante quantos meses vai investir
* @returns {number} o quanto você deve aportar mensalmente para conseguir a grana
 */
function aporte(pv, rate, fv, n) {

  if (rate === 0) {
    return (fv - pv) / n;
  }

  rate = rate + 1;
  let poweredRate = rate ** n;

  return (fv - (poweredRate * pv)) / ((1 - poweredRate) / (1 - rate))
}

module.exports = {
  aporte,
  formatCurrency,
  montante
};
