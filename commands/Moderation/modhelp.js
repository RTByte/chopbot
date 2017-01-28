const Discord = require('discord.js');

exports.run = (client, msg, [cmd]) => {
  if (!cmd) {
    const helpMessage = new Discord.RichEmbed()
      .setAuthor("Moderation Commands", client.user.avatarURL)
      .setColor("#ffffff")
      .addField("-modhelp [command]", "Provides moderation command help. Goes into detail if a command is specified.")
      .addField("-warn <@user> <...reason>", "Warns mentioned user and logs reason.\nAliases: *'w'*")
      .addField("-mute <@user> <...reason>", "Mutes mentioned user and logs reason.\nAliases: *'m'*", true)
      .addField("-unmute <@user>", "Unmutes mentioned user and logs it.\nAliases: *'um'*", true)
      .addField("-kick <@user> <...reason>", "Kicks mentioned user and logs reason.\nAliases: *'k'*")
      .addField("-ban <@user> <...reason>", "Bans mentioned user and logs reason.\nAliases: *'b'*")
      .addField("-purge [@user] <amount>", "Removes specified amount of messages from a channel, by user, if specified.\nAliases: *'prune'*, *'p'*")
      .addField("-userinfo [@user]", "Displays user information. Returns your info if no other user is specified.\nAliases: *'uinfo'*, *'whois'*", true)
      .addField("-serverinfo", "Displays server information.\nAliases: *'sinfo'*", true)
      .addField("-stats", "Displays bot statistics.\nAliases: *'statistics'*");
    msg.author.sendEmbed(helpMessage, '', { disableEveryone: true });
    msg.reply("Sent you a DM with information.")
  } else if (client.commands.has(cmd)) {
    cmd = client.commands.get(cmd);
    const helpMessageCMD = new Discord.RichEmbed()
      .setAuthor(`${cmd.help.name}`, client.user.avatarURL)
      .setColor("#ffffff")
      .setTitle(`${cmd.help.description}`)
      .setDescription(`\`${client.funcs.fullUsage(client, cmd)}\``);
    msg.author.sendEmbed(helpMessageCMD, '', { disableEveryone: true });
    msg.reply("Sent you a DM with information.")
  }

  // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
  const devLogger = new Discord.RichEmbed()
    .setAuthor(`${msg.guild.name}`, msg.guild.iconURL)
    .setColor("#ffffff")
    .addField("Command Content", `${msg.content}`, true)
    .setTimestamp()
    .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);
  client.channels.get('271869758024974336').sendEmbed(devLogger, '', { disableEveryone: true });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "modhelp",
  description: "Provides moderation command help. Goes into detail if a command is specified.",
  usage: "[command:str]",
  usageDelim: "",
};
