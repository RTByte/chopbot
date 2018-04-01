exports.tableName = "moonball";
exports.providerEngine = "json";
exports.defaultTemplate = require("./defaultMoonBall.json");
exports.cooldown = 60000;

exports.init = async (client) => {
	if (client.providers.has(this.providerEngine)) this.provider = client.providers.get(this.providerEngine);
	else throw new Error(`The Provider ${this.providerEngine} does not seem to exist.`);
	if (!(await this.provider.hasTable(this.tableName))) {
		const SQLCreate = ["id TEXT NOT NULL UNIQUE", "xp BIGINT NOT NULL DEFAULT 0", "level BIGINT NOT NULL DEFAULT 0", "levelXP BIGINT NOT NULL DEFAULT 0", "xpTimestamp BIGINT NOT NULL DEFAULT 0", "messages BIGINT NOT NULL DEFAULT 0"];
		await this.provider.createTable(this.tableName, SQLCreate);
	}
};

exports.throw = async (client, guildMember, target = null) => {
	let game = await this.getGame(client, guildMember);

	if (!target || !(target.presence.status === "online")) target = await this.getTarget(client, guildMember);

	game.thrower = guildMember.id;
	game.catcher = target.id;
	game.gameEnd = (Date.now() + this.cooldown);
	game.throws = game.throws += 1;
	game.reward = game.reward += Math.floor(Math.random() * 5) + 1;

	await this.provider.update(this.tableName, guildMember.guild.id, game);

	return(game);
};

exports.getTarget = async (client, guildMember) => {
	const onlinePlayers = await this.onlinePlayers(client, guildMember);
	const stripThrower = await onlinePlayers.filter(member => (member.id != guildMember.id));
	const playersArray = await stripThrower.array();

	const target = playersArray[Math.floor(Math.random() * (playersArray.length - 1))];

	return target;
};

exports.onlinePlayers = async (client, guildMember) => {
	let playerList = await guildMember.guild.members.filter(member => member.roles.has(guildMember.guild.settings.eventRole));

	await playerList.filter(member => member.id != guildMember.id);

	return(await playerList.filter(member => member.presence.status === "online"));
};

exports.gameOver = async (client, guildMember) => {
	const game = await this.getGame(client, guildMember);

	return Date.now() - game.gameEnd;
};

exports.endGame = async (client, guildMember) => {
	if ((await this.gameOver(client, guildMember)) <= 0) return false;

	const game = await this.getGame(client, guildMember);

	const winner = await guildMember.guild.members.fetch(game.thrower);

	await client.funcs.serverxp.addxp(client, winner, game.reward);

	await this.provider.delete(this.tableName, guildMember.guild.id);

	return(game);
};

exports.newGame = async (client, guildMember) => {
	//Double Checking to make sure we're not accidentally writing over an existing cache
	if ((await this.provider.has(this.tableName, guildMember.guild.id))) return;

	//Copying the default template
	const cleanTemplate = this.defaultTemplate;
	
	//Inserting the new variables
	cleanTemplate.id = guildMember.guild.id;
	cleanTemplate.gameStart = Date.now();
	cleanTemplate.gameEnd = (Date.now() + this.cooldown);
	cleanTemplate.initiator = guildMember.id;
	cleanTemplate.thrower = guildMember.id;
	cleanTemplate.catcher = guildMember.id;

	//Pushing the new cache out
	return this.provider.set(this.tableName, guildMember.guild.id, cleanTemplate);
};

exports.getGame = async (client, guildMember) => {
	//If a cache for this guild doesn't exist, create one
	if (!(await this.provider.has(this.tableName, guildMember.guild.id))) return(false);

	//Return the cache of this guild
	return(await this.provider.get(this.tableName, guildMember.guild.id));
};