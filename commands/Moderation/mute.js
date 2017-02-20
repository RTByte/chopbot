const Discord = require('discord.js');

exports.run = (client, msg, [user, ...args]) => {
  const target = msg.mentions.users.first();

  let role = msg.guild.roles.find("name", "Muted")
  client.fetchUser(target.id)
  target.sendMessage(`You have been muted in the ${msg.guild.name} Discord.\n**Reason:** ${args.toString().split(",").join(" ")}.\n\nThis action was performed manually by a moderator of the ${msg.guild.name} Discord. If you are confused, or need help, feel free to respond to this message and someone will get back to you soon.`);
  msg.guild.member(user).addRole(role)
  .then(() => msg.channel.sendMessage(`Muted <@${user.id}>.`))
  .catch(e => msg.reply(`There was an error trying to mute: ${e}`));

  try {
    const serverLog = new Discord.RichEmbed()
      .setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
      .setColor("#ff7200")
      .setDescription(`**Member:** ${target.username}#${target.discriminator} (${target.id})\n**Action:** Mute\n**Reason:** ${args.toString().split(",").join(" ")}`)
      .setTimestamp();
    client.channels.get(`${msg.guildConf.logChannel}`).sendEmbed(serverLog, '', { disableEveryone: true });
  } catch (err) {
    return;
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
  aliases: ["m"],
  permLevel: 2,
  botPerms: [0x10000000],
  requiredFuncs: []
};

exports.help = {
  name: "mute",
  description: "Mutes mentioned user and logs reason.",
  usage: "<user:user> <reason:str> [...]",
  usageDelim: " "
};
