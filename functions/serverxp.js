exports.tableName = "serverxp";
exports.providerEngine = "json";
exports.defaultTemplate = require("./defaultServerXP.json");
exports.defaultUserTemplate = require("./defaultServerXPUser.json");
exports.cooldown = 60000;

exports.init = async (client) => {
	if (client.providers.has(this.providerEngine)) this.provider = client.providers.get(this.providerEngine);
	else throw new Error(`The Provider ${this.providerEngine} does not seem to exist.`);
	if (!(await this.provider.hasTable(this.tableName))) {
		const SQLCreate = ["id TEXT NOT NULL UNIQUE", "xp BIGINT NOT NULL DEFAULT 0", "level BIGINT NOT NULL DEFAULT 0", "levelXP BIGINT NOT NULL DEFAULT 0", "xpTimestamp BIGINT NOT NULL DEFAULT 0", "messages BIGINT NOT NULL DEFAULT 0"];
		await this.provider.createTable(this.tableName, SQLCreate);
	}
};

exports.add = async (client, msg) => {
	if (!msg.guild) return;

	//Get the cache
	const userCache = await this.getUserCache(client, msg.member);

	//Update message counter
	await this.addMessage(client, msg);

	//Escape if not enough time has passed to earn XP
	if (!(msg.createdTimestamp >= (userCache.xpTimestamp + this.cooldown))) return;

	//Add a random amount of XP
	await this.addxp(client, msg.member);

	return this.updateLevel(client, msg.member);
};

exports.addxp = async (client, guildMember, xp = 0) => {
	//Get User Cache
	const userCache = await this.getUserCache(client, guildMember);

	//If no amount of xp specified, get a random amount
	if (!xp) xp = Math.floor((Math.random()*10)+15);

	//Update XP
	userCache.xp += xp;

	//Update Cooldown Timestamp
	userCache.xpTimestamp = Date.now();

	//Pushing new values to the cache
	return this.updateUser(client, guildMember, userCache);
};

exports.addMessage = async (client, msg) => {
	if (!msg.member) return;

	//Getting Cache
	const userCache = await this.getUserCache(client, msg.member);

	//Ticking up the message counter
	userCache.messages++;

	return this.updateUser(client, msg.member, userCache);
};

exports.levelInfo = async (client, guildMember) => {
	let cache = await this.getUserCache(client, guildMember);

	cache.rank = await this.rank(client, guildMember);

	return(cache);
};

exports.updateLevel = async (client, guildMember) => {
	//Grab cache
	const userCache = await this.getUserCache(client, guildMember);

	//Return if no level up happens
	if (!(userCache.xp>=userCache.levelXP)) return(false);

	//Update level and set next XP milestone
	while (userCache.xp>=userCache.levelXP) {
		userCache.level++;
		userCache.levelXP += (5*((userCache.level)**2)+50*userCache.level+100);
	}

	//Update cache
	await this.updateUser(client, guildMember, userCache);

	//Return true and the new level
	return(true, userCache.level);
};

exports.ranks = async (client, guild) => {
	const serverCache = await this.getServerCache(client, guild);

	return(await serverCache.users.sort((user1, user2) => user2.xp - user1.xp));
};

exports.rank = async (client, guildMember) => {
	const serverCache = await this.getServerCache(client, guildMember.guild);

	const ranks = await serverCache.users.sort((user1, user2) => user2.xp - user1.xp);

	const userCache = await ranks.find(obj => obj.id === guildMember.id);

	return((await ranks.indexOf(userCache))+1);
};

exports.mee6Import = async (client, guildMember, mee6XP) => {
	const userCache = await this.getUserCache(client, guildMember);

	if (userCache.mee6Import) return(false);

	await this.addxp(client, guildMember, mee6XP);

	let newUserCache = await this.getUserCache(client, guildMember);

	newUserCache.mee6Import = true;

	await this.updateUser(client, guildMember, newUserCache);

	await this.updateLevel(client, guildMember);

	return(true);
};

exports.newServer = async (client, guild) => {
	//Double Checking to make sure we're not accidentally writing over an existing cache
	if ((await this.provider.has(this.tableName, guild.id))) return;

	//Copying the default template
	const cleanTemplate = this.defaultTemplate;
	
	//Inserting the new user id
	cleanTemplate.id = guild.id;
	cleanTemplate.initTimestamp = Date.now();
	
	//Pushing the new cache out
	return this.provider.set(this.tableName, guild.id, cleanTemplate);
};

exports.newUser = async (client, guildMember) => {
	const serverCache = await this.getServerCache(client, guildMember.guild);

	//Double Checking to make sure we're not accidentally writing over an existing cache
	if (await serverCache.users.find(obj => obj.id === guildMember.id)) return;

	//Copying the default template
	let cleanTemplate = this.defaultUserTemplate;
	
	//Inserting the new user id
	cleanTemplate.id = guildMember.id;
	
	//Adding the new user cache to server cache
	serverCache.users.push(cleanTemplate);

	//Pushing the new cache out
	await this.provider.update(this.tableName, guildMember.guild.id, serverCache);

	//Returning new user cache
	return(cleanTemplate);
};

exports.getUserCache = async (client, guildMember) => {
	//Get server cache
	const serverCache = await this.getServerCache(client, guildMember.guild);

	let userCache = await serverCache.users.find(obj => obj.id === guildMember.id)

	//Check to see if user has an entry
	if (!userCache) userCache = await this.newUser(client, guildMember);


	//Return User cache
	return(userCache);
};

exports.updateUser = async (client, guildMember, userCache) => {
	//Get Server Cache
	const serverCache = await this.getServerCache(client, guildMember.guild);

	//Get old cache
	const oldUserCache = await serverCache.users.find(obj => obj.id === guildMember.id);

	//Get index of cache
	const userCacheIndex = serverCache.users.indexOf(oldUserCache);

	//Updating server cache
	serverCache.users[userCacheIndex] = userCache;

	//Pushing updated server cache
	return this.provider.update(this.tableName, guildMember.guild.id, serverCache);
};

exports.getServerCache = async (client, guild) => {
	//If a cache for this guild doesn't exist, create one
	if (!(await this.provider.has(this.tableName, guild.id))) await this.newServer(client, guild);

	//Return the cache of this guild
	return(await this.provider.get(this.tableName, guild.id));
};