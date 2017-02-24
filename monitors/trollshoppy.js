let victim = ''; //'153887358133993474'; Shoppy's ID
let reactEmoji = ''; //':shoppy:268174175229837312'; :shoppy: emoji on AHD's ID
let ahdGuild = '' //'258447100193275904'; AHD's ID

exports.conf = {
    enabled: true,
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
