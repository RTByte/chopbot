exports.run = (client, msg, [user]) => {
  const target = msg.mentions.users.first() || msg.author;

  msg.channel.sendMessage('', {
    embed: {
      author: {
        name: `${target.username}`,
        icon_url: target.avatarURL
      },
      color: 16645629,
      fields: [{
          name: "ID",
          value: `${target.id}`,
          inline: true
        },
        {
          name: "Name & Discriminator",
          value: `${target.username}#${target.discriminator}`,
          inline: true
        },
        {
          name: "Status",
          value: `${target.presence.status}`,
          inline: true
        },
        {
          name: "Bot Account",
          value: `${target.bot}`,
          inline: true
        },
        {
          name: "Created on",
          value: `${target.createdAt}`
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
  aliases: ["whois", "uinfo"],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: []
};

exports.help = {
  name: "userinfo",
  description: "Displays user information.",
  usage: "[user:user]",
  usageDelim: ""
};
