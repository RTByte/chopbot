exports.run = (client, msg) => {
  msg.channel.sendMessage('Doesn\'t look like anything to me');
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: []
};

exports.help = {
  name: "bernard",
  description: "backdoor",
  usage: "",
  usageDelim: ""
};
