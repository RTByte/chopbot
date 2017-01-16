// NEEDS SUPPORT FOR OTHER USERS

exports.run = (client, msg) => {
  msg.channel.sendMessage('', {
    embed: {
      author: {
        name: `${msg.author.username}`,
        icon_url: msg.author.avatarURL
      },
      color: 16645629,
      fields: [{
          name: "ID",
          value: `${msg.author.id}`,
          inline: true
        },
        {
          name: "Name & Discriminator",
          value: `${msg.author.username}#${msg.author.discriminator}`,
          inline: true
        },
        {
          name: "Nickname",
          value `${}`
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
  guildOnly: true,
  aliases: [],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: []
};

exports.help = {
  name: "userinfo",
  description: "Displays user information.",
  usage: "",
  usageDelim: ""
};
