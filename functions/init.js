const botConfig = require("../botConfig.json");

exports.init = (client) => {
	//Setting global vars
    client.devLogging = botConfig.devLogging;
    client.devLogChannel = botConfig.devLogChannel;
    client.confirmEmoji = client.emojis.get(botConfig.confirmEmoji);
    client.denyEmoji = client.emojis.get(botConfig.denyEmoji);
    client.leftEmoji = client.emojis.get(botConfig.leftEmoji);
    client.rightEmoji = client.emojis.get(botConfig.rightEmoji);
    client.homeEmoji = client.emojis.get(botConfig.homeEmoji);
    client.admEmoji = client.emojis.get(botConfig.admEmoji);
    client.modEmoji = client.emojis.get(botConfig.modEmoji);
    client.uEmoji = client.emojis.get(botConfig.uEmoji);
    client.deleteEmoji = client.emojis.get(botConfig.deleteEmoji)
    client.user.setActivity(`${botConfig.playing}`);
    client.user.setStatus(botConfig.status);

    //Don't send restart notification if we're not using the dev log
    if (!client.devLogging) return;

    //Dev log restart embed
    const botRestart = new client.methods.Embed()
        .setAuthor(client.user.tag, client.user.avatarURL())
        .setColor("#fff200")
        .setTimestamp()
        .setFooter("Bot restarted")

    return client.channels.get(client.devLogChannel).send('', { disableEveryone: true, embed: botRestart });
}
