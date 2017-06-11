const fs = require('fs');
const jsonfile = require('jsonfile');

const XPCooldown = 60000;

const storagePath = "./storage/userCache/";


const defaultCache = {
	"user": {
		"firstSeen": "",
		"totalMessages": "",
		"totalXP": "",
		"moderationHistory": {
			"reports": [],
			"warns": [],
			"mutes": [],
			"kicks": [],
			"vckicks": [],
			"bans": [],
			"vcbans": []
		}
	},
	"servers": {}
};

const defaultServer = {
	"id": "",
	"firstSeen": "",
	"joinedTimestamp": "",
	"totalMessages": 0,
	"XPCountdown": "",
	"currentXP": 0,
	"totalXP": 0,
	"level": 0,
	"levelXP": 100,
	"moderationHistory": {
		"reports": [],
		"warns": [],
		"mutes": [],
		"kicks": [],
		"vckicks": [],
		"bans": [],
		"vcbans": []
	}
};

exports.userExists = function(target){
	return new Promise((resolve, reject) => {
		//Checking to see if user has stored json
		let path = storagePath + target.id + ".json";
		
		if(fs.existsSync(path)){
			//User Exists!
			resolve(true);
		} else {
			//User Doesn't Exist!
			resolve(false);
		}
	});
}

exports.serverExists = function(guildMember){
	return new Promise((resolve, reject) => {
		let path = storagePath + guildMember.id + ".json";

		userCache = jsonfile.readFileSync(path);

		if(userCache.servers[guildMember.guild.id]){
			resolve(true);
		} else {
			resolve(false);
		}

	});
}

exports.newUser = function(guildMember){
	return new Promise((resolve, reject) => {
		let userCache = defaultCache;

		userCache.user.firstSeen = guildMember.joinedTimestamp;
		userCache.user.totalMessages = 0;
		userCache.user.totalXP = 0;

		let path = storagePath + guildMember.id + ".json";

		jsonfile.writeFileSync(path, userCache, {spaces: 4});

		resolve();
	});
}

exports.newServer = function(guildMember){
	return new Promise((resolve, reject) => {	
		let path = storagePath + guildMember.id + ".json";

		userCache = jsonfile.readFileSync(path);

		let newServer = defaultServer;

		newServer.id = guildMember.guild.id;
		newServer.firstSeen = guildMember.joinedTimestamp;
		newServer.joinedTimestamp = guildMember.joinedTimestamp;
		newServer.currentXP = 0;
		newServer.level = 0;

		userCache.servers[newServer.id] = newServer;

		jsonfile.writeFileSync(path, userCache, {spaces: 4});

		resolve();
	});
}

exports.addXP = function(guildMember, msg){
	return new Promise((resolve, reject) => {
		let randXP = 0;
		let path = storagePath + guildMember.id + ".json";

		userCache = jsonfile.readFileSync(path);

			if(msg.createdTimestamp >= userCache.servers[guildMember.guild.id].XPCountdown + XPCooldown){
				randXP = Math.floor((Math.random()*10)+15);

				userCache.user.totalXP += randXP;
				userCache.servers[guildMember.guild.id].currentXP += randXP;
				userCache.servers[guildMember.guild.id].totalXP += randXP;

				userCache.servers[guildMember.guild.id].XPCountdown = msg.createdTimestamp;
			}

		jsonfile.writeFileSync(path, userCache, {spaces: 4});

		resolve(randXP);
	});
}

exports.updateLevel = function(guildMember, msg){
	return new Promise((resolve, reject) => {
		let levelUp = false;
		let path = storagePath + guildMember.id + ".json";

		userCache = jsonfile.readFileSync(path);
		
		if(userCache.servers[guildMember.guild.id].currentXP >= userCache.servers[guildMember.guild.id].levelXP){
			userCache.servers[guildMember.guild.id].level++;

			let thisLevelXP = (5*((userCache.servers[guildMember.guild.id].level)**2)+50*userCache.servers[guildMember.guild.id].level+100);
			let remainderXP = userCache.servers[guildMember.guild.id].currentXP - userCache.servers[guildMember.guild.id].levelXP;

			userCache.servers[guildMember.guild.id].currentXP = 0 + remainderXP;
			userCache.servers[guildMember.guild.id].levelXP = thisLevelXP;

			levelUp = true;

		}
				

		jsonfile.writeFileSync(path, userCache, {spaces: 4});

		resolve(levelUp);

	});
}

exports.addMessage = function(guildMember, msg){
	return new Promise((resolve, reject) => {
		let path = storagePath + guildMember.id + ".json";

		userCache = jsonfile.readFileSync(path);

		if(userCache.servers[guildMember.guild.id].id === guildMember.guild.id){
			userCache.user.totalMessages++;
			userCache.servers[guildMember.guild.id].totalMessages++;

		}
	

		jsonfile.writeFileSync(path, userCache, {spaces: 4});

		resolve(userCache.user.totalMessages);

	});
}