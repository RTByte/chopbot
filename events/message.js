exports.run = (client, msg) => {
  const Discord = require('discord.js');

  // DEV MENTIONS BELOW
  if(msg.content.toLowerCase().includes("rasmus")) {
    try {
      const rasMention = new Discord.RichEmbed()
        .setAuthor(`${msg.guild.name}`, msg.guild.iconURL)
        .setColor("#ffffff")
        .addField(`Mention Detected (#${msg.channel.name})`, `${msg.content}`, true)
        .setTimestamp()
        .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);
      client.channels.get(`283746370421260289`).sendEmbed(rasMention, '', { disableEveryone: true });
    } catch (err) {
      return;
    }
  }
  if(msg.content.toLowerCase().includes("killian")) {
    try {
      const kilMention = new Discord.RichEmbed()
        .setAuthor(`${msg.guild.name}`, msg.guild.iconURL)
        .setColor("#ffffff")
        .addField(`Mention Detected (#${msg.channel.name})`, `${msg.content}`, true)
        .setTimestamp()
        .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);
      client.channels.get(`283746370421260289`).sendEmbed(kilMention, '', { disableEveryone: true });
    } catch (err) {
      return;
    }
  }
  if(msg.content.toLowerCase().includes("sugar")) {
    try {
      const sugMention = new Discord.RichEmbed()
        .setAuthor(`${msg.guild.name}`, msg.guild.iconURL)
        .setColor("#ffffff")
        .addField(`Mention Detected (#${msg.channel.name})`, `${msg.content}`, true)
        .setTimestamp()
        .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);
      client.channels.get(`283746370421260289`).sendEmbed(sugMention, '', { disableEveryone: true });
    } catch (err) {
      return;
    }
  }
  if(msg.content.toLowerCase().includes("stick")) {
    try {
      const stickMention = new Discord.RichEmbed()
        .setAuthor(`${msg.guild.name}`, msg.guild.iconURL)
        .setColor("#ffffff")
        .addField(`Mention Detected (${msg.channel})`, `${msg.content}`, true)
        .setTimestamp()
        .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);
      client.channels.get(`283746370421260289`).sendEmbed(stickMention, '', { disableEveryone: true });
    } catch (err) {
      return;
    }
  }
};
