var express = require('express');
var router = express.Router();
const {validateRequestSchema} = require('../middlewares/validation_request.js');
const {schemaValidationTransactionCreate} = require('../middlewares/schema_validation/transaction.js');
const {createTransaction} = require('../controllers/transaction.js');

router.post('/:walletId', schemaValidationTransactionCreate, validateRequestSchema, createTransaction);

module.exports = router;