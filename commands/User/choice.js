exports.run = async (client, msg, [...choices]) => {
  const validChoices = choices.filter(x => x);

  if (validChoices.length === 1) {
    return msg.reply("🤔 You only gave me one choice.");
  } else {
    return msg.reply(`🤔 ${choices[Math.floor(Math.random() * choices.length)]}.`);
  }
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: ["choose", "decide"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "choice",
  description: "Makes a decision based off of the choices given. Can handle up to 100 different choices.",
  usage: "<choices:str> [...]",
  usageDelim: ",",
  type: "commands",
};
