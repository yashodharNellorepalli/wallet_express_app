const {nonNegative} = require('../utils/helpers');

const balance = {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: nonNegative,
      message: 'Balance must be greater than or equal to zero.'
    },
    precision: 4
};

module.exports = {
    balance
};