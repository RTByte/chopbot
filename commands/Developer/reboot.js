exports.run = async (client, msg) => {
  await msg.react(client.confirmEmoji);
  process.exit();
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 10,
  botPerms: ["SEND_MESSAGES"],
  requiredFuncs: [],
  requiredSettings: [],
};

exports.help = {
  name: "reboot",
  description: "Reboots the bot.",
  usage: "",
  usageDelim: "",
};
