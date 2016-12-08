exports.run = (client, msg) => {
  msg.channel.sendMessage("Ping?")
    .then((message) => {
      message.edit(`Pong! \`${message.createdTimestamp - msg.createdTimestamp} ms\``);
    });
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
  description: "Pings the bot.",
  usage: "",
  usageDelim: "",
};
