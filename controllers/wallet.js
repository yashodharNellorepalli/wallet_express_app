const WalletModel = require('../models/wallet');
const TransactionModel = require('../models/transaction');
const {getTransactionType} = require('../utils/helpers.js');
const {SETUP_WALLET} = require('../utils/constants.js');

const createWallet = async (req, res, next) => {
    const {payload} = req;
    const {name, balance} = payload;
    const transactionType = getTransactionType(balance);
    const walletModel = new WalletModel({name, balance});
    await walletModel.save()
    .then(async (wallet) => {
        const transactionModel = new TransactionModel({
            wallet: wallet._id, 
            amount: balance,
            balance: balance,
            description: SETUP_WALLET,
            type: transactionType
        });
        await transactionModel.save()
        .then(async (transaction) => {
            res.send({
                id: wallet._id,
                balance: wallet.balance,
                name: wallet.name,
                date: wallet.createdAt,
                type: transactionType
            });
        })
        .catch(async (err) => {
            await WalletModel.findByIdAndDelete(wallet._id);
            res.status(422).json({
                error: err.message
            })
        });
    })
    .catch(err =>{
        res.status(422).json({
            error: err.message
        })
    });
};

const getWallet = async (req, res, next) => {
    const {payload} = req;
    const walletId = payload.id;
    await WalletModel.findById(walletId)
    .then((wallet) => {
        res.send({
            id: wallet._id,
            balance: wallet.balance,
            name: wallet.name,
            date: wallet.createdAt
        });
    })
    .catch((err) => {
        res.status(422).json({
            error: err.message
        });
    });
};

module.exports = {
    createWallet,
    getWallet
}