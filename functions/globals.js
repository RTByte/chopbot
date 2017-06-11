const botConfig = require("../botConfig.json");

exports.init = (client) => {
	client.devLogging = true;
    client.devMentionChannel = botConfig.devMentionChannel;
    client.devCommandLogChannel = botConfig.devCommandLogChannel;
    client.user.setGame(botConfig.playing);
    client.user.setStatus(botConfig.status);
}