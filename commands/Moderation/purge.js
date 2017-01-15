// CURRENTLY INCLUDES COMMAND AND RESPONSE IN QUEUE, SO -purge 2 WOULD ONLY GET RID OF THOSE TWO. NEED TO DELETE THE TWO BEFORE FETCHING MESSAGES AND DELETING.
exports.run = (client, msg, [user, amount]) => {
  msg.channel.sendMessage("`Fetching messages...`")
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
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  selfbot: false,
  aliases: ["prune"],
  permLevel: 2,
  botPerms: ["MANAGE_MESSAGES"],
  requiredFuncs: [],
};

exports.help = {
  name: "purge",
  description: "This will remove X amount of messages sent in a channel, or by Y user.",
  usage: "[user:mention] <amount:int{1,100}>",
  usageDelim: " ",
};
