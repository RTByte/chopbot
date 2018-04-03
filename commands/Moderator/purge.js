exports.run = async (client, msg, [target = null, amount, all = null]) => {
  //TODO: Make purging >100 messages possible (Loop?)

  //Fetching <amount> of messages in this channel
  let messages = await msg.channel.messages.fetch({ limit: amount });

  //Filtering out messages that weren't sent by target user, if one is specified
  if (target) {
    messages = messages.filter(m => m.author.id === target.id);
  }

  //Filtering messages from non-modable users if 'all' override isn't used
  if (all !== "all"){
    modableMessages = await findModableMessages(client, msg, messages);

    messages = messages.filter(m => modableMessages.includes(m.id))
  }

  try {
    //Regular purge, doesn't show in mod logs
    await msg.channel.bulkDelete(messages);
  } catch (err) {
    //Purging <3 messages at a time
    await messages.deleteAll();
  }

  if (all === "all") return;

  return msg.react(client.confirmEmoji);

};

findModableMessages = async (client, msg, messages) => {
  let messageArray = [];

  await messages.every((m) => messageArray.push(m));

  var IDsToDelete = [];

  for (let i = 0; i <= messageArray.length-1; i++) {
      let canMod = await client.funcs.hierarchyCheck(client, msg.author, messageArray[i].author, messageArray[i].guild).catch(err => client.emit("log", err, "error"));

      if (canMod){
        IDsToDelete.push(messageArray[i].id);
      }
    };

  return IDsToDelete;

};



exports.conf = {
  enabled: true,
  runIn: ["text"],
  selfbot: false,
  aliases: [],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: ["hierarchyCheck"],
  requiredModules: [],
};

exports.help = {
  name: "purge",
  description: "Removes X amount of messages, optionally sent by Y user. Append the word 'all' to ignore the role hierarchy.",
  usage: "[user:mention] <amount:int{2,100}> [all:string]",
  usageDelim: " ",
  type: "commands",
};
