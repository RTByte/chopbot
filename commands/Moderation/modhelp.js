exports.run = (client, msg, [cmd]) => {
  if (!cmd) {
    msg.author.sendMessage('', {
      embed: {
        author: {
          name: "Moderation Commands",
          icon_url: client.user.avatarURL
        },
        color: 16645629,
        fields: [
          {
            name: "-modhelp [command]",
            value: 'Provides moderation command help. Goes into detail if a command is specified.'
          },
          {
            name: "-ban <@user> <...reason>",
            value: 'Bans mentioned user and logs reason.\nAliases: *"b"*'
          },
          {
            name: "-kick <@user> <...reason>",
            value: 'Kicks mentioned user and logs reason.\nAliases: *"k"*'
          },
          {
            name: "-mute <@user> <...reason>",
            value: 'Mutes mentioned user and logs reason.\nAliases: *"m"*',
            inline: true
          },
          {
            name: "-unmute <@user>",
            value: 'Unmutes mentioned user and logs it.\nAliases: *"um"*',
            inline: true
          },
          {
            name: "-purge [@user] <amount>",
            value: 'Removes specified amount of messages from a channel, by user, if specified.\nAliases: *"prune", "p"*'
          },
          {
            name: "-serverinfo",
            value: 'Displays server information.\nAliases: *"sinfo"*'
          },
          {
            name: "-userinfo [@user]",
            value: 'Displays user information. Returns your info if no other user is specifed.\nAliases: *"uinfo"*'
          },
          {
            name: "-stats",
            value: 'Displays bot statistics.\nAliases: *"statistics"*'
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
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "modhelp",
  description: "Provides moderation command help. Goes into detail if a command is specified.",
  usage: "[command:str]",
  usageDelim: "",
};
