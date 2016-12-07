const Constants = require('./../../constants.js');
const request = require("request");

const Command   = require('./../Command.js');
const config    = require(Constants.Util.CONFIG);
const log = require(Constants.Util.LOGGER);

const kick = new Command('Kick a user`', '', 2, null, (bot, msg, suffix, conf, perm) => {
  if(!msg.mentions[0]) {
    msg.reply(conf.i18n `You must mention a user for this command.`);
  }

  if(!conf.log_channel) {
    bot.reply(msg, conf.i18n `A moderator must set the **${"log_channel"}** config for this command to work.`);
    return;
  }



  bot.kickMember(msg.mentions[0])

    if(suffix) {
      request({ url: suffix, encoding: null}, (err, res, image) => {
        bot.setAvatar(image);
        if(err) {
          log.error(err);
        } else {
          bot.sendMessage(msg, "New avatar! How do you like my new look?");
        }
      });
    } else {
      bot.sendMessage(msg, "Utilisation: `.avatar URL`");
    }
});

module.exports = kick;
