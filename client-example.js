const websocketStream = require('websocket-stream/stream');
const hyper = require('hyperdb');

var key = "database key here"

let hyperDB = hyper(hyperPath + '/'+key, {valueEncoding: 'utf-8'}).on('ready', data => {
  var ws = websocket(`ws://127.0.0.1:5000/?key=${key}`);
  let dbStream = hyperDB.replicate();
  dbStream.pipe(ws).pipe(dbStream);
});
