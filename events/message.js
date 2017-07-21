exports.run = async (client, msg) => {    

	//Currently we're not planning on doing anything per-message for DMs, so I just have it stop immediately
	//Also just stopping everything if the message was sent via webhook.
    if (!msg.guild || msg.webhookID) {
    	return;
    }

	//Fetching User Info
	const userTracked = await client.funcs.userCache.userExists(msg.author);
	const guildMember = await msg.guild.fetchMember(msg.author);
	
	//Creating a user cache if we don't already have one
	if (!userTracked) {
		client.funcs.userCache.newUser(guildMember)
		.catch((err) => { client.emit("log", err, "error"); });
	}

	//Checking if this user has been seen in this server before
	const serverTracked = await client.funcs.userCache.serverExists(guildMember);

	//Creating a server cache in the user's cache if it's not already there
	if (!serverTracked) {
		client.funcs.userCache.newServer(guildMember)
		.catch((err) => { client.emit("log", err, "error"); });
	}

	//Performing usual duties
	return addXP(client, msg, guildMember);

};

addXP = async (client, msg, guildMember) => {
	//These async variables are actually functions too... because JavaScript!
	const earnedXP = await client.funcs.userCache.addXP(guildMember, msg);

		//earnedXP is the amount of XP a user earned from this message.
		//returns 0 if cooldown still active
		//returns between 15 and 25 otherwise

	const levelUp = await client.funcs.userCache.updateLevel(guildMember, msg);

		//Returns boolean true if user leveled up with this message
		//Returns boolean false if user stayed the same level
	
	if (levelUp) {
		//TODO: Notify user of level up? Probably want this guild-configurable
	}

	const globalMessageCount = await client.funcs.userCache.addMessage(guildMember, msg);

		//Returns the amount of tracked messages across all servers

	return;
}