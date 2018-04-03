exports.tableName = "modhistory";
exports.providerEngine = "json";
exports.defaultTemplate = require("./defaultModHistory.json");

exports.init = async (client) => {
	if (client.providers.has(this.providerEngine)) this.provider = client.providers.get(this.providerEngine);
	else throw new Error(`The Provider ${this.providerEngine} does not seem to exist.`);
	if (!(await this.provider.hasTable(this.tableName))) {
		const SQLCreate = ["id TEXT NOT NULL UNIQUE"];
		await this.provider.createTable(this.tableName, SQLCreate);
	}
};

exports.addAction = async (client, target, executor, guild, type, reason) => {
	if (!target || !executor || !guild || !type || !reason) return;

	//Get the cache
	let cache = await this.getCache(client, target);

	let newEvent = {
		id: 0,
		executor: 0,
		guild: 0,
		type: "",
		reason: "",
		timestamp: 0
	};

	newEvent.id = cache.events.length;
	newEvent.executor = executor.id;
	newEvent.guild = guild.id;
	newEvent.type = type;
	newEvent.reason = reason;
	newEvent.timestamp = Date.now();

	cache.events.push(newEvent);

	await this.provider.update(this.tableName, target.id, cache);

	return(newEvent);
};

exports.getHistory = async (client, target) => {
	const cache = await this.getCache(client, target);

	return(cache.events);
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