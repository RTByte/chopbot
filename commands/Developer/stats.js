const { version: discordVersion } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const { version: komadaVersion } = require("komada");

exports.run = async (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

  const statsEmbed = new client.methods.Embed()
    .setAuthor("ChopBot Statistics", client.user.avatarURL())
    .setColor("#ffffff")
    .addField("Memory Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
    .addField("Uptime", duration, true)
    .addField("Connections", `Operating on ${client.guilds.size.toLocaleString()} servers \nWatching ${client.channels.size.toLocaleString()} channels \nServing ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users`, true)
    .addField("Libraries", `[Komada v${komadaVersion}](https://github.com/dirigeants/komada)\n[Discord.JS v${discordVersion}](https://github.com/discordjs/discord.js)\n[NodeJS ${process.version}](https://nodejs.org/)`, true)

    .setThumbnail("http://i.imgur.com/7lSighC.png", 50, 50)
    .setTimestamp()
    .setFooter(`Requested by ${msg.author.tag}`, msg.author.avatarURL());
  return msg.channel.send('', { disableEveryone: true, embed: statsEmbed });
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: ["details", "what"],
  permLevel: 10,
  botPerms: ["SEND_MESSAGES"],
  requiredFuncs: [],
  requiredSettings: [],
};

exports.help = {
  name: "stats",
  description: "Provides some details about the bot and stats.",
  usage: "",
  usageDelim: "",
};
