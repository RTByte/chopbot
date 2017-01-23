const Discord = require('discord.js');

exports.run = (client, msg, [cmd]) => {
  if (!cmd) {
    const helpMessage = new Discord.RichEmbed()
      .setAuthor("General Commands", client.user.avatarURL)
      .setColor(16645629)
      .addField("-help [command]", "Provides command help. Goes into detail if a command is specified.")
      .addField("-ping", 'Pings the bot, returns with "PONG!" and the response time in milliseconds')
      .addField("-info", "Provides some basic information about the bot.\nAliases: *'details'*, *'what'*")
      .addField("-8ball <question>?", "Magic 8-Ball, does exactly what the toy does (Results may vary).\nAliases: *'8'*, *'magic'*, *'mirror'*, *'magicconch'*")
      .addField("-choice <first choice>, <second choice>", "Makes a decision for you given some choices.\nAliases: *'choose'*, *'decide'*")
      .addField("-coinflip", "Flips a (pseudo) coin. 🙂 for heads, 🙃 for tails.\n\nAliases: *'coin'*, *'flip'*")
    msg.author.sendEmbed(helpMessage, '', { disableEveryone: true });
    msg.reply("Sent you a DM with information.")
  } else if (client.commands.has(cmd)) {
    cmd = client.commands.get(cmd);
    const helpMessageCMD = new Discord.RichEmbed()
      .setAuthor(`${cmd.help.name}`, client.user.avatarURL)
      .setColor(16645629)
      .setTitle(`${cmd.help.description}`)
      .setDescription(`\`${client.funcs.fullUsage(client, cmd)}\``);
    msg.author.sendEmbed(helpMessageCMD, '', { disableEveryone: true });
    msg.reply("Sent you a DM with information.")
  }

  // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
  const devLogger = new Discord.RichEmbed()
    .setAuthor(`${msg.guild.name}`, msg.guild.iconURL)
    .setColor(16645629)
    .addField("Command Content", `${msg.content}`, true)
    .setTimestamp()
    .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);
  client.channels.get('271869758024974336').sendEmbed(devLogger, '', { disableEveryone: true });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "help",
  description: "Provides command help. Goes into detail if a command is specified.",
  usage: "[command:str]",
  usageDelim: "",
};
