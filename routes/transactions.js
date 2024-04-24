var express = require('express');
var router = express.Router();
const {validateRequestSchema} = require('../middlewares/validation_request.js');
const {schemaValidationTransactionsList} = require('../middlewares/schema_validation/transaction.js');
const {getTransactionsList} = require('../controllers/transaction.js');


router.get('/', schemaValidationTransactionsList, validateRequestSchema, getTransactionsList);

module.exports = router;