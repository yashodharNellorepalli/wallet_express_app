const {body, query, param, validationResult} = require('express-validator');


const validateRequestSchema = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const req_keys = ['body', 'query', 'params']
    let payload = {};
    req_keys.forEach(req_key => Object.keys(req[req_key]).forEach(key => payload[key] = req[req_key][key]));
    console.log(`payload: ${JSON.stringify(payload)}`);
    req.payload = payload;
    next();
};

module.exports = {
    validateRequestSchema
}