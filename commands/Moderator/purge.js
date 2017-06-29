exports.run = async (client, msg, [user, amount, all = null]) => {
    const executor = msg.author;

    try {
        let messages = await msg.channel.fetchMessages({ limit: amount+1 });
        const messagesFiltered = await filterMessages(client, executor, messages, all);

        await msg.channel.bulkDelete(messagesFiltered);
    
    } catch (err) {
        client.emit("log", err, "error");
    }

    return msg.reply("Messages deleted.");

};

filterMessages = async (client, executor, messages, all) => {
    if (all === "all") {
        return messages;
    }

    //TODO: Make purge actually work, also purge by user

    const messagesFiltered = await messages.filter(async (m) => {
        const canMod = await client.funcs.hierarchyCheck(client, executor, m.author, m.guild).catch((err) => client.emit("log", err, "error"));
        console.log(!canMod);
        return(!canMod);
    });

    return messagesFiltered;

};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  selfbot: false,
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "purge",
  description: "This will remove X amount of messages sent in a channel, or by Y user.",
  usage: "[user:mention] <amount:int{1,100}> [all:string]",
  usageDelim: " ",
  type: "commands",
};