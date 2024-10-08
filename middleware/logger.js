const { format } = require('date-fns');
const { v4:uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

async function logEvents  (message, fileName){
    const dateTime = format(new Date(),'yyyyMMdd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    
    try {
        if (!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'))
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',fileName), logItem);

    } catch (error) {
        console.log(error);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.referer}\t${req.headers.origin}`,'logfile.log');
    console.log(`${req.method}\t${req.path}\t${req.headers.referer}\t${req.headers.origin}`);
    //console.log(req);
    next();
}

module.exports = {logEvents, logger};