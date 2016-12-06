const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');

client.on('ready',() => {
	console.log('Ready.');
});

var prefix = "-"
client.on('message', message => {
	if (message.author === client.user) return;
	if (message.content.startsWith(prefix + 'ping')) {
		message.channel.sendMessage('Pong! `insert response time`');
	}
});

client.login(settings.token);
