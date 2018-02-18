exports.run = async (client, msg) => {
  const message = await msg.sendMessage("🏓 Ping?");
  return msg.sendMessage(`🏓 Pong! \`${Math.round(client.ping)}ms\``);
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
  description: "Ping/Pong command. I wonder what this does? /sarcasm",
  usage: "",
  usageDelim: "",
};
