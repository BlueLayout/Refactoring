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

test('statement case 2 test. play type is tragedy, play audience is 29', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'othello',
                'audience': 29,
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
        ' Othello: $400.00 (29 seats)\n' +
        'Amount owed is $400.00\n' +
        'You earned 0 credits \n');
});

test('statement case 3 test. play type is comedy, play audience is 21', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'as-like',
                'audience': 21,
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
        ' As You Like It: $468.00 (21 seats)\n' +
        'Amount owed is $468.00\n' +
        'You earned 4 credits \n');
});

test('statement case 4 test. play type is comedy, play audience is 19', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'as-like',
                'audience': 19,
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
        ' As You Like It: $357.00 (19 seats)\n' +
        'Amount owed is $357.00\n' +
        'You earned 3 credits \n');
});