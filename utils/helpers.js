const {CREDIT, DEBIT} = require('../utils/constants');

const nonNegative = balance => balance >= 0;
const getTransactionType = amount => amount >=0 ? CREDIT : DEBIT;

module.exports = {
    nonNegative,
    getTransactionType
}