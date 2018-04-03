exports.run = async (client, msg, [amount = 1, type = "d6"]) => {
  //Changing default type if they used the command as 'd20'
  if (msg.content.startsWith(`${msg.guildSettings.prefix}d20`) || msg.content.startsWith(`${client.config.prefix}d20`)) {
    type = "d20";
  }

  //Defaults and sentinel for verification
  let faces = 6;
  let valid = false;

  //TODO: I could probably do this with regex...
  switch (type) {
    case "d20": faces = 20; valid = true; break;
    case "d12": faces = 12; valid = true; break;
    case "d10": faces = 10; valid = true; break;
    case "d8": faces = 8; valid = true; break;
    case "d6": faces = 6; valid = true; break;
    case "d4": faces = 4; valid = true; break;
    default: faces = 6; break;
  }

  //Exiting if the args aren't valid
  if (!valid) {
    return msg.reply(`${client.denyEmoji} Sorry, I can only roll up to 10 of these dice:\n d20, d12, d10, d8, d6, d4.`);
  }

  //Rolling the dice
  let dice = await rollDice(faces, amount);

  return msg.reply(`here are the dice you rolled.\n 🎲**${dice.join('**, 🎲**')}**\n\nTotal: **${dice.reduce((a, b) => a + b, 0)}**`);

};

rollDice = async (faces, amount) => {
  let dice = [];

  for (let i = 0; i < amount; i++) {
    dice.push(Math.floor(Math.random() * faces) + 1);
  }

  return dice;

}

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  selfbot: false,
  aliases: ["dice", "d20"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "roll",
  description: "Rolls a die. Optionally specify the amount of dice and their type.",
  usage: "[amount:int{1,10}] [type:str]",
  usageDelim: " ",
  type: "commands",
};
