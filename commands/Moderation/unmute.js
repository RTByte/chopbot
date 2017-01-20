exports.run = (client, msg, [user]) => {
  let role = msg.guild.roles.find("name", "Muted")
  msg.mentions.users.first().send(`Your mute on the ${msg.guild.name} Discord has been lifted. You may now send messages.`);
  msg.guild.member(user).removeRole(role)
  .then(() => msg.channel.sendMessage(`<@${msg.mentions.users.first().id}> was unmuted.`))
  .catch(e => msg.reply(`There was an error trying to unmute: ${e}`));

  // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
  client.channels.get('271869758024974336').send('', {
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
  aliases: ["um"],
  permLevel: 2,
  botPerms: [0x10000000],
  requiredFuncs: []
};

exports.help = {
  name: "unmute",
  description: "Unmutes mentioned user and logs it.",
  usage: "<user:user>",
  usageDelim: ""
};
