exports.run = (client, msg, [user]) => {
  let role = msg.guild.roles.find("name", "Muted")
  msg.mentions.users.first().send(`Your mute on the ${msg.guild.name} Discord has been lifted. You may now send messages.`);
  msg.guild.member(user).removeRole(role)
  .then(() => msg.channel.sendMessage(`<@${msg.mentions.users.first().id}> was unmuted.`))
  .catch(e => msg.reply(`There was an error trying to unmute: ${e}`));
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
  description: "Unmutes mentioned discord user",
  usage: "<user:user>",
  usageDelim: ""
};
