exports.run = (client, msg, [user]) => {
  msg.mentions.users.first().send(`You have been banned from the ${msg.guild.name} Discord.\n**Reason:** (call reason)\n\nYou can appeal your ban by DMing me the command \`appeal <message>\`, where \`'<message>'\` is a message detailing why you think you deserve to have your ban lifted. You must send this command without a prefix or I won't recognize it. If you are currently banned from more than one of the Rooster Teeth family Discords, you may only appeal the most recent ban until that appeal is approved or rejected. If your appeal is rejected, you may not appeal again.\n\n If you are unable to DM me because we do not have any mutual servers, you may use this invite to gain a mutual server and then DM me your appeal.\nhttps://discord.gg/nrHafz3\n\nYou still want to remain in this mutual server until after your appeal has been approved so that you can be notified of the appeal result.`)
  msg.guild.member(user).ban()
  .then(() => msg.channel.sendMessage(`**${user.username}#${user.discriminator}** was banned.`))
  .catch(e => msg.reply(`There was an error trying to ban: ${e}`));
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
  description: "Bans mentioned user. Currently does not require reason (no mod-log)",
  usage: "<user:user>",
  usageDelim: "",
};
