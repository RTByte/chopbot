exports.tableName = "globalxp";
exports.providerEngine = "json";
exports.defaultTemplate = require("./defaultGlobalXP.json");
exports.cooldown = 60000;

exports.init = async (client) => {
	if (client.providers.has(this.providerEngine)) this.provider = client.providers.get(this.providerEngine);
	else throw new Error(`The Provider ${this.providerEngine} does not seem to exist.`);
	if (!(await this.provider.hasTable(this.tableName))) {
		const SQLCreate = ["id TEXT NOT NULL UNIQUE", "xp BIGINT NOT NULL DEFAULT 0", "level BIGINT NOT NULL DEFAULT 0", "messages BIGINT NOT NULL DEFAULT 0"];
		await this.provider.createTable(this.tableName, SQLCreate);
	}
};

exports.add = async (client, msg) => {
	//Get the cache
	const cache = await this.getCache(client, msg.author);

	//Update message counter
	await this.addMessage(client, msg);

	//Escape if not enough time has passed to earn XP
	if (!(msg.createdTimestamp >= (cache.xpTimestamp + this.cooldown))) return;

	//Add a random amount of XP
	await this.addxp(client, msg.author);

	return this.updateLevel(client, msg.author);
};

exports.addxp = async (client, user, xp = 0) => {
	//Get the cache
	const cache = await this.getCache(client, user);

	//If no amount of xp specified, get a random amount
	if (!xp) xp = Math.floor((Math.random()*10)+15);

	//Update XP
	cache.xp += xp;

	//Update Cooldown Timestamp
	cache.xpTimestamp = Date.now();

	//Pushing new values to the cache
	return this.provider.update(this.tableName, user.id, cache);
};

exports.addMessage = async (client, msg) => {
	//Getting Cache
	const cache = await this.getCache(client, msg.author);

	//Ticking up the message counter
	cache.messages++;

	//Updating the Cache
	return this.provider.update(this.tableName, msg.author.id, cache);
};

exports.updateLevel = async (client, user) => {
	//Grab cache
	const cache = await this.getCache(client, user);

	//Return if no level up happens
	if (!(cache.xp>=cache.levelXP)) return(false);

	//Update level and set next XP milestone
	while (cache.xp>=cache.levelXP) {
		cache.level++;
		cache.levelXP += (5*((cache.level)**2)+50*cache.level+100);
	}

	//Update cache
	await this.provider.update(this.tableName, user.id, cache);

	//Return true and the new level
	return(true, cache.level);
};

exports.newUser = async (client, user) => {
	//Double Checking to make sure we're not accidentally writing over an existing cache
	if ((await this.provider.has(this.tableName, user.id))) return;

	//Copying the default template
	const cleanTemplate = this.defaultTemplate;
	
	//Inserting the new user id
	cleanTemplate.id = user.id;
	
	//Pushing the new cache out
	return this.provider.set(this.tableName, user.id, cleanTemplate);
};

exports.getCache = async (client, user) => {
	//If a cache for this user doesn't exist, create one
	if (!(await this.provider.has(this.tableName, user.id))) await this.newUser(client, user);

	//Return the cache of this user
	return(await this.provider.get(this.tableName, user.id));
};