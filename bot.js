const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');

client.on('ready',() => {
	console.log('Ready.');
});

client.on('guildMemberAdd', member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`Welcome, ${member.user}!`);
});

client.on('guildCreate', guild => {
  console.log(`Connected to new guild: ${guild.name}, owned by ${guild.owner.user.username}`);
});

client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(settings.prefix)) return;

  let command = message.content.split(' ')[0];
  command = command.slice(settings.prefix.length);

  let args = message.content.split(' ').slice(1);
	var result = args.join(' ');

	if (command === 'ping') {
		message.channel.sendMessage(`Pong! \`${Date.now() - message.createdTimestamp} ms\``);
	} else

  if (command === 'send') {
    client.channels.get('255819057616519169').sendMessage('different channel message concepterino (hardcoded)')
  } else

  if (command === 'setgame') {
		if (!result) {
			result = null;
		}
		client.user.setGame(result);
  } else

  if (command === 'setstatus') {
  		if (!result) {
  			result = 'online';
  		}
  		client.user.setStatus(result);
  } else

  if (command === 'foo') {
    message.channel.sendMessage('bar');
  }
});

client.login(settings.token);
