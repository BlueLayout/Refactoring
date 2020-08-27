const test = require('ava');
const {statement} = require('../src/statement');

test('statement case 1 test. play type is tragedy, play audience is 40', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'othello',
        'audience': 40,
      }
    ],
  };
  const plays = {
    'hamlet': {
      'name': 'Hamlet',
      'type': 'tragedy',
    },
    'as-like': {
      'name': 'As You Like It',
      'type': 'comedy',
    },
    'othello': {
      'name': 'Othello',
      'type': 'tragedy',
    },
  };
  //when
  const result = statement(invoice, plays);
  //then
  t.is(result, 'Statement for BigCo\n' +
      ' Othello: $500.00 (40 seats)\n' +
      'Amount owed is $500.00\n' +
      'You earned 10 credits \n');
});