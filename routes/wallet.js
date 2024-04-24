var express = require('express');
var router = express.Router();
const {validateRequestSchema} = require('../middlewares/validation_request.js');
const {schemaValidationWalletGet} = require('../middlewares/schema_validation/wallet.js');
const {getWallet} = require('../controllers/wallet');

router.get('/:id', schemaValidationWalletGet, validateRequestSchema, getWallet);

module.exports = router;