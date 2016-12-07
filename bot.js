const Discord = require("discord.js");
const bot = new Discord.Client();
const settings = require("./settings.json");

bot.on("ready",() => {
	console.log("Ready.");
});

bot.on("guildMemberAdd", member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`Welcome, ${member.user}!`);
});

bot.on("guildCreate", guild => {
  console.log(`Connected to new guild: ${guild.name}, owned by ${guild.owner.user.username}`);
});

bot.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(settings.prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(settings.prefix.length);

  let args = message.content.split(" ").slice(1);
	var result = args.join(" ");

	if (command === "ping") {
		message.channel.sendMessage(`Pong! \`${Date.now() - message.createdTimestamp} ms\``);
	} else

  if (command === "setgame") {
		if (!result) {
			result = null;
		}
		bot.user.setGame(result);
  } else

  if (command === "setstatus") {
  		if (!result) {
  			result = "online";
  		}
  		bot.user.setStatus(result);
  } else

  if (command === "foo") {
		let modRole = message.guild.roles.find("name", "Server Staff");
		if (message.member.roles.has(modRole.id)) {
			    message.channel.sendMessage("Bar");
		} else {
			message.reply("You don't have adequate permissions to execute this command.")
		}
  } else

  if (command === "roll"){
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

	if (command === "coinflip"){
		var oneortwo = Math.floor((Math.random() * 2) + 1);
		message.channel.sendMessage("Flipping a coin...");
		if (oneortwo == 1) {
			message.channel.sendMessage("Heads!");
		} else {
			message.channel.sendMessage("Tails!");
		}
  } else

	if (command === "kick") {
		let modRole = message.guild.roles.find("name", "Server Staff");
		if(!message.member.roles.has(modRole.id)) {
			return message.reply("You don't have adequate permissions to execute this command.");
		}
		if(message.mentions.users.size === 0) {
			return message.reply("Please mention a user to kick.");
		}
		let kickMember = message.guild.member(message.mentions.users.first());
		if(!kickMember) {
			return message.reply("Can't find specified user.");
		}
		if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
			return message.reply("I don't have the required permission (KICK_MEMBERS) to do this.");
		}
		kickMember.kick().then(member => {
			message.reply(`${member.user.username} has been kicked from the server.`);
		}).catch(e => {
			console.error(e);
		});
	}

}); // END MESSAGE HANDLER

function clean(text) {
	if (typeof(text) === "string")
		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	else
		return text;

}

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});

bot.login(settings.token);
