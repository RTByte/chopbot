exports.run = (client, msg, [cmd]) => {
  if (!cmd) {
    msg.author.sendMessage('', {
      embed: {
        author: {
          name: "General Commands",
          icon_url: client.user.avatarURL
        },
        color: 16645629,
        fields: [
          {
            name: "-help [command]",
            value: 'Provides command help. Goes into detail if a command is specified.'
          },
          {
            name: "-ping",
            value: 'Pings the bot, returns with "PONG!" and the response time in milliseconds.'
          },
          {
            name: "-info",
            value: 'Provides some basic information about the bot.\n\nAliases: *"details", "what"*'
          },
          {
            name: "-8ball <question>?",
            value: 'Magic 8-Ball, does exactly what the toy does (Results may vary).\n\nAliases: *"8", "magic", "mirror", "magicconch"*'
          },
          {
            name: "-choice <first choice>, <second choice>",
            value: 'Makes a decision for you given some choices.\n\nAliases: *"choose", "decide"*'
          },
          {
            name: "-coinflip",
            value: 'Flips a (pseudo) coin. 🙂 for heads, 🙃 for tails.\n\nAliases: *"coin"*'
          }
        ]
      }
    });
    msg.reply("Sent you a DM with information.")
  } else if (client.commands.has(cmd)) {
    cmd = client.commands.get(cmd);
    msg.author.sendMessage('', {
      embed: {
        author: {
          name: `${cmd.help.name}`,
          icon_url: client.user.avatarURL
        },
        color: 16645629,
        title: `${cmd.help.description}`,
        description: `\`${client.funcs.fullUsage(client, cmd)}\``
      }
    });
    msg.reply("Sent you a DM with information.")
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
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "help",
  description: "Provides command help. Goes into detail if a command is specified.",
  usage: "[command:str]",
  usageDelim: "",
};
