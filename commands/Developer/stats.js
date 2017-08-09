const { version: discordVersion } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const { version: komadaVersion } = require("komada");

exports.run = async (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  return msg.sendCode("asciidoc", [
    "= STATISTICS =",
    "",
    `• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
    `• Uptime     :: ${duration}`,
    `• Users      :: ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
    `• Servers    :: ${client.guilds.size.toLocaleString()}`,
    `• Channels   :: ${client.channels.size.toLocaleString()}`,
    `• Komada     :: v${komadaVersion}`,
    `• Discord.js :: v${discordVersion}`,
  ]);
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: ["details", "what"],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "stats",
  description: "Provides bot statistics, such as memory usage, uptime, and versions.",
  usage: "",
  usageDelim: "",
};