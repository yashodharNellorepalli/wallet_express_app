const {StatusCodes} = require('http-status-codes');


class Response{
    constructor(statusCode, err, data){
        this.statusCode = statusCode;
        this.err = err;
        this.data = data;
    }

    sendResponse(res) {
        return res.status(this.statusCode).json(this.data || {error: this.err});
    }
}

class SuccessOkResponse extends Response{
    constructor(data){
        super(StatusCodes.OK, null, data);
    }
}

class UnprocessedResponse extends Response{
    constructor(error){
        super(StatusCodes.UNPROCESSABLE_ENTITY, error, null);
    }
}

class InternalServerErrorResponse extends Response{
    constructor(error){
        super(StatusCodes.INTERNAL_SERVER_ERROR, error, null);
    }
}


module.exports = {
    SuccessOkResponse,
    UnprocessedResponse,
    InternalServerErrorResponse
};
