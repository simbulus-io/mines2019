#!/usr/bin/env node
'use strict';

import * as logger from 'winston';

//var blocked = require("blocked-at");
const http = require('http');
http.globalAgent.maxSockets = 5;

const server = require('./server');
const debug = require('debug')('express:server');

const app = server.Server.bootstrap().app;

logger.info(`app bootstrap done`);
const http_port = app.get('config').express_port;
logger.info(`Creating app on port ${http_port}`);

const http_server = http.createServer(app);
logger.info(`created server`);

http_server.listen(http_port);
logger.info(`listening`);
http_server.on('listening', on_listening);
function on_listening() {
  logger.info(`on listening`);
  const addr = http_server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

process.on('uncaughtException', (err) => {
  logger.error(new Error(`Uncaught exception: ${err}`));
});

process.on('unhandledRejection', (reason, p) => {
  logger.error(new Error(`Unhandled Rejection at: Promise ${p}, ${reason}`));
});
