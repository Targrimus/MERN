const { logEvents } = require('../middleware/logger');

const errorHandler = (err, req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${err.message}\t${req.headers.referer}\t${req.headers.origin}`,'errors.log');
    console.log(err.stack);
    res.status(res.statusCode ? res.statusCode : 500);
    res.json({message : err.message });
    next(err);
}

module.exports = errorHandler;