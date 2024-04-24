const {nonNegative} = require('../utils/helpers');
const {AMOUNT_PRECISION} = require('../utils/constants');

const balance = {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: nonNegative,
      message: 'Balance must be greater than or equal to zero.'
    },
    precision: AMOUNT_PRECISION
};

module.exports = {
    balance
};