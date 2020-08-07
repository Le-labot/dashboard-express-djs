const { EventEmitter } = require('events');

class MyEmitter extends EventEmitter {}

const client = new MyEmitter();
module.exports = client;

client.on('debug', data => {
    console.log(data);
});

client.on('error', data => {
    console.error(data);
});

client.emit('debug', 'Event emited successful');
