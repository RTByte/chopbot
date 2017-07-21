exports.run = async (client, msg) => {
const { version: komadaVersion } = require("komada");
const { version: discordVersion } = require("discord.js");
const { version: yamdbfDMVersion } = require("yamdbf-addon-dm-manager");

  const infoEmbed = new client.methods.Embed()
      .setTitle("ChopBot Information")
      .setColor("#4286f4")
      .addField("About", "ChopBot, a Discord bot built for the RT Family Discord servers.", true)
      .addField("Authors", "• <@106061111605878784> \n• <@171366637969211392> \n• <@109004714934300672>", true)
      .addField("Libraries", `[Discord.js](https://discord.js.org/#/) v${discordVersion}\n[Komada](https://www.npmjs.com/package/komada) v${komadaVersion}\n[YAMDBF DM Manager](https://www.npmjs.com/package/yamdbf-addon-dm-manager) v0.1.3`)
      .setThumbnail("http://i.imgur.com/7lSighC.png", 50, 50)
      .setTimestamp()
      .setFooter(`Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);
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
  description: "Provides some information about this bot.",
  usage: "",
  usageDelim: "",
};
