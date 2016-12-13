exports.run = (client, msg) => {
  msg.channel.sendMessage("Killing bot. Restart required.")
  client.funcs.log("Disconnected via developer command. Restart required.", "warn");
  process.exit(0);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "kill",
  description: "Kills all bot processes. Can only be executed by a developer.",
  usage: "",
  usageDelim: "",
};
