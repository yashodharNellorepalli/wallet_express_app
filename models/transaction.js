const {Schema, model} = require('mongoose');
const {balance} = require('./columns');
const {CREDIT, DEBIT, AMOUNT_PRECISION, MODEL_WALLET, MODEL_TRANSACTION} = require('../utils/constants');

const TransactionSchema = new Schema({
  wallet: {
    type: Schema.Types.ObjectId,
    ref: MODEL_WALLET,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    precision: AMOUNT_PRECISION
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

module.exports = model(MODEL_TRANSACTION, TransactionSchema);
