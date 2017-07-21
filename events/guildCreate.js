exports.run = async (client, guild) => {
    if (guild.available) await client.settingGateway.create(guild);

    //Creating roles required by ChopBot
    const adminRole = await guild.createRole({ data: { name: "Admin" } });
    const modRole = await guild.createRole({ data: { name: "Moderator" } });
    const whitelistedRole = await guild.createRole({ data: { name: "Whitelisted" } });
    const eventRole = await guild.createRole({ data: { name: "Event" } });
    const voiceBannedRole = await guild.createRole({ data: { name: "VC Banned" } });
    const mutedRole = await guild.createRole({ data: { name: "Muted" } });

    //Pre-Configuring these roles in the guild settings
    const adminRoleResponse = await client.settingGateway.update(guild, "adminRole", adminRole.id);
    const modRoleResponse = await client.settingGateway.update(guild, "modRole", modRole.id);
    const whitelistedRoleResponse = await client.settingGateway.update(guild, "whitelistedRole", whitelistedRole.id);
    const eventRoleResponse = await client.settingGateway.update(guild, "eventRole", eventRole.id);
    const voiceBannedRoleResponse = await client.settingGateway.update(guild, "voiceBannedRole", voiceBannedRole.id);
    const mutedRoleResponse = await client.settingGateway.update(guild, "mutedRole", mutedRole.id);

    //Giving the guild owner the Admin role
    await guild.owner.addRole(adminRole);

    //Setting permissions for muted/voice chat banned roles automatically
    await guild.channels.forEach(async (channel) => {
        if (channel.type === "text") {
            //Removing permissions for mutedRole in text channels
            await channel.overwritePermissions(mutedRole, {
                'SEND_MESSAGES': false,
                'SEND_TTS_MESSAGES': false,
                'ATTACH_FILES': false,
                'EMBED_LINKS': false,
                'USE_EXTERNAL_EMOJIS': false,
                'ADD_REACTIONS': false
            });
        }

        if (channel.type === "voice") {
            //Removing permissions for mutedRole in voice channels
            await channel.overwritePermissions(mutedRole, {
                'CONNECT': false,
                'SPEAK': false
            });
            //Removing permissions for voiceBannedRole in voice channels
            await channel.overwritePermissions(voiceBannedRole, {
                'CONNECT': false,
                'SPEAK': false
            });
        }
    });

    //Sending a message to dev log that bot is on a new guild
    try {
        const newGuild = new client.methods.Embed()
            .setAuthor(`${guild.name} (${guild.id})`, guild.iconURL())
            .setColor("#00ff00")
            .setTimestamp()
            .setFooter("Bot added to new guild");

        const logChannel = await client.channels.get(client.devLogChannel);

        await logChannel.send('', { disableEveryone: true, embed: newGuild });
    } catch (err) {
        await client.emit("log", err, "error");
    }


    return guild.owner.send(`Roles initialized on the **${guild.name} Discord**!\nPlease follow \`-guide\` to finish setting up the bot on your server.`);

};
