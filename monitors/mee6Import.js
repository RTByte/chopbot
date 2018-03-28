exports.run = async (client, msg) => {
    //Only run on Mee6 Bot
    if (!(msg.author.id == 159985870458322944)) return;
    //Exit if there are no embeds
    if (!msg.embeds) return;
    const embed = msg.embeds[0];
    const embedFields = embed.fields;

    //Exit if it's not the !level embed
    if (!embedFields.find(field => field.name === "Rank") || !embedFields.find(field => field.name === "Lvl.") || !embedFields.find(field => field.name === "Exp.")) return;

    const xpField = await embedFields.find(field => field.name === "Exp.");
    const regex = new RegExp(".*?\\d+.*?\\d+.*?(\\d+)", ["i"]);
    const output = await regex.exec(xpField.value);
    const mee6XP = await parseInt(output[1]);
    const iconURL = await embed.author.iconURL.slice(0, -10);
    const targetMember = await msg.guild.members.find(member => member.user.avatarURL() === iconURL);
    const imported = await client.funcs.serverxp.mee6Import(client, targetMember, mee6XP);

    if (!imported) return;

    return(await msg.react(client.confirmEmoji));
};

exports.conf = {
    enabled: true,
};

