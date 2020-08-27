const formatAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
}).format;

function format(number) {
    return formatAmount(number);
}

function getVolumeCredits(perfAudience) {
    return Math.max(perfAudience - 30, 0);
}

function getComedyVolumeCredits(perfAudience) {
    return Math.floor(perfAudience / 5);
}

function getTragedyAmount(type, audienceNum) {
  let amount  = 40000;
  if (audienceNum > 30) {
    amount += 1000 * (audienceNum - 30);
  }
  return amount;
}

function getComedyAmount(type, audienceNum) {
  let amount = 30000;
  if (audienceNum > 20) {
     amount += 10000 + 500 * (audienceNum - 20);
  }
  amount += 300 * audienceNum;
  return amount;
}

function getAmount(type, audienceNum) {
    if (type === 'tragedy') {
        return getTragedyAmount(type, audienceNum);
    } else if (type === 'comedy') {
        return getComedyAmount(type, audienceNum);
    } else {
        throw new Error(`unknown type: ${type}`);
    }
}

function getTotalAmountResult(totalAmount) {
    return `Amount owed is ${format(totalAmount / 100)}\n`;
}

function getCreditsResult(volumeCredits) {
    return `You earned ${volumeCredits} credits \n`;
}

function getOnePlayResult(playName, thisAmount, perfAudience) {
    return ` ${playName}: ${format(thisAmount / 100)} (${perfAudience} seats)\n`;
}

function getCustomerResult(invoice) {
    return `Statement for ${invoice}\n`;
}

function statement(invoice, plays) {
    let totalAmount = calculateTotalAmount(invoice.performances, plays);
    let volumeCredits = 0;
    let result = getCustomerResult(invoice.customer);
    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        volumeCredits += getVolumeCredits(perf.audience);
        if ('comedy' === play.type) volumeCredits += getComedyVolumeCredits(perf.audience);
    }
    result +=generatePerformance(invoice.performances, plays);
    result += getTotalAmountResult(totalAmount);
    result += getCreditsResult(volumeCredits);
    return result;
}

function calculateTotalAmount(invoicePerformances, plays) {
    let totalAmount = 0;
    for (let perf of invoicePerformances) {
        const play = plays[perf.playID];
        let thisAmount = getAmount(play.type, perf.audience);
        totalAmount += thisAmount;
    }
    return totalAmount;
}

function generatePerformance(performances, plays) {
    let result = '';
    for (let perf of performances) {
        const play = plays[perf.playID];
        let thisAmount = getAmount(play.type, perf.audience);
        result += getOnePlayResult(play.name, thisAmount, perf.audience);
    }
    return result;
}

function printText(invoiceCustomer, invoicePerformances, totalAmount, volumeCredits) {
    return `Statement for ${invoiceCustomer}\n`+
        invoicePerformances.map(performance => performance.toString() + '\n').join('')+
        `Amount owed is ${format(totalAmount / 100)}\n`+
        `You earned ${volumeCredits} credits \n`;
}

function printHTML(){

}
module.exports = {
    statement,
};
