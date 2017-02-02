exports.run = (client, guild) => {
  let requestedRole = guild.roles.find("name", "Muted");
  if(!requestedRole){
    guild.createRole({ name: 'Muted',
      hoist: false,
      poistion: 0,
      permissions:[0x400, 0x10000, 0x100000],
      mentionable: false})
    .then(role => console.log(`Created role ${role} on ${guild}.`)
    .catch(console.error);
  }
  else {
    guild.roles.find("name", "Muted")
    .edit({hoist: false,
        poistion: 0,
        permissions:[0x400, 0x10000, 0x100000],
        mentionable: false})
    .then(r => console.log(`Edited role ${r}`))
    .catch(console.error));
  }
}
