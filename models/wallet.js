const {Schema, model} = require('mongoose');
const {balance} = require('./columns');

const WalletSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 1,
    maxLength: 100
  },
  balance: balance,
}, { timestamps: true });

module.exports = model('Wallet', WalletSchema);