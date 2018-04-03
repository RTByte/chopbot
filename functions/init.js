const botConfig = require("../botConfig.json");

exports.init = (client) => {
	//Setting global vars
    client.devLogging = botConfig.devLogging;
    client.devLogChannel = botConfig.devLogChannel;
    client.confirmEmoji = client.emojis.find('id', botConfig.confirmEmoji);
    client.denyEmoji = client.emojis.find('id', botConfig.denyEmoji);
    client.leftEmoji = client.emojis.find('id', botConfig.leftEmoji);
    client.rightEmoji = client.emojis.find('id', botConfig.rightEmoji);
    client.homeEmoji = client.emojis.find('id', botConfig.homeEmoji);
    client.admEmoji = client.emojis.find('id', botConfig.admEmoji);
    client.modEmoji = client.emojis.find('id', botConfig.modEmoji);
    client.uEmoji = client.emojis.find('id', botConfig.uEmoji);
    client.deleteEmoji = client.emojis.find('id', botConfig.deleteEmoji)
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
