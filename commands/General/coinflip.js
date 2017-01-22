const Discord = require('discord.js');

exports.run = (client, msg) => {
  msg.reply(`${Math.random() > 0.5 ? '🙂 heads' : '🙃 tails'}.`);

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
  selfbot: false,
  guildOnly: false,
  aliases: ['coin', "flip"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: 'coinflip',
  description: 'Flips a (pseudo) coin. 🙂 for heads, 🙃 for tails.',
  usage: '',
  usageDelim: '',
};
