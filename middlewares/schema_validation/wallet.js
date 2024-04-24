const {body, param} = require('express-validator');


const schemaValidationWalletSetup = [
    body('name')
    .exists().withMessage('name is required')
    .isString().withMessage('name must be a string')
    .isLength({min: 3, max: 20}).withMessage('name must be within 3 to 20 characters long'),
    body('balance')
    .exists().withMessage('balance is required')
    .isInt().withMessage('balance must be integer')
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