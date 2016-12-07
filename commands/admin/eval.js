'use strict';

const now         = require('performance-now');
const Constants   = require('./../../constants.js');
const ownerId     = require(Constants.Util.CONFIG).ownerId;
const config      = require(Constants.Util.CONFIG);

const Command     = require('./../Command.js');

//Most of this is from https://github.com/macdja38/evalBot
const fEval = new Command('Evaluates code', '*code*', 3, null, (bot, msg, suffix) => {
    if(msg.author.id == ownerId) {
        //If I mess up
        const message = msg;
        const start   = now();

        try {
            var evaled = eval(suffix);
            var end    = now();
            var type   = typeof evaled;

            if(evaled instanceof Object)
                evaled = JSON.stringify(evaled);

            bot.sendMessage(msg.channel, "`EVAL` ```xl\n" +
            clean(suffix) +
            "\n- - - - - - evaluates-to- - - - - - -\n" +
            clean(evaled) +
            "\n- - - - - - - - - - - - - - - - - - -\n" +
            "In " + (end - start).toFixed(4) + " milliseconds!" +
            "\n- - - - - - - of type - - - - - - - -\n" +
            type + "```"
            );
        }
        catch(err) {
            var end = now();

            bot.sendMessage(msg.channel, "`ERROR` ```xl\n" +
            clean(suffix) +
            "\n- - - - - - - errors-in- - - - - - - \n" +
            clean(err) +
            "\n- - - - - - - - - - - - - - - - - - -\n" +
            "In " + (end - start).toFixed(4) + " milliseconds!\n```");
        }
    }
});

var clean = (text) => {
    if (typeof(text) === "string") {
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    }
    else {
        return text;
    }
};

module.exports = fEval;
