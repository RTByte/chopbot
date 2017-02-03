const Discord = require('discord.js');

// CURRENTLY INCLUDES COMMAND AND RESPONSE IN QUEUE, SO -purge 2 WOULD ONLY GET RID OF THOSE TWO. NEED TO DELETE THE TWO BEFORE FETCHING MESSAGES AND DELETING.
exports.run = (client, msg, [user, amount]) => {
  msg.channel.sendMessage("`Fetching messages...`")
    .then(msg2 => msg2.delete(200));
  msg.delete()
  setTimeout(function() {
    msg.channel.fetchMessages({
      limit: amount,
    }).then((messages) => {
      if (user) {
        const filterBy = user ? user.id : client.user.id;
        if (client.config.selfbot) amount++;
        messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
      }
      if (client.config.selfbot) {
        messages.map(m => m.delete().catch(error => console.log(error.stack)));
      } else {
        msg.channel.bulkDelete(messages).catch(error => console.log(error.stack));
      }
    });
  }, 300);

  // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
  const devLogger = new Discord.RichEmbed()
    .setAuthor(`${msg.guild.name}`, msg.guild.iconURL)
    .setColor("#ffffff")
    .addField("Command Content", `${msg.content}`, true)
    .setTimestamp()
    .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);
  client.channels.get('271869758024974336').sendEmbed(devLogger, '', { disableEveryone: true });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  selfbot: false,
  aliases: ["prune", "p"],
  permLevel: 2,
  botPerms: ["MANAGE_MESSAGES"],
  requiredFuncs: [],
};

exports.help = {
  name: "purge",
  description: "Removes specified amount of messages from a channel, by user, if specified.",
  usage: "[user:mention] <amount:int{1,100}>",
  usageDelim: " ",
};
