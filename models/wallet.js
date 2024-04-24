const {Schema, model} = require('mongoose');
const {balance} = require('./columns');
const {MODEL_WALLET, NAME_MIN_LENGTH, NAME_MAX_LENGTH} = require('../utils/constants');

const WalletSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: NAME_MIN_LENGTH,
    maxLength: NAME_MAX_LENGTH
  },
  balance: balance,
}, { timestamps: true });

module.exports = model(MODEL_WALLET, WalletSchema);