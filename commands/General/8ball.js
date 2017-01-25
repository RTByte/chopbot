const Discord = require('discord.js');
const answers = ["Maybe.", "Certainly not.", "I hope so.", "Not in your wildest dreams.", "There is a good chance.", "Quite likely.", "I think so.", "I hope not.", "I hope so.", "Never!", "Fuhgeddaboudit.", "Ahaha! Really?!?", "Pfft.", "Sorry, bucko.", "Hell, yes.", "Hell to the no.", "The future is bleak.", "The future is uncertain.", "I would rather not say.", "Who cares?", "Possibly.", "Never, ever, ever.", "There is a small chance.", "Yes!", "Doesn't look like anything to me.", "I don't know.", "Ask someone else.", "No.", "Yes."];

exports.run = (client, msg) => {
  if (msg.content.endsWith("?")) {
    msg.reply(`🎱 ${answers[Math.floor(Math.random() * answers.length)]}`).catch(err => client.funcs.log(err.stack, "error"));
  } else {
    msg.reply("🎱 That doesn't look like a question, try again please.").catch(err => client.funcs.log(err.stack, "error"));
  }

  // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
  const devLogger = new Discord.RichEmbed()
    .setAuthor(`${msg.guild.name}`, msg.guild.iconURL)
    .setColor("#ffffff")
    .addField("Command Content", `${msg.content}`, true)
    .setTimestamp()
    .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);
  client.channels.get('271869758024974336').sendEmbed(devLogger, '', { disableEveryone: true });
};

exports.conf = {
  enabled: true,
  selfbot: false,
  guildOnly: false,
  aliases: ["8", "magic", "8ball", "mirror", "magicconch"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "8ball",
  description: "Magic 8-Ball, does exactly what the toy does (Results may vary).",
  usage: "<query:str>",
  usageDelim: "",
};
