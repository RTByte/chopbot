const botConfig = require("../botConfig.json");

exports.init = (client) => {
	client.devLogging = botConfig.devLogging;
    client.devLogChannel = botConfig.devLogChannel;
    client.user.setGame(botConfig.playing);
    client.user.setStatus(botConfig.status);
    client.ytKey = botConfig.ytKey;

    const botRestart = new client.methods.Embed()
        .setAuthor(client.user.tag, client.user.avatarURL())
        .setColor("#fff200")
        .setTimestamp()
        .setFooter("Bot restarted")

    return client.channels.get(client.devLogChannel).send('', { disableEveryone: true, embed: botRestart });
}
