const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');

client.on('ready',() => {
	console.log('Ready.');
});

var prefix = "-"
client.on('message', message => {
  if (!message.content.startsWith(prefix)) return;
  let args = message.content.split(' ').slice(1);
	var result = args.join(' ');
	if (message.author.bot) return;


	if (message.content.startsWith(prefix + 'ping')) {
		message.channel.sendMessage(`Pong! \`${Date.now() - message.createdTimestamp} ms\``);
	} else

  if (message.content.startsWith(prefix + 'send')) {
    client.channels.get('255819057616519169').sendMessage('different channel message concept (hardcoded)')
  } else

  if (message.content.startsWith(prefix + 'setgame')) {
		if (!result) {
			result = null;
		}
		client.user.setGame(result);
  }

  if (message.content.startsWith(prefix + 'foo')) {
      message.channel.sendMessage('bar');
  }
});

client.login(settings.token);
