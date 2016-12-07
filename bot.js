"use strict";

const Discord = require('discord.js'),
	  bot = new Discord.Client({forceFetchUsers: true, autoReconnect: true, guildCreateTimeout: 3000});
const util = require( "util" );
const request = require("request");

// Get DB and logger paths
const Constants = require('./constants.js');
const config = require(Constants.Util.CONFIG);
const log = require(Constants.Util.LOGGER);
const schedule = require("node-schedule");

// Load all the commands + aliases
const commands = require('./commands/index.js').commands,
					aliases = require('./commands/index.js').aliases;

global.top_users_online = [];

bot.on("ready", () => {
	log.info("Ready in " + bot.channels.length + " channels in " + bot.servers.length + " servers.");
				for(let server of bot.servers) {
			r.table("stats").filter({server_id: server.id}).orderBy(r.desc("max_online")).limit(1).run().then( stats => {
				if(stats && stats.max_online) {
					global.top_users_online[server.id] = stats.max_online;
				}
			});
		}
});

// Catch discord.js errors
bot.on('error', e => { log.error(e); });
bot.on('warn', e => { log.warn(e); });
//bot.on('debug', e => { log.info(e); });

bot.on("serverCreated", (server) => {
		serverconf.add(server)
		.then( server => log.join(`Joined ${server.name}`) )
		.catch( e => log.error(`Server config could not be added to new server ${server.name} because of: ${e}`));
});

const serverconf = require("./util/serverconf.js");
bot.once('ready', () => {
		serverconf.init(bot, (confs) => {
						log.info(confs.size + " server configurations loaded");
		});

		for(let server of bot.servers) {
						let rule = new schedule.RecurrenceRule();
						rule.minute = [0, 15, 30, 45]; // every 15 minutes of the hour.
						schedule.scheduleJob(rule, () =>{
		  				let query = {ts_stat:  r.now(), "server_id": server.id, "max_users": 0, "playing_ow": 0, "max_online": 0, "partial_groups": 0, "full_groups": 0};
										query.max_users = server.members.length;
										query.playing_ow = server.members.filter(m=> m.game&&m.game.name==="Overwatch").length;
										let max_online = server.members.filter(m => m.status !== "offline").length;
										query.max_online = max_online;
										if(max_online > global.top_users_online[server.id]) global.top_users_online[server.id] = max_online;
										let voiceChans = server.channels.filter(c => c instanceof Discord.VoiceChannel&&c.name!="Absent - AFK");
										query.full_groups = voiceChans.filter(c=>c.members.length > 5).length;
										query.partial_groups = voiceChans.filter(c=>c.members.length<6&&c.members.length>0).length;
    r.table("stats").insert(query).run();
							});
			}
});

bot.on('message', msg => {
				if(msg.author.bot) return;

				if(!msg.server) {
								log.info(`Private Message from ${msg.author.name}: ${msg.content}`);
								bot.reply(msg, `Hi! I'm a bot - I don't chat or respond to private messages.\nPlease, use a channel in a server to throw commands at me, I won't mind!`);
								return;
				}

				var conf = serverconf.get(msg.server.id);
				if(!conf) {
								console.log(`Message Handler: Could not get configuration for server ${msg.server.name}`);
								return;
				}

conf.i18n = I18n.use(langsetup[conf.lang]);

	var prefix = conf.prefix;

	if(msg.content.startsWith(prefix)) {
					var command  = msg.content.substring(prefix.length).split(" ")[0].toLowerCase();
					var suffix   = msg.content.substring(command.length + 2).trim();
					var username = msg.server && msg.server.detailsOf(msg.author).nick ? msg.server.detailsOf(msg.author).nick : msg.author.username;

					// Set alias to command if there is one
					command = aliases[command] || command;

					//If command found
					if(commands[command]) {
									var cData = commands[command];

									//Sub commands
									if(commands[command].inheritance && suffix) {
													var inCommand = suffix.split(" ")[0].toLowerCase();
													if(commands[command].inheritance[inCommand]) {
																	cData = commands[command].inheritance[inCommand];
													}
									}

									var userPermissionLevel = 0;
									if(msg.server) {
													var perm1 = msg.server.roles.get(conf.mod_role);
													var perm2 = msg.server.roles.get(conf.admin_role);
													var perm3 = config.ownerId;
													userPermissionLevel = perm1 && bot.memberHasRole(msg.author, perm1) && userPermissionLevel < 1 ? 1 : userPermissionLevel;
													userPermissionLevel = perm2 && bot.memberHasRole(msg.author, perm2) && userPermissionLevel < 2 ? 2 : userPermissionLevel;
									}
									userPermissionLevel = msg.author.id == perm3 ? 3 : userPermissionLevel;

									if(cData.permissionLevel <= userPermissionLevel) {
													cData.handler(bot, msg, suffix, conf, userPermissionLevel, commands);
													log.command(msg.server, (msg.channel.name || msg.channel.id), msg.author.username, command, suffix);
									}
									else
													bot.sendMessage(msg.channel, conf.i18n `**${username}**, you are not authorized to use the \`${command}\` command.`);
						}
			}
});



bot.on("guildCreate", guild => {
  console.log(`Connected to new guild: ${guild.name}, owned by ${guild.owner.user.username}`);
});

bot.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);

  let args = message.content.split(" ").slice(1);
	var result = args.join(" ");

	let params = message.content.split(" ").splice(1);

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

  if (command === "roll"){
		if (args == "") {
			let msg = "Rolling between 1 and 100...*drumroll*"
			let onetoonehundred = Math.floor((Math.random() * 100) + 1);
			let response = message.channel.sendMessage(msg);
			setTimeout(function (){
				console.log(response);
				message.channel.sendMessage(response);
				message.edit(response,"Rolling between 1 and 100..." + onetoonehundred)
				.catch(console.error);
				}, 1000);
		} else {
			let onetosomething = Math.floor((Math.random() * args) + 1);
			message.channel.sendMessage("Rolling between 1 and " + args + "...*drumroll*");
			setTimeout(function (){
				message.channel.sendMessage(onetosomething);
  		}, 1000);
		}

  } else

	if (command === "coinflip"){
		let oneortwo = Math.floor((Math.random() * 2) + 1);
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
	} else

	if (command === "foo") {
		let modRole = message.guild.roles.find("name", "Server Staff");
		if (message.member.roles.has(modRole.id)) {
					message.channel.sendMessage("Bar");
		} else {
			message.reply("You don't have adequate permissions to execute this command.")
		}
	}

}); // END MESSAGE HANDLER

bot.on("disconnected", () => {
	log.warn('Disconnected');
});

bot.loginWithToken(config.discordToken);

process.on('SIGINT', () => {
    setTimeout(() => {
        process.exit(1);
    }, 5000);
    log.info("Logging out.");
    bot.logout(()=> {
        process.exit(0);
    });
});
