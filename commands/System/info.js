exports.run = (client, msg) => {
  msg.channel.sendMessage('', {
    embed: {
      title: "ChopBot Information",
      color: 16645629,
      fields: [{
          name: "About",
          value: "ChopBot, a Discord bot built for the RT Family Discord servers.",
          inline: true
        },
        {
          name: "Authors",
          value: "• <@106061111605878784> \n• <@171366637969211392>",
          inline: true
        },
        {
          name: "Libraries",
          value: "[Discord.js](https://discord.js.org/#/) v11\n[Komada](https://www.npmjs.com/package/komada) v0.12.4\n[YAMDBF DM Manager](https://www.npmjs.com/package/yamdbf-addon-dm-manager) v0.1.3",
          inline: true
        }
      ],
      thumbnail: {
        url: "http://i.imgur.com/7lSighC.png",
        height: 50,
        width: 50
      },
      timestamp: new Date(),
      footer: {
        icon_url: msg.author.avatarURL,
        text: `Requested by ${msg.author.username}#${msg.author.discriminator}`
      }
    }
  });

  // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
  client.channels.get('271869758024974336').sendMessage('', {
    embed: {
      author: {
        name: `${msg.guild.name}`,
        icon_url: msg.guild.iconURL
      },
      color: 16645629,
      fields: [{
          name: "Command Content",
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
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["details", "what"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "info",
  description: "Provides some basic information about the bot.",
  usage: "",
  usageDelim: "",
};
