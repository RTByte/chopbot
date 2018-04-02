const moment = require("moment");

exports.run = async (client, msg) => {
  	const guildMember = await msg.guild.members.fetch(msg.author.id);

  	//Check if Moonball works on this server
  	if (!msg.guild.roles.get(msg.guild.settings.eventRole)) return(msg.send("Sorry! Moonball isn't setup for this server!"));
  	//Check if executor has moonball role
  	if (!msg.member.roles.has(msg.guild.settings.eventRole)) return(msg.reply("you're not playing moonball!"));
  	//Check if game is running
  	var game = await client.funcs.moonball.getGame(client, guildMember);

  	//If the game still exists but should be over, we kill it and start a new one.
  	if (game && (await client.funcs.moonball.gameOver(client, guildMember)) >= 0) {
  		await client.funcs.moonball.forceEndGame(client, guildMember);
  		game = false;
  	}

  	//If there is no game, we start a new one
  	if (!game) {
  		game = await client.funcs.moonball.newGame(client, guildMember);
  		msg.channel.send(`<@${game.initiator}> has started a game of Moonball!`);
	}

	//If the executor is not the current catcher/holder, we quit because they can't throw the ball
	if (msg.member.id != game.catcher) return(msg.channel.send(`<@${game.catcher}> currently has the ball!`));

	//Throwing the ball, and getting the new game state
	const gameState = await client.funcs.moonball.throw(client, guildMember);

	//Moonball sets the catcher as the bot itself if there are no other users online.
	//If the bot is the catcher, we force end the game.
	if (gameState.catcher === client.user.id) {
		await client.funcs.moonball.forceEndGame(client, guildMember);
		return(msg.channel.send(`Game Over!\nNo Players Available!`));
	}

  //Checking if the catcher is the same user as the thrower.
  //If the catcher is the thrower, try again 6 times.
  //If a new catcher hasn't been found, end the game.
  if (gameState.catcher === msg.author.id) {
    let gameCounter = 0;

    //Incrementing by one on each loop.
    while (gameCounter < 6) {
      gameCounter++;
      await client.funcs.moonball.throw(client, guildMember);
    }

    //Ending the game if gameCounter is greater to or equal to 6.
    if (gameCounter >= 6) {
      await client.funcs.moonball.forceEndGame(client, guildMember);
      return(msg.channel.send(`Not enough players available, please try again later.`));

      //Resetting gameCounter to 0.
      gameCounter = 0;
    }
  } else {
    //Sending the updated info to the channel
  	await msg.channel.send(`🏀 <@${gameState.thrower}> throws the ball to <@${gameState.catcher}>!\nCurrent Reward: **${gameState.reward}**xp`);

    	return (await setTimeout(async () => {
      	const endGame = await client.funcs.moonball.endGame(client, guildMember);

      	if (!endGame) return;

      	const duration = moment.unix(endGame.gameStart/1000).fromNow("m:s");

      	return msg.channel.send(`Game Over!\n<@${endGame.thrower}> wins **${endGame.reward}**xp for being the last to throw the ball!\nThe game lasted ${duration}, and the ball was passed ${endGame.throws} times.`);

    	}, client.funcs.moonball.cooldown));
  }

};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["throw", "toss", "yeet"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "moonball",
  description: "Starts or continues a game of moonball.",
  usage: "",
  usageDelim: "",
};
