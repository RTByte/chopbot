exports.run = (client, msg) => {
    const Discord = require('discord.js');

    // Dev Mention Function
    if (!(msg.channel.id === 255839946093494273)) {
      if (msg.content.toLowerCase().includes("rasmus") || msg.content.toLowerCase().includes("killian") || msg.content.toLowerCase().includes("stickman")) {
          try {
              const devMention = new Discord.RichEmbed()
                  .setAuthor(`${msg.guild.name}`, msg.guild.iconURL)
                  .setColor("#ffffff")
                  .addField(`Mention Detected (#${msg.channel.name})`, `${msg.content}`, true)
                  .setTimestamp()
                  .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);
              client.channels.get(`283746370421260289`).sendEmbed(devMention, '', {
                  disableEveryone: true
              });
          } catch (err) {
              return;
          }
      }
};