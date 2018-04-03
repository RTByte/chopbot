exports.run = async (client, msg) => {
const { version: komadaVersion } = require("komada");
const { version: discordVersion } = require("discord.js");

  const infoEmbed = new client.methods.Embed()
      .setTitle("ChopBot Information")
      .setColor("#4286f4")
      .addField("About", "ChopBot, a Discord bot built for the RT Family Discord servers.", true)
      .addField("Authors", "• <@106061111605878784> \n• <@109004714934300672> \n• <@171366637969211392>", true)
      .addField("Libraries", `[Komada v${komadaVersion}](https://github.com/dirigeants/komada)\n[Discord.JS v${discordVersion}](https://github.com/discordjs/discord.js)\n[NodeJS ${process.version}](https://nodejs.org/)`, true)
      .setThumbnail("http://i.imgur.com/7lSighC.png", 50, 50)
      .setTimestamp()
      .setFooter(`Requested by ${msg.author.tag}`, msg.author.avatarURL());
  return msg.channel.send('', { disableEveryone: true, embed: infoEmbed });
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: ["details", "what"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "info",
  description: "Provides bot information, such as a list of authors and libraries.",
  usage: "",
  usageDelim: "",
};
