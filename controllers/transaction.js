const WalletModel = require('../models/wallet');
const TransactionModel = require('../models/transaction');


const createTransaction = async (req, res, next) => {
    const {payload} = req;
    const {walletId, amount, description} = payload;
    await WalletModel.findById(walletId)
    .then(async (wallet) => {
        const newBalance = wallet.balance + amount;
        const transactionModel = new TransactionModel({
            wallet: walletId, 
            amount: amount, 
            balance: newBalance, 
            description: description
        });
        await transactionModel.save()
        .then(async (transaction) =>{
            await WalletModel.findOneAndUpdate(
                {
                    _id: walletId
                },
                {
                    $inc: {
                        balance: amount
                    }
                },
                { 
                    new: true 
                }
            );
            res.send({
                balance: transaction.balance,
                transaction_id: transaction._id
            })
        }).catch(async err => {
            res.status(422).json({
                error: err
            });
        });
    })
    .catch((err) => {
        res.status(422).json({
            error: err.message
        });
    });
};

const getTransactionsList = async (req, res, next) => {
    const {payload} = req;
    const {walletId, skip, limit} = payload;
    await TransactionModel
    .find({
        wallet: walletId
    })
    .sort('-createdAt')
    .skip(skip)
    .limit(limit)
    .then((transactions) => {
        console.log(`transactions: ${transactions}`);
        res.send(
            transactions.map((transaction) => {
                return {
                    id: transaction._id,
                    wallet_id: walletId,
                    amount: transaction.amount,
                    balance: transaction.balance,
                    description: transaction.description,
                    date: transaction.createdAt
                }
            })
        ); 
    })
    .catch((err) => {
        res.status(422).json({
            error: err.message
        });
    });
};

module.exports = {
    createTransaction,
    getTransactionsList
}