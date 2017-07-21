const boilerplate = "This action was performed manually by a moderator. If you are confused, or need help, feel free to respond to this message and someone will get back to you soon.";

const func = async (client, executor, target, msg, action, reason, silent = false) => {
	const channel = client.channels.get(msg.channel.id);

    const modLog = new client.methods.Embed()
        .setAuthor(executor.tag, executor.avatarURL())
        .setTimestamp();

    switch (action.toLowerCase()) {
			case "ban":
    	case "vcban":
    	case "softban":
    	case "kick":
    	case "vckick":
    	case "mute":
    		modLog.setDescription(`**Member:** ${target.tag} (${target.id})\n**Action:** ${action}\n**Reason:** ${reason}`);
    		modLog.setColor("#ff0000");
    		break;
    	case "unmute":
    	case "vcunban":
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
    		case "ban": actionMessage = `You have been banned from the ${channel.guild.name} Discord. \n **Reason:** ${reason}\n\n` + boilerplate
    			break;
    		case "kick": actionMessage = `You have been kicked from the ${channel.guild.name} Discord. \n **Reason:** ${reason}\n\n` + boilerplate
    			break;
    		case "mute": actionMessage = `You have been muted in the ${channel.guild.name} Discord. \n **Reason:** ${reason}\n\n` + boilerplate
    			break;
    		case "warning": actionMessage = `You have recieved a warning in the ${channel.guild.name} Discord. \n **Reason:** ${reason}\n\n` + boilerplate
    			break;
    		case "vckick": actionMessage = `You have been kicked from voice chat in the ${channel.guild.name} Discord. \n **Reason:** ${reason}\n\n` + boilerplate
    			break;
    		case "vcban": actionMessage = `You have been banned from voice chat in the ${channel.guild.name} Discord. \n **Reason:** ${reason}\n\n` + boilerplate
    			break;
    		case "softban": actionMessage = `You have been kicked from the ${channel.guild.name} Discord, and your messages from the past 24 hours have been removed. \n **Reason:** ${reason}\n\n` + boilerplate
    			break;
    		case "unmute": actionMessage = `Your mute on the ${channel.guild.name} Discord has been lifted. You can now use the text and voice chat again.\n\n`
    			break;
    		case "vcunban": actionMessage = `Your voice chat ban on the ${channel.guild.name} Discord has been lifted. You can now use the voice chat again.\n\n`
    			break;
    		default:
    			break;
    	}

    	await target.send(actionMessage);

			await msg.react("✅");
    }

    //TODO: add mod actions in client.funcs.userCache

    return client.channels.get(channel.guild.settings.logChannel).send('', { disableEveryone: true, embed: modLog });
}

func.conf = { requiredModules: [] };

func.help = {
  name: "modAction",
  type: "functions",
  description: "Logs moderator actions to guild's log channel & notifies user who's been acted upon if necessary.",
};

module.exports = func;
