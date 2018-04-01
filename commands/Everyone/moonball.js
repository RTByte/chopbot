const moment = require("moment");

exports.run = async (client, msg) => {
  const guildMember = await msg.guild.members.fetch(msg.author.id);
  if (!msg.guild.roles.get(msg.guild.settings.eventRole)) return(msg.send("Sorry! Moonball isn't setup for this server!"));
  
  if (!(await client.funcs.moonball.getGame(client, guildMember))) {
    await client.funcs.moonball.newGame(client, guildMember);
    await msg.channel.send(`${msg.author} has started a game of Moonball!`);
  }

  let game = await client.funcs.moonball.throw(client, guildMember);

  await msg.channel.send(`🏀<@${game.thrower}> throws the ball to <@${game.catcher}>!`);

  return (await setTimeout(async () => {
    const endGame = await client.funcs.moonball.endGame(client, guildMember);

    if (!endGame) return;

    const duration = moment.unix(endGame.gameStart/1000).fromNow("m:s");

    return msg.channel.send(`Game Over!\n<@${endGame.thrower}> wins **${endGame.reward}**xp for being the last to throw the ball!\nThe game lasted ${duration}, and the ball was passed ${endGame.throws} times.`);

  }, client.funcs.moonball.cooldown));
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["throw"],
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
