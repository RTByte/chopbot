const Discord = require('discord.js');
const bot = new Discord.Client();
const settings = require('./settings.json');

bot.on('ready',() => {
	console.log('Ready.');
});

bot.on('guildMemberAdd', member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`Welcome, ${member.user}!`);
});

bot.on('guildCreate', guild => {
  console.log(`Connected to new guild: ${guild.name}, owned by ${guild.owner.user.username}`);
});

bot.on('message', message => {
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
    bot.channels.get('255819057616519169').sendMessage('different channel message concepterino (hardcoded)')
  } else

  if (command === 'setgame') {
		if (!result) {
			result = null;
		}
		bot.user.setGame(result);
  } else

  if (command === 'setstatus') {
  		if (!result) {
  			result = 'online';
  		}
  		bot.user.setStatus(result);
  } else

  if (command === 'foo') {
    message.channel.sendMessage('Bar');
  } else

  if (command === 'roll'){
		if (args == "") {
			var onetoonehundred = Math.floor((Math.random() * 100) + 1);
			message.channel.sendMessage("Rolling between 1 and 100...*drumroll*");
			setTimeout(function (){
				message.channel.sendMessage(onetoonehundred);
  		}, 1000);
		} else {
			var onetosomething = Math.floor((Math.random() * args) + 1);
			message.channel.sendMessage("Rolling between 1 and " + args + "...*drumroll*");
			setTimeout(function (){
				message.channel.sendMessage(onetosomething);
  		}, 1000);
		}

  } else
	if (command === 'coinflip'){
		var oneortwo = Math.floor((Math.random() * 2) + 1);
		message.channel.sendMessage("Flipping a coin...");
		if (oneortwo == 1) {
			message.channel.sendMessage("Heads!");
		} else {
			message.channel.sendMessage("Tails!");
		}


  }
});

bot.login(settings.token);
