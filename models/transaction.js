const {Schema, model} = require('mongoose');
const {balance} = require('./columns');
const {CREDIT, DEBIT} = require('../utils/constants');

const TransactionSchema = new Schema({
  wallet: {
    type: Schema.Types.ObjectId,
    ref: 'Wallet',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    precision: 4
  },
  balance: balance,
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: [CREDIT, DEBIT],
    required: true
  },
}, { timestamps: true });

module.exports = model('Transaction', TransactionSchema);
