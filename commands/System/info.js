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
          name: "Libraries",
          value: "[Discord.js](https://discord.js.org/#/)\n[Komada](https://github.com/eslachance/komada)",
          inline: true
        },
        {
          name: "Authors",
          value: "• <@106061111605878784> \n• <@171366637969211392> \n• <@212020454653689856>",
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
  description: "Provides some information about this bot.",
  usage: "",
  usageDelim: "",
};
