exports.run = (client, msg, [user, ...args]) => {
  msg.mentions.users.first().sendMessage(`You have been banned from the ${msg.guild.name} Discord.\n**Reason:** ${args.toString().split(",").join(" ")}\n\nTo appeal your ban, please DM the owner of the server you were banned from, listed below.\n<@${msg.guild.owner.id}>`)
  msg.guild.member(user).ban()
  .then(() => msg.channel.sendMessage(`**${user.username}#${user.discriminator}** was banned.`))
  .catch(e => msg.reply(`There was an error trying to ban: ${e}`));

  try {
    client.channels.get(`${msg.guildConf.logChannel}`).sendMessage('', {
      embed: {
        author: {
          name: `${msg.author.username}#${msg.author.discriminator}`,
          icon_url: msg.author.avatarURL
        },
        color: 16711680,
        description: `**Member:** ${msg.mentions.users.first().username}#${msg.mentions.users.first().discriminator} (${msg.mentions.users.first().id})\n**Action:** Ban\n**Reason:** ${args.toString().split(",").join(" ")}`,
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
  aliases: ["b"],
  permLevel: 3,
  botPerms: ["BAN_MEMBERS"],
  requiredFuncs: [],
};

exports.help = {
  name: "ban",
  description: "Bans mentioned user and logs reason.",
  usage: "<user:user> <reason:str> [...]",
  usageDelim: " ",
};
