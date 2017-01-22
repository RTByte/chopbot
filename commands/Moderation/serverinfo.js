const Discord = require('discord.js');

exports.run = (client, msg) => {
  msg.channel.sendMessage('', {
    embed: {
      author: {
        name: `${msg.guild.name}`,
        icon_url: msg.guild.iconURL
      },
      color: 16645629,
      fields: [{
          name: "ID",
          value: `${msg.guild.id}`,
          inline: true
        },
        {
          name: "Name",
          value: `${msg.guild.name}`,
          inline: true
        },
        {
          name: "Owner",
          value: `<@${msg.guild.ownerID}>`,
          inline: true
        },
        {
          name: "Members",
          value: `${msg.guild.memberCount}`,
          inline: true
        },
        {
          name: "Channels",
          value: `${msg.guild.channels.size}`,
          inline: true
        },
        {
          name: "Emojis",
          value: `${msg.guild.emojis.size}/50`,
          inline: true
        },
        {
          name: "Roles",
          value: `${msg.guild.roles.size}`,
          inline: true
        },
        {
          name: "Region",
          value: `${msg.guild.region}`,
          inline: true
        },
        {
          name: "Created on",
          value: `${msg.guild.createdAt}`,
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
  guildOnly: true,
  aliases: ["sinfo"],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: []
};

exports.help = {
  name: "serverinfo",
  description: "Displays server information.",
  usage: "",
  usageDelim: ""
};
