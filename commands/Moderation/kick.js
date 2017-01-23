const Discord = require('discord.js');

exports.run = (client, msg, [user, ...args]) => {
  const target = msg.mentions.users.first();

  msg.mentions.users.first().sendMessage(`You have been kicked from the ${msg.guild.name} Discord.\n**Reason:** ${args.toString().split(",").join(" ")}`);
  msg.guild.member(user).kick()
  .then(() => msg.channel.sendMessage(`**${user.username}#${user.discriminator}** was kicked.`))
  .catch(e => msg.reply(`There was an error trying to kick: ${e}`));

  try {
    const serverLog = new Discord.RichEmbed()
      .setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
      .setColor(16711680)
      .setDescription(`**Member:** ${target.username}#${target.discriminator} (${target.id})\n**Action:** Kick\n**Reason:** ${args.toString().split(",").join(" ")}`)
      .setTimestamp();
    client.channels.get(`${msg.guildConf.logChannel}`).sendEmbed(serverLog, '', { disableEveryone: true });
  } catch (err) {
    return;
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
  guildOnly: true,
  aliases: ["k"],
  permLevel: 2,
  botPerms: ["KICK_MEMBERS"],
  requiredFuncs: [],
};

exports.help = {
  name: "kick",
  description: "Kicks mentioned user and logs reason.",
  usage: "<user:user> <reason:str> [...]",
  usageDelim: " ",
};
