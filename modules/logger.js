var log4js = require('log4js'),
    logger;

log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('logs/hangman.log'), 'hangman');

logger = log4js.getLogger('hangman');
logger.setLevel('TRACE');

module.exports = logger;
