const boilerplate = `This action was performed manually by a moderator. If you are confused, or need help, feel free to DM the the owner of the server, listed below.`;

module.exports = async (client, executor, target, msg, action, reason, silent = false, guild = null) => {
    if (!msg && !guild) return;
    if (msg) guild = msg.guild;

    const modLog = new client.methods.Embed()
        .setAuthor(executor.tag, executor.avatarURL())
        .setTimestamp();

    switch (action.toLowerCase()) {
		case "ban":
    	case "vc ban":
    	case "softban":
    	case "kick":
    	case "vc kick":
    	case "mute":
    		modLog.setDescription(`**Member:** ${target.tag} (${target.id})\n**Action:** ${action}\n**Reason:** ${reason}`);
    		modLog.setColor("#ff0000");
    		break;
    	case "unmute":
    	case "vc unban":
    	case "report":
    		modLog.setDescription(`**Member:** ${target.tag} (${target.id})\n**Action:** ${action}`);
    		modLog.setColor("#fff200");
    		break;
    	case "warning":
    		modLog.setDescription(`**Member:** ${target.tag} (${target.id})\n**Action:** ${action}\n**Reason:** ${reason}`);
    		modLog.setColor("#fff200");
    		break;
    	default:
    		break;
    }

    if (!silent) {
    	var actionMessage = "";

			switch (action.toLowerCase()) {
    		case "ban": actionMessage = `You have been banned from the ${guild.name} Discord. \n **Reason:** ${reason}\n\n` + boilerplate + guild.owner
    			break;
    		case "kick": actionMessage = `You have been kicked from the ${guild.name} Discord. \n **Reason:** ${reason}\n\n` + boilerplate + guild.owner
    			break;
    		case "mute": actionMessage = `You have been muted in the ${guild.name} Discord. \n **Reason:** ${reason}\n\n` + boilerplate + guild.owner
    			break;
    		case "warning": actionMessage = `You have recieved a warning in the ${guild.name} Discord. \n **Reason:** ${reason}\n\n` + boilerplate + guild.owner
    			break;
    		case "vc kick": actionMessage = `You have been kicked from voice chat in the ${guild.name} Discord. \n **Reason:** ${reason}\n\n` + boilerplate + guild.owner
    			break;
    		case "vc ban": actionMessage = `You have been banned from voice chat in the ${guild.name} Discord. \n **Reason:** ${reason}\n\n` + boilerplate + guild.owner
    			break;
    		case "softban": actionMessage = `You have been kicked from the ${guild.name} Discord, and your messages from the past 24 hours have been removed. \n **Reason:** ${reason}\n\n` + boilerplate + guild.owner
    			break;
    		case "unmute": actionMessage = `Your mute on the ${guild.name} Discord has been lifted. You can now use the text and voice chat again.\n\n`
    			break;
    		case "vc unban": actionMessage = `Your voice chat ban on the ${guild.name} Discord has been lifted. You can now use the voice chat again.\n\n`
    			break;
    		default:
    			break;
    	}

    	await target.send(actionMessage);

		if (msg) await msg.react(client.confirmEmoji);
    }

    if (guild.settings.logChannel) await client.channels.get(guild.settings.logChannel).send('', { disableEveryone: true, embed: modLog });

    const modAction = await client.funcs.modhistory.addAction(client, target, executor, guild, action, reason);

    return;
}

module.exports.conf = { requiredModules: [] };

module.exports.help = {
  name: "modAction",
  type: "functions",
  description: "Logs moderator actions to guild's log channel & notifies user who's been acted upon if necessary.",
};
