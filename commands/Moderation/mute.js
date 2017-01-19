exports.run = (client, msg, [user]) => {
  let role = msg.guild.roles.find("name", "Muted")
  msg.guild.member(user).addRole(role)
  .then(() => msg.channel.sendMessage(`**${user.username}#${user.discriminator}** was muted.`))
  .catch(e => msg.reply(`There was an error trying to mute: ${e}`));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2,
  botPerms: [0x10000000],
  requiredFuncs: []
};

exports.help = {
  name: "mute",
  description: "Mutes mentioned discord user",
  usage: "<user:user> <reason:str>",
  usageDelim: " "
};
