const { logEvents } = require('../middleware/logger');

const errorHandler = (err, req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${JSON.stringify(req.headers.referer)}`,'errors.log');
    console.log(err.stack);
    res.status(res.statusCode ? res.statusCode : 500);
    res.json({message : err.message });
    return next();
}

module.exports = errorHandler;