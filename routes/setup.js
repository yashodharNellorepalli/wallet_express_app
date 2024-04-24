var express = require('express');
var router = express.Router();
const {validateRequestSchema} = require('../middlewares/validation_request.js');
const {schemaValidationWalletSetup} = require('../middlewares/schema_validation/wallet.js');
const {createWallet} = require('../controllers/wallet');


router.post('/', schemaValidationWalletSetup, validateRequestSchema, createWallet);

module.exports = router;