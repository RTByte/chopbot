exports.run = async (client, msg) => {
  await msg.react("413467699671203840").catch(err => client.emit("error", err));
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
