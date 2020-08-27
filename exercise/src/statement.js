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

function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = 0;
        switch (play.type) {
            case 'tragedy':
                thisAmount += getTragedyAmount(play.type, perf.audience);
                break;
            case 'comedy':
                thisAmount = 30000;
                if (perf.audience > 20) {
                    thisAmount += 10000 + 500 * (perf.audience - 20);
                }
                thisAmount += 300 * perf.audience;
                break;
            default:
                throw new Error(`unknown type: ${play.type}`);
        }
        // add volume credits
        volumeCredits += getVolumeCredits(perf);
        // add extra credit for every ten comedy attendees
        if ('comedy' === play.type) volumeCredits += getComedyVolumeCredits(perf);
        //print line for this order
        result += getOnePlayResult(play, thisAmount, perf);
        totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits \n`;
    return result;
}

module.exports = {
    statement,
};
