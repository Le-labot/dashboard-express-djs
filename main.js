'use strict';
const Discord = require('discord.js');
const config = require('./config/main.config.js')
const client = new Discord.Client();
client.on('ready', async() => {
    client.appInfo = await client.fetchApplication();
    setInterval(async () => {
        client.appInfo = await client.fetchApplication();
    }, 60000);
    require('./bin/www')(client)
});

client.on('message', message => {
    if (message.content === 'ping') {
        message.channel.send('pong');
    }
});

client.login(config.token);
