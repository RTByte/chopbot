const alternateNames = [
	"Not having any of this",
	"Embodiment of Rock 'n Roll",
	"Not happening",
	"Nope.",
	"Try again, bud",
	"Nice try",
	"Bad person",
	"I nevah freeze",
	"enjincoin the minecraft crypto",
	"big mood"
];

const func = async (client, guildMember) => {
	const originalDisplayName = guildMember.displayName;

	const newName = alternateNames[`${Math.floor(Math.random() * alternateNames.length)}`];

	await guildMember.setNickname(newName);

    const blacklistEmbed = new client.methods.Embed()
        .setAuthor(`#${guildMember.guild.name}`, guildMember.guild.iconURL())
        .setColor("#ff0000")
        .addField("Blacklisted word in username detected. Changing name of user.", `${originalDisplayName} <:cbotArrowRight:413474657833058305> ${newName}`, true)
        .setTimestamp()
        .setFooter(guildMember.user.tag, guildMember.user.avatarURL())
    return client.channels.get(guildMember.guild.settings.logChannel).send('', { disableEveryone: true, embed: blacklistEmbed });

};


func.conf = { requiredModules: [] };

func.help = {
  name: "auto-Selener",
  type: "functions",
  description: "Checks to see if a user has a blacklisted word in their nickname, automatically changes it if they do.",
};

module.exports = func;
