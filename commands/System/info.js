exports.run = (client, msg) => {
  msg.channel.sendMessage(`❕ ChopBot, a Discord bot built for the RT Family Discord servers. Coded by <@106061111605878784>, <@171366637969211392> & <@212020454653689856>.`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["details", "what"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "info",
  description: "Provides some information about this bot.",
  usage: "",
  usageDelim: "",
};
