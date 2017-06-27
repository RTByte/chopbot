const botConfig = require("../botConfig.json");

exports.init = (client) => {
	client.devLogging = botConfig.devLogging;
    client.devLogChannel = botConfig.devLogChannel;
    client.user.setGame(botConfig.playing);
    client.user.setStatus(botConfig.status);
    client.ytKey = botConfig.ytKey;
}