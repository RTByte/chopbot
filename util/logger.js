const moment = require('moment'),
      chalk  = require('chalk'),
      clk    = new chalk.constructor({enabled: true});

var logger = require("winston");

/// BEGIN WEBSOCKET
/*
var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(process.env.PORT, function() {
    console.log((new Date()) + ' Server is listening on port '+process.env.PORT);
});

var wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }

    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });

    connection.sendUTF("Welcome!");
});
*/
/// END WEBSOCKET

// Define the colors
var cyan = clk.bold.cyan,
    green   = clk.bold.green,
    error   = clk.bgRed.black,
    blue    = clk.bold.blue,
    warn    = clk.bgYellow.black,
    magenta = clk.bold.magenta,
    red     = clk.bold.red;

var date = () => {
    return '[' + moment().format('DD.MM HH:mm:ss') + ']';
};

module.exports = {
    info: (message) => {
        logger.info(`${date()} ${green(message)}`);
    },
    command: (server, channel, username, command, suffix) => {
        server = server || "PM";
        logger.info(`${date()} ${cyan('[' + server + ']' + '(#' + channel + ')')} ${green(username)} -> ${magenta(command)} ${suffix}`);
    },
    error: (errorMessage) => {
        if(typeof errorMessage === "object") {
            let util = require("util");
            errorMessage = util.inspect(errorMessage);
        }
        logger.error(`${date()} ${error(errorMessage)}`);
    },
    warn: (warnMessage) => {
        logger.warn(`${date()} ${warn(warnMessage)}`);
    },
    ban: (user, server) => {
        logger.info(`${date()} ${red(user)} was just banned from ${cyan('[' + server + ']')}`);
    },
    unban: (user, server) => {
        logger.info(`${date()} ${green(user)} was just unbanned from ${cyan('[' + server + ']')}`);
    },
    join: (server) => {
        logger.info(`${date()} Joined ${cyan('[' + server + ']')}`);
    },
    leave: (server) => {
        logger.info(`${date()} Left ${cyan('[' + server + ']')}`);
    },
    channel: (bot, message) => {
        bot.sendMessage("204942112347783179", message);
    }
};
