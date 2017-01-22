const Discord = require('discord.js');

exports.run = (client, msg, [commandname]) => {
  let command;
  if (client.commands.has(commandname)) {
    command = commandname;
  } else if (client.aliases.has(commandname)) {
    command = client.aliases.get(commandname);
  }
  if (!command) {
    return msg.channel.sendMessage(`I cannot find the command: \`${commandname}\``);
  }
  client.commands.get(command).conf.enabled = true;
  return msg.channel.sendMessage(`Successfully enabled: \`${commandname}\``);

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
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "enable",
  description: "Re-enables or temporarily enables a command. Default state restored on reboot.",
  usage: "<commandname:str>",
  usageDelim: "",
};
