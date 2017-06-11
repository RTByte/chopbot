let victim = '153887358133993474';
let reactEmoji = ':shoppy:268174175229837312';
let ahdGuild = '258447100193275904';

exports.conf = {
    enabled: false,
    spamProtection: false,
}

exports.run = (client, msg, guild) => {
    return new Promise((resolve) => {
        if (msg.guild.id === ahdGuild){
            if (msg.author.id === victim){
                msg.react(reactEmoji);
            }
        }
        resolve();
    });
};