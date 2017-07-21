exports.run = async (client, msg) => {
  const message = await msg.sendMessage("Ping?");
  return msg.sendMessage(`Pong! \`${Math.round(client.ping)}ms\``);
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
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
