const {body, param, query} = require('express-validator');


const schemaValidationTransactionCreate = [
    body('amount')
    .exists().withMessage('balance is required')
    .isInt().withMessage('balance must be integer'),
    body('description')
    .exists().withMessage('name is required')
    .isString().withMessage('name must be a string')
    .isLength({min: 5, max: 500}).withMessage('name must be within 5 to 500 characters long'),
    param('walletId')
    .exists().withMessage('walletId is required')
    .isString().withMessage('walletId must be String'),
]

const schemaValidationTransactionsList = [
    query('walletId')
    .exists().withMessage('walletId is required')
    .isString().withMessage('walletId must be String'),
    query('skip')
    .exists().withMessage('skip is required')
    .isInt().withMessage('skip must be Integer'),
    query('limit')
    .exists().withMessage('limit is required')
    .isInt().withMessage('limit must be Integer'),
]


module.exports = {
    schemaValidationTransactionCreate,
    schemaValidationTransactionsList
}