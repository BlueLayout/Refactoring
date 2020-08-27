const formatAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
}).format;

function format(number) {
    return formatAmount(number);
}

function getOnePlayResult(play, thisAmount, perf) {
    return ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
}

function getVolumeCredits(perf) {
    return Math.max(perf.audience - 30, 0);
}

function getComedyVolumeCredits(perf) {
    return Math.floor(perf.audience / 5);
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

function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = 0;
        thisAmount += getAmount(play.type, perf.audience);
        // add volume credits
        volumeCredits += getVolumeCredits(perf);
        // add extra credit for every ten comedy attendees
        if ('comedy' === play.type) volumeCredits += getComedyVolumeCredits(perf);
        //print line for this order
        result += getOnePlayResult(play, thisAmount, perf);
        totalAmount += thisAmount;
    }
    result += getTotalAmountResult(totalAmount);
    result += getCreditsResult(volumeCredits);
    return result;
}

module.exports = {
    statement,
};
