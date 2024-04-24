const mongoose = require('mongoose');
const WalletModel = require('../models/wallet');
const TransactionModel = require('../models/transaction');
const {getTransactionType} = require('../utils/helpers.js');
const {SuccessOkResponse, UnprocessedResponse, InternalServerErrorResponse} = require('../utils/responses.js');
const {WALLET_NOT_FOUND, INSUFFICIENT_FUNDS} = require('../utils/errors.js');
const {DESC_CREATED_AT} = require('../utils/constants.js');


const createTransaction = async (req, res, next) => {
    const {payload} = req;
    const {walletId, amount, description} = payload;
    const wallet = await WalletModel.findById(walletId);

    if (!wallet) {
        return new UnprocessedResponse(WALLET_NOT_FOUND).sendResponse(res);
    }

    const newBalance = wallet.balance + amount;
    if (newBalance < 0) {
        return new UnprocessedResponse(INSUFFICIENT_FUNDS).sendResponse(res);
    }

    const transactionType = getTransactionType(amount);
    const session = await mongoose.startSession(); // Start a new session
    session.startTransaction();
    try {
        await wallet.updateOne({ $inc: { balance: amount } }, { session });

        const transaction = new TransactionModel({
            wallet: walletId, 
            amount: amount, 
            balance: newBalance, 
            description: description,
            type: transactionType
        });

        await transaction.save({ session });
        await session.commitTransaction();
        session.endSession();
        return new SuccessOkResponse({ 
            balance: newBalance, 
            transactionId: transaction._id 
        }).sendResponse(res);
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return new InternalServerErrorResponse(err.message).sendResponse(res);
    }
}

const getTransactionsList = async (req, res, next) => {
    const {payload} = req;
    const {walletId, skip, limit} = payload;
    await TransactionModel
    .find({
        wallet: walletId
    })
    .sort(DESC_CREATED_AT)
    .skip(skip)
    .limit(limit)
    .then((transactions) => {
        res.send(
            transactions.map((transaction) => {
                return {
                    id: transaction._id,
                    walletId: walletId,
                    amount: transaction.amount,
                    balance: transaction.balance,
                    description: transaction.description,
                    date: transaction.createdAt,
                    type: transaction.type
                }
            })
        ); 
    })
    .catch((err) => {
        return new UnprocessedResponse(err.message).sendResponse(res);
    });
};

module.exports = {
    createTransaction,
    getTransactionsList
}