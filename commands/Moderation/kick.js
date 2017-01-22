exports.run = (client, msg, [user, ...args]) => {
  msg.mentions.users.first().sendMessage(`You have been kicked from the ${msg.guild.name} Discord.\n**Reason:** ${args.toString().split(",").join(" ")}`);
  msg.guild.member(user).kick()
  .then(() => msg.channel.sendMessage(`**${user.username}#${user.discriminator}** was kicked.`))
  .catch(e => msg.reply(`There was an error trying to kick: ${e}`));

  try {
    client.channels.get(`${msg.guildConf.logChannel}`).sendMessage('', {
      embed: {
        author: {
          name: `${msg.author.username}#${msg.author.discriminator}`,
          icon_url: msg.author.avatarURL
        },
        color: 16711680,
        description: `**Member:** ${msg.mentions.users.first().username}#${msg.mentions.users.first().discriminator} (${msg.mentions.users.first().id})\n**Action:** Kick\n**Reason:** ${args.toString().split(",").join(" ")}`,
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
  aliases: ["k"],
  permLevel: 2,
  botPerms: ["KICK_MEMBERS"],
  requiredFuncs: [],
};

exports.help = {
  name: "kick",
  description: "Kicks mentioned user and logs reason.",
  usage: "<user:user> <reason:str> [...]",
  usageDelim: " ",
};
