const Constants = require('./../../constants.js');

const Command   = require('./../Command.js');
const config    = require(Constants.Util.CONFIG);

const about = new Command('Gives you information about the bot', '', 0, null, (bot, msg, suffix) => {
  var msgArr = [];

  msgArr.push('```xl\n');
  msgArr.push('[Author]           rasmus#8748, Admiral Ackbro#8816, Killian#4384');
  msgArr.push('[Version]          0.0.1');
  msgArr.push('[Library]          Discord.js');
  msgArr.push('\n```');
//    msgArr.push('[Command]         ' + config.prefix + 'help');

  bot.sendMessage(msg.channel, msgArr);
});

module.exports = about;
