const komada = require("komada");

const botConfig = require("./botConfig.json");

const ChopBot = new komada.Client({
	//Komada required vars
	ownerID: botConfig.ownerID,
	prefix: botConfig.prefix,
	cmdEditing: true,
	clientOptions: {
		fetchAllMembers: true
	},
	//Permission Structure using ownerID as an array
	permStructure: new komada.PermLevels()
		.addLevel(10, false, (client, msg) => {
			return client.config.ownerID.includes(msg.author.id);
		})
		.addLevel(4, false, (client, msg) => {
			if(!msg.guild) return false;
			if(msg.guild.owner.id === msg.author.id){
				return true;
			}
		})
		.addLevel(3, false, (client, msg) => {
			if(!msg.guild) return false;
			const adminRole = msg.guild.roles.find("name", msg.guild.conf.adminRole);
			return adminRole && msg.member.roles.has(adminRole.id);
		})
		.addLevel(2, false, (client, msg) => {
			if(!msg.guild) return false;
			const modRole = msg.guild.roles.find("name", msg.guild.conf.modRole);
			return modRole && msg.member.roles.has(modRole.id);
		})
		.addLevel(1, false, (client, msg) => {
			if(!msg.guild) return false;
			const eventRole = msg.guild.roles.find("name", msg.guild.conf.eventRole);
			return eventRole && msg.member.roles.has(eventRole.id);
		})
		.addLevel(0, false, () => true)
		.structure
});

ChopBot.login(botConfig.botToken);