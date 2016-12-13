const Discord = require("discord.js");
const moment = require("moment");
const komada = require("../../package.json");
require("moment-duration-format");

exports.run = (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

  msg.channel.sendMessage("", {embed: {
    color: 13505053,
    author: {
      name: 'ChopBot Statistics',
      icon_url: client.user.avatarURL
  },
  fields: [
    {
      name: 'Memory Usage',
      value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
    },
    {
      name: 'Uptime',
      value: `${duration}`
    },
    {
      name: 'Servers, Channels & Users',
      value: `${client.guilds.size} servers,
      ${client.channels.size} channels,
      ${client.users.size} users.`
    },
    {
      name: "Versions",
      value: `[Komada](): ${komada.version}
      [Discord.js](): v${Discord.version}`
    }
  ],
  timestamp: new Date(),
  footer: {
    icon_url: client.user.avatarURL,
    text: 'ChopBot'
  }
}});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["details", "what"],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "stats",
  description: "Provides some details about the bot and stats.",
  usage: "",
  usageDelim: "",
};
