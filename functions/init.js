const botConfig = require("../botConfig.json");
const {DMManager} = require("yamdbf-addon-dm-manager");

exports.init = (client) => {
	//Setting global vars
    client.devLogging = botConfig.devLogging;
    client.devLogChannel = botConfig.devLogChannel;
    client.user.setActivity(botConfig.playing);
    client.user.setStatus(botConfig.status);
    client.dmManager = new DMManager(client, botConfig.dmManagerServer);

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
