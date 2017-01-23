const Discord = require('discord.js');

const profanityFinder = require("profanity-finder");

const findProfanity = profanityFinder.findprofanity;

exports.conf = {
  enabled: true,
};

exports.run = (client, msg) => {
  return new Promise((resolve, reject) => {
    const bool = findProfanity(msg.content);
    const whitelist = msg.guildConf.whiteList;
    if (bool) {
      msg.delete();

      try {
        const blacklistEmbed = new Discord.RichEmbed()
          .setAuthor(`#${msg.channel.name}`, msg.guild.iconURL)
          .setColor(16711680)
          .addField("Blacklisted word detected. Message deleted.", `\`${msg.content}\``, true)
          .setTimestamp()
          .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
        client.channels.get(`${msg.guildConf.logChannel}`).sendEmbed(blacklistEmbed, '', { disableEveryone: true });
      } catch (err) {
        return;
      }
    } else {
      resolve();
    }
  });
};
