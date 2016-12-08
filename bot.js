"use strict";

const Discord = require('discord.js'),
	  bot = new Discord.Client({forceFetchUsers: true, autoReconnect: true, guildCreateTimeout: 3000});
const util = require( "util" );
const request = require("request");

const  r = require('rethinkdbdash')({servers: [{db: ""}]});

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

bot.on('presence', (o, n) => {
		var query = {id: n.id};

		if(n.status === "offline") {
				query.last_seen = r.now();
				r.table("users").insert(query, {conflict:"update"}).run();
		}

		bot.servers.map(s => {
			var conf = serverconf.get(s.id);
			if(!conf) {
				console.log(`Presence Change: Could not get configuration for server ${s.name}`);
				return;
			}
			if(conf.streaming_role) {
				var role = s.roles.get(conf.streaming_role);
				if(n.game && s.members.has("id", n.id) && n.game.type === 1) {
					var twitchUser = n.game.url.split("/").slice(-1)[0];
					request("https://api.twitch.tv/kraken/streams/"+twitchUser, (err, response, body) => {
							if(err) { log.error(err) }
							let twitch_info = JSON.parse(body).stream;
							try {
						if(twitch_info && twitch_info.game && twitch_info.game === "Overwatch") {
						  bot.addMemberToRole(n, role, (err) => {
											if (err) log.error(`Could not add Streamer to server role on ${s.name} because of:\n${err}`);
											query.last_streamed = r.now();
											query.twitch_user = twitchUser;
								  r.table("users").insert(query, {conflict:"update"}).run();
								});
						}
								} catch (e) {
											console.log(`Error while attempting to check stream and game:\n` + twitch_info)
								}
						});

					} else if(bot.memberHasRole(n, role)) {
								bot.removeMemberFromRole(n, role).catch(log.error);
					}
			}
	});
});

bot.on("serverNewMember", (server, user) => {

	log.info(`${user.username} has joined ${server.name}`);

	var conf = serverconf.get(server.id);
	if(!conf) {
		console.log(`New member on server: Could not get configuration for server ${server.name}`);
		return;
	}

	if(conf.log_channel) {
		bot.sendMessage(conf.log_channel, `New user: ${user.username} (${user.id})`);
	}

	if(conf.welcome_count) {
		r.table("new_users").insert({id: user.id, mention: user.mention(), server: server.id, joined: r.now()}).run();

				r.table("new_users").filter({server: server.id}).run().then( (results) => {
						return results;
				})
				.then( (users) => {
	if(users.length >= conf.welcome_count) {
						bot.sendMessage(server.defaultChannel, `Welcome to our newest members!\n ${users.map(user => user.mention).join(", ")}`);
		r.table("new_users").filter({server: server.id}).delete().run();
	}
			});
	}

	if(conf.welcome_message) {
			let channel = conf.private_welcome ? user : config.log_channel;
			if(!channel) return;
			bot.sendMessage(channel, conf.welcome_message).catch(log.error);
	}

	if(server.id === "225963025348296705") {
		// DEPRECATED: see previous condition on welcome_message
		//var message = util.format(config.welcome.message, user.username);
		//var messageRecipient = (config.welcome.inPrivate ? user : server.channels.get("name", config.welcome.channel));
		//bot.sendMessage(messageRecipient, message);

		// TODO: Add milestone to DB as config.
		var milestoneStep = config.milestone.step;
		var milestoneMessage = config.milestone.message;
		if(server.members.length % milestoneStep == 0) {
				bot.sendMessage(server.defaultChannel, util.format(milestoneMessage, server.members.length));
		}
	}
});

bot.on("serverMemberRemoved", (server, user) => {
		log.leave(`${user.username} (${server.detailsOfUser(user).nick}) has left ${server.name}`);

		var conf = serverconf.get(server.id);
		if(!conf) {
				console.log(`Member left: Could not get configuration for server ${server.name}`);
				return;
		}

		if(conf.log_channel) {
				bot.sendMessage(conf.log_channel, `User has left: ${user.username} (${user.id})`);
		}

		if(conf.welcome_count) {
				r.table("new_users").filter({id: user.id, server: server.id}).delete().run();
		}
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
