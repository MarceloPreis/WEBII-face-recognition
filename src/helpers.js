const collect = require('collect.js');
var log4js = require("log4js");
var logger = log4js.getLogger();
log4js.configure({
    appenders: { logs: { type: "file", filename: "logs.log" } },
    categories: { default: { appenders: ["logs"], level: "error" } },
});

exports.c = (array) => {
    return collect(array);    
}

exports.log = (userId, req) => {
    logger.level = "debug";
    logger.log(JSON.stringify({ user: userId, req: req }));
}