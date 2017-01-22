const profanityFinder = require("profanity-finder");

const findProfanity = profanityFinder.findprofanity;

exports.conf = {
  enabled: true,
};

exports.run = (client, msg) => {
  return new Promise((resolve, reject) => {
    const bool = findProfanity(msg.content);
    if (bool) {
      msg.delete();

      client.channels.get(`${msg.guildConf.logChannel}`).sendMessage('', {
        embed: {
          author: {
            name: `#${msg.channel.name}`,
            icon_url: msg.guild.iconURL
          },
          color: 16711680,
          fields: [{
              name: "Blacklisted word detected. Message deleted.",
              value: `\`${msg.content}\``,
              inline: true
            }
          ],
          timestamp: new Date(),
          footer: {
            text: `${msg.author.username}#${msg.author.discriminator}`,
            icon_url: msg.author.avatarURL
          }
        }
      });

      // DEV LOGGER, LOGS TO #bot-log in ChopBot Dev
      client.channels.get('271869758024974336').sendMessage('', {
        embed: {
          author: {
            name: `${msg.guild.name}`,
            icon_url: msg.guild.iconURL
          },
          color: 16711680,
          fields: [{
              name: "Blacklisted word detected. Message deleted.",
              value: `\`${msg.content}\``,
              inline: true
            }
          ],
          timestamp: new Date(),
          footer: {
            text: `${msg.author.username}#${msg.author.discriminator}`,
            icon_url: msg.author.avatarURL
          }
        }
      });
    } else {
      resolve();
    }
  });
};
