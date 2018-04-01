exports.run = async (client, msg, [target = msg.author, ...roleName]) => {
    if (!roleName.length || roleName === " ") {
        var roleNames = await getJoinableNames(msg);

        if (roleNames.length) {
            return msg.send(`🔎 ${msg.author}, ain't nothing here to show you. Run \`-join\` for a list of roles to leave if you have them.`);
        }

        return msg.send(`🔎 ${msg.author}, there are no joinable roles to leave on this server.`);
    }

    //Making the role name searchable
    roleName = roleName.join(" ");

    //Seeing if this role exists
    if (!msg.guild.roles.exists("name", roleName)) {
        return msg.send(`${client.denyEmoji} Sorry, the role ${roleName} does not exist in this server. Did you check the spelling and capitalization?`);
    }

    //Grabbing the role object
    const targetRole = await msg.guild.roles.find("name", roleName);

    //Checking to see that this role is marked as joinable
    if (!msg.guild.settings.joinableRoles.includes(targetRole.id)) {
        return msg.send(`${client.denyEmoji} Funny, ${msg.author}. ${targetRole.name} isn't joinable in this server, so you can't leave it.`);
    }

    if (target.id !== msg.author.id) {
        //Checking to see if the executor is a moderator
        if (!msg.member.roles.has(msg.guild.settings.modRole) && !msg.member.roles.has(msg.guild.settings.adminRole)) {
            return msg.send(`${client.denyEmoji} ${msg.author}, You don't have permissions to remove roles from other users.`);
        }

        //Checking to see if executor should be able to moderate target
        const canMod = await client.funcs.hierarchyCheck(client, msg.author, target, msg.guild).catch((err) => {
            msg.delete();
            return msg.send(`${client.denyEmoji} ${msg.author}, It looks like you don't have permission to moderate ${target}. Are they in this server?`);
        });

        if (!canMod) {
            return msg.send(`${client.denyEmoji} ${msg.author}, You don't have permission to moderate ${target}.`);
        }

    }

    const targetMember = await msg.guild.members.resolve(target);

    targetMember.roles.remove(targetRole);

    return msg.react(client.confirmEmoji);

};

getJoinableNames = async (msg) => {
  let roleNames = [];

  for (let i = 0; i < msg.guild.settings.joinableRoles.length; i++) {
    let thisRole = await msg.guild.roles.find("id", msg.guild.settings.joinableRoles[i]);

    roleNames.push(thisRole.name);
  }

  return roleNames;

};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["removerole", "rrole"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: ["hierarchyCheck"]
};

exports.help = {
    name: "leave",
    description: "Allows you to leave joinable roles.",
    usage: "[target:mention] [roleName:string] [...]",
    usageDelim: " "
};
