exports.run = (client, msg) => {
  return msg.reply(`${Math.random() > 0.5 ? '🙂 heads' : '🙃 tails'}.`);
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: ["coin"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "coinflip",
  description: "Flips a coin. 🙂 for heads, 🙃 for tails.",
  usage: "",
  usageDelim: "",
  type: "commands",
};
