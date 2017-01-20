exports.run = (client, msg) => {
  msg.channel.sendMessage("Ping?")
    .then((message) => {
      message.edit(`PONG! \`${message.createdTimestamp - msg.createdTimestamp} ms\``);
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
  description: 'Pings the bot, returns with "PONG!" and the response time in milliseconds.',
  usage: "",
  usageDelim: "",
};
