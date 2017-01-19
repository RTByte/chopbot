exports.run = (client, msg, [cmd]) => {
  if (!cmd) {
    msg.author.send('', {
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
            value: 'Bans mentioned user and logs reason.\n\nAliases: *"b"*'
          },
          {
            name: "-kick <@user> <...reason>",
            value: 'Kicks mentioned user and logs reason.\n\nAliases: *"k"*'
          },
          {
            name: "-purge [@user] <amount>",
            value: 'Removes specified amount of messages from a channel, by user, if specified.\n\nAliases: *"prune", "p"*'
          },
          {
            name: "-serverinfo",
            value: 'Displays server information.\n\nAliases: *"sinfo"*'
          },
          {
            name: "-userinfo [@user]",
            value: 'Displays user information. Returns *your* info if no other user is specifed.\n\nAliases: *"uinfo"*'
          },
          {
            name: "-stats",
            value: 'Displays bot statistics.\n\nAliases: *"statistics"*'
          }
        ]
      }
    });
    msg.reply("Sent you a DM with information.")
  } else if (client.commands.has(cmd)) {
    cmd = client.commands.get(cmd);
    msg.author.send('', {
      embed: {
        author: {
          name: `${cmd.help.name}`,
          icon_url: client.user.avatarURL
        },
        color: 16645629,
        title: `${cmd.help.description}`,
        description: `${client.funcs.fullUsage(client, cmd)}`
      }
    });
    msg.reply("Sent you a DM with information.")
  }
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
  description: "Displays help for moderation commands.",
  usage: "[command:str]",
  usageDelim: "",
};
