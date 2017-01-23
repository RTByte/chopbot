const Discord = require("discord.js");
const moment = require("moment");
const komada = require("../../package.json");
require("moment-duration-format");

exports.run = (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  const statsEmbed =  new Discord.RichEmbed()
    .setTitle("ChopBot Statistics")
    .setColor(16645629)
    .addField("Memory Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
    .addField("Uptime", `${duration}`, true)
    .addField("Servers, Channels & Users", `• ${client.guilds.size} servers, \n• ${client.channels.size} channels, \n• ${client.users.size} users.`, true)
    .addField("Versions", `[Discord.js](https://discord.js.org/#/): v${Discord.version}\n[Komada](https://www.npmjs.com/package/komada): v0.12.4\n[YAMDBF DM Manager](https://www.npmjs.com/package/yamdbf-addon-dm-manager): v0.1.3`)
    .setThumbnail("http://i.imgur.com/7lSighC.png", 50, 50)
    .setTimestamp()
    .setFooter(`Requested by ${msg.author.username}#${msg.author.discriminator}`);
  msg.channel.sendEmbed(statsEmbed, '', { disableEveryone: true });

  // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
  const devLogger = new Discord.RichEmbed()
    .setAuthor(`${msg.guild.name}`, msg.guild.iconURL)
    .setColor(16645629)
    .addField("Command Content", `${msg.content}`, true)
    .setTimestamp()
    .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);
  client.channels.get('271869758024974336').sendEmbed(devLogger, '', { disableEveryone: true });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["statistics"],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "stats",
  description: "Displays bot statistics.",
  usage: "",
  usageDelim: "",
};
