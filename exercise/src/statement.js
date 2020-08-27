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
    let amount = 40000;
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

function statement(invoice, plays) {
    let totalAmount = calculateTotalAmount(invoice.performances, plays);
    let volumeCredits = calculateVolumeCredits(invoice.performances, plays);
    let performance = generatePerformance(invoice.performances, plays);
    return printText(invoice.customer, performance, totalAmount, volumeCredits);
}

function statementHTML(invoice, plays) {
    let totalAmount = calculateTotalAmount(invoice.performances, plays);
    let volumeCredits = calculateVolumeCredits(invoice.performances, plays);
    let performance = generatePerformance(invoice.performances, plays);
    return printHTML(invoice.customer, performance, totalAmount, volumeCredits);
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

function calculateVolumeCredits(invoicePerformances, plays) {
    let volumeCredits = 0;
    for (let perf of invoicePerformances) {
        const play = plays[perf.playID];
        volumeCredits += getVolumeCredits(perf.audience);
        if ('comedy' === play.type) volumeCredits += getComedyVolumeCredits(perf.audience);
    }
    return volumeCredits;
}

function generatePerformance(performances, plays) {
    let result = [];
    for (let perf of performances) {
        const play = plays[perf.playID];
        let thisAmount = getAmount(play.type, perf.audience);
        let res = {
            name: play.name,
            amount: thisAmount,
            audience: perf.audience
        };
        result.push(res);
    }
    return result;
}

function printText(invoiceCustomer, invoicePerformances, totalAmount, volumeCredits) {
    return `Statement for ${invoiceCustomer}\n` +
        invoicePerformances.map(performance => {
            return ` ${performance.name}: ${format(performance.amount / 100)} (${performance.audience} seats)\n`
        }).join('') +
        `Amount owed is ${format(totalAmount / 100)}\n` +
        `You earned ${volumeCredits} credits \n`;
}

function printHTML(invoiceCustomer, invoicePerformances, totalAmount, volumeCredits) {
    return `<h1>Statement for ${invoiceCustomer}</h1>\n` +
        '<table>\n' +
        '<tr><th>play</th><th>seats</th><th>cost</th></tr>' +
        invoicePerformances.map(performance => {
            return ` <tr><td>${performance.name}</td><td>${performance.audience}</td><td>${format(performance.amount / 100)}</td></tr>\n`
        }).join('') +
        '</table>\n' +
        `<p>Amount owed is <em>${format(totalAmount / 100)}</em></p>\n` +
        `<p>You earned <em>${volumeCredits}</em> credits</p>\n`;
}

module.exports = {
    statement,
    statementHTML
};
