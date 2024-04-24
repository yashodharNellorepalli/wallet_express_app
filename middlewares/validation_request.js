const {body, query, param, validationResult} = require('express-validator');
const {UnprocessedResponse} = require('../utils/responses.js');


const validateRequestSchema = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return new UnprocessedResponse(errors.array()).sendResponse(res);
    }
    const req_keys = ['body', 'query', 'params'];
    let payload = {};
    req_keys.forEach(req_key => Object.keys(req[req_key]).forEach(key => payload[key] = req[req_key][key]));
    req.payload = payload;
    next();
};

module.exports = {
    validateRequestSchema
}