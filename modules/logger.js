var log4js = require('log4js'),
    config = require('../config/config').logs,
    logger;

log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file(config.path), config.name);

logger = log4js.getLogger(config.name);
logger.setLevel(config.level);

module.exports = logger;
