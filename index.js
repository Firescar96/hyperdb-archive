'use strict'
const express = require('express');
const expressWebSocket = require('express-ws');
const hyper = require('hyperdb');
const fs = require('fs');
const websocketStream = require('websocket-stream/stream');

let homeFolder;
if(process.env.APPDATA) {
  homeFolder = process.env.APPDATA + '/HyperDB-Gateway';
}else {
  homeFolder = process.env.HOME;
  homeFolder += process.platform == 'darwin' ? '/Library/Preferences' : '/.hyperdb-gateway';
}
const hyperPath = homeFolder + '/hyperDBStore';

function log () {
  let msg = arguments[0]
  arguments[0] = '[dat-gateway] ' + msg
  if (process.env.DEBUG || process.env.LOG) {
    console.log.apply(console, arguments)
  }
}

module.exports =
class DatGateway {
  constructor ({ dir, max, maxAge }) {
    this.dir = dir
    this.datOptions = { temp: true }
    log('Starting gateway at %s with options %j', this.dir, { max, maxAge })
    this.server = express()
    // extend express app with express.ws()
    expressWebSocket(this.server, null, {
        // ws options here
        perMessageDeflate: false,
    });
    this.server.ws('/', function(ws, req) {
      let {key} = req.query;
      const stream = websocketStream(ws, {
        // websocket-stream options here
        binary: true,
      });
      let dbStream = hyper(hyperPath+"/"+key, key, {valueEncoding: 'utf-8'}).replicate();
      dbStream.pipe(stream).pipe(dbStream).pipe(process.stdout);
    });
  }

  listen (port, host) {
    return new Promise((resolve, reject) => {
      this.server.listen(port,host, (err) => {
        if (err) return reject(err)
        else return resolve()
      })
    })
  }

  close () {
    return new Promise((resolve) => {
      this.server.close(resolve)
    }).then(() => {
      this.cache.reset()
    })
  }
}
