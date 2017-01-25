exports.run = (client, msg) => {
  const Discord = require('discord.js');
  try {
    const deleteEmbed = new Discord.RichEmbed()
      .setAuthor(`#${msg.channel.name}`, msg.guild.iconURL)
      .setColor("#4286f4")
      .addField("Message Deleted", `\`${msg.content}\``, true)
      .setTimestamp()
      .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);
    client.channels.get(`${msg.guildConf.logChannel}`).sendEmbed(deleteEmbed, '', { disableEveryone: true });
  } catch (err) {
    return;
  }
};
