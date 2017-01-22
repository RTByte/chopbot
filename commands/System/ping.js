const Discord = require('discord.js');

exports.run = (client, msg) => {
  msg.channel.sendMessage("Ping?")
    .then((message) => {
      message.edit(`PONG! \`${message.createdTimestamp - msg.createdTimestamp} ms\``);
  });

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
  name: "ping",
  description: 'Pings the bot, returns with "PONG!" and the response time in milliseconds.',
  usage: "",
  usageDelim: "",
};
