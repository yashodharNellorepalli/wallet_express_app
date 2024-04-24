const {body, param, query} = require('express-validator');
const {DESCRIPTION_MIN_LENGTH, DESCRIPTION_MAX_LENGTH} = require('../../utils/constants.js');


const schemaValidationTransactionCreate = [
    body('amount')
    .exists().withMessage('amount is required')
    .isNumeric().withMessage('amount must be float'),
    body('description')
    .exists().withMessage('name is required')
    .isString().withMessage('name must be a string')
    .isLength({min: DESCRIPTION_MIN_LENGTH, max: DESCRIPTION_MAX_LENGTH}).withMessage(`name must be within ${DESCRIPTION_MIN_LENGTH} to ${DESCRIPTION_MAX_LENGTH} characters long`),
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