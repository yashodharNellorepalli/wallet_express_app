const {body, param} = require('express-validator');
const {NAME_MIN_LENGTH, NAME_MAX_LENGTH} = require('../../utils/constants');

const schemaValidationWalletSetup = [
    body('name')
    .exists().withMessage('name is required')
    .isString().withMessage('name must be a string')
    .isLength({min: NAME_MIN_LENGTH, max: NAME_MAX_LENGTH}).withMessage(`name must be within ${NAME_MIN_LENGTH} to ${NAME_MAX_LENGTH} characters long`),
    body('balance')
    .exists().withMessage('balance is required')
    .isInt().withMessage('balance must be integer')
    .custom(value => {
        const isBalanceNonNegative = value >= 0;
        if (!isBalanceNonNegative) {
            throw new Error('Balance must be a non-negative number');
          }
        return isBalanceNonNegative;
    })
]

const schemaValidationWalletGet = [
    param('id')
    .exists().withMessage('id is required')
    .isString().withMessage('name must be a string')
]


module.exports = {
    schemaValidationWalletSetup,
    schemaValidationWalletGet
}