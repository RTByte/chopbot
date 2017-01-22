const Discord = require('discord.js');

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
