const util = require("util").inspect;
const Discord = require('discord.js');

exports.init = (client) => {
  if (!client.funcs.confs.hasKey("logChannel")) {
    client.funcs.confs.addKey("logChannel", "REPLACE WITH CHANNEL ID");
  }
};

exports.run = (client, msg, [action, key, ...value]) => {
  if (action === "list") {
    msg.channel.sendCode("json", util(msg.guildConf));
  } else

  if (action === "get") {
    if (!key) return msg.reply("Please provide a key you wish to view");
    msg.reply(`The value for ${key} is currently: ${msg.guildConf[key]}`);
  } else

  if (action === "set") {
    if (!key || value[0] === undefined) return msg.reply("Please provide both a key and value!");
    const type = value[0].constructor.name;
    if (["TextChannel", "GuildChannel", "Message", "User", "GuildMember", "Guild", "Role", "VoiceChannel", "Emoji", "Invite"].includes(type)) {
      value = value[0].id;
    } else {
      value = value.join(" ").toString();
    }
    client.funcs.confs.set(msg.guild, key, value);
    if (msg.guildConf[key].constructor.name === "Array") {
      if (msg.guildConf[key].includes(value)) {
        return msg.reply(`The value ${value} for ${key} has been added.`);
      }
      return msg.reply(`The value ${value} for ${key} has been removed.`);
    }
    return msg.reply(`The value for ${key} has been set to: ${value}`);
  } else

  if (action === "reset") {
    if (!key) return msg.reply("Please provide a key you wish to reset");
    client.funcs.confs.resetKey(msg.guild, key);
    return msg.reply("The key has been reset.");
  }
  return false;

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
  guildOnly: true,
  aliases: ["config"],
  permLevel: 3,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "conf",
  description: "Define per-server configuration.",
  usage: "<set|get|reset|list> [key:str] [boolean:boolean|channel:channel|user:user|role:role|int:int|str:str]",
  usageDelim: " ",
};
