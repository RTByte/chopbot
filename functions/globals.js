const botConfig = require("../botConfig.json");

exports.init = (client) => {
	client.devLogging = true;
    client.devLogChannel = botConfig.devLogChannel;
    client.user.setGame(botConfig.playing);
    client.user.setStatus(botConfig.status);
    client.ytKey = botConfig.ytKey;
    client.Discord = require("discord.js");
}