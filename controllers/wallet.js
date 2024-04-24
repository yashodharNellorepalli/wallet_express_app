const WalletModel = require('../models/wallet');
const TransactionModel = require('../models/transaction');
const {getTransactionType} = require('../utils/helpers.js');
const {SETUP_WALLET} = require('../utils/constants.js');
const {SuccessOkResponse, UnprocessedResponse} = require('../utils/responses.js');
const {FAILED_CREATE_WALLET, } = require('../utils/errors.js');


const createWallet = async (req, res, next) => {
    const {payload} = req;
    const {name, balance} = payload;
    const transactionType = getTransactionType(balance);
    const wallet = await new WalletModel({name, balance}).save();
    if(!wallet){
        return new UnprocessedResponse(FAILED_CREATE_WALLET).sendResponse(res);
    }
    const transaction = await new TransactionModel({
        wallet: wallet._id, 
        amount: balance,
        balance: balance,
        description: SETUP_WALLET,
        type: transactionType
    }).save();
    if(!transaction){
        return new UnprocessedResponse(FAILED_CREATE_TRANSACTION).sendResponse(res);
    }
    return new SuccessOkResponse({
        id: wallet._id,
        balance: wallet.balance,
        name: wallet.name,
        date: wallet.createdAt,
        type: transactionType
    }).sendResponse(res);
};

const getWallet = async (req, res, next) => {
    const {payload} = req;
    const walletId = payload.id;
    await WalletModel.findById(walletId)
    .then((wallet) => {
        return new SuccessOkResponse({
            id: wallet._id,
            balance: wallet.balance,
            name: wallet.name,
            date: wallet.createdAt
        }).sendResponse(res);
    })
    .catch((err) => {
        return new UnprocessedResponse(err.message).sendResponse(res);
    });
};

module.exports = {
    createWallet,
    getWallet
}