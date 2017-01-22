exports.run = (client, msg, [user, ...args]) => {
  msg.mentions.users.first().sendMessage(`You've recieved a warning in the ${msg.guild.name} Discord.\n**Reason:** ${args.toString().split(",").join(" ")}`);
  msg.channel.sendMessage(`Warned <@${user.id}>.`)

  try {
    client.channels.get(`${msg.guildConf.logChannel}`).sendMessage('', {
      embed: {
        author: {
          name: `${msg.author.username}#${msg.author.discriminator}`,
          icon_url: msg.author.avatarURL
        },
        color: 16769280,
        description: `**Member:** ${msg.mentions.users.first().username}#${msg.mentions.users.first().discriminator} (${msg.mentions.users.first().id})\n**Action:** Warn\n**Reason:** ${args.toString().split(",").join(" ")}`,
        timestamp: new Date()
      }
    });
  } catch (err) {
    return;
  }

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
  guildOnly: true,
  aliases: ["w"],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: []
};

exports.help = {
  name: "warn",
  description: "Warns mentioned user and logs reason.",
  usage: "<user:user> <reason:str> [...]",
  usageDelim: " "
};
