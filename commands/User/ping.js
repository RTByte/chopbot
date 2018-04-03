exports.run = async (client, msg) => {
  const message = await msg.send("🏓 Ping?");
  return msg.send(`🏓 Pong! \`${Math.round(client.ping)}ms\``);
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 0,
  botPerms: ["SEND_MESSAGES"],
  requiredFuncs: [],
  requiredSettings: [],
};

exports.help = {
  name: "ping",
  description: "Pings the bot.",
  usage: "",
  usageDelim: "",
};
