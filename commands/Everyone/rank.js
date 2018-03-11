exports.run = async (client, msg, [target = null]) => {
	if (!target) target = msg.author;
	if (!msg.guild) return;
	
	const targetMember = await msg.guild.members.fetch(target.id);
	const levelInfo = await targetMember.levelInfo;
	
	const levelEmbed = new client.methods.Embed()
		.setColor("#4286f4")
		.addField("Rank", `${levelInfo.rank}/${msg.guild.memberCount}`, true)
		.addField("Level", levelInfo.level, true)
		.addField("XP", `${levelInfo.xp}/${levelInfo.levelXP} (${levelInfo.levelXP - levelInfo.xp}xp to Level Up)`, true)
		.setThumbnail(target.avatarURL(), 50, 50)
		.setTimestamp()
		.setFooter(targetMember.displayName);
	
	return msg.channel.send('', { disableEveryone: true, embed: levelEmbed });
};

exports.conf = {
	enabled: true,
	runIn: ["text"],
	aliases: ["xp", "level"],
	permLevel: 0,
	botPerms: [],
	requiredFuncs: [],
};

exports.help = {
	name: "rank",
	description: "Displays guild member's XP, Level, and Server Rank",
	usage: "[target:user]",
	usageDelim: "",
};
