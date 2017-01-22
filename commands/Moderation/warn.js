exports.run = (client, msg, [user]) => {
  msg.mentions.users.first().sendMessage(`You've recieved a warning in the ${msg.guild.name} Discord.\nReason: \`call reason\``);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: []
};

exports.help = {
  name: "warn",
  description: "Give a formal warning to a user.",
  usage: "[user:user]",
  usageDelim: ""
};
