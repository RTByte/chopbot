const Discord = require('discord.js');

exports.run = (client, msg) => {
  const serverEmbed = new Discord.RichEmbed()
    .setAuthor("RT Family Discord Servers", "http://i.imgur.com/FPSeQL4.png")
    .setColor("#ffffff")
    .setDescription("Click the name of the Discord server you want to join!")
    .addField("Let's Play Network", "• [Cow Chop Community](https://discord.gg/cowchop)\n• [Kinda Funny](https://discord.gg/kindafunny)\n• [The Creatures Community](https://discord.gg/d5YjjdP)\n• [Game Attack Community](https://discord.gg/F8fncjr)", true)
    .addField("Rooster Teeth", "• [Rooster Teeth Community](https://https://discord.gg/roosterteeth)\n• [Funhaus Community](https://discord.gg/ecWNNZx)\n• [Achievement Hunter Community](https://discord.gg/P8cJ9vC)\n• [RTX 2017](https://discord.gg/0oqF8OqUW3gQDZD2)", true)
    .addField("Community Servers", "• [Community Bite](https://discord.gg/zQstVc9)", true)
    .addField("Rooster Teeth Shows", "• [/r/RWBY](https://discord.gg/rwby)\n• [Red vs. Blue](https://discord.gg/TkeEJ9D)", true)
    .setThumbnail("http://i.imgur.com/7lSighC.png", 50, 50)
    .setTimestamp()
    .setFooter(`Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);
  msg.channel.sendEmbed(serverEmbed, '', { disableEveryone: true });

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
  aliases: ["serv", "rtfam"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "servers",
  description: 'Links to all RT Family Discord servers.',
  usage: "",
  usageDelim: "",
};
