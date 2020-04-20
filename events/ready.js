module.exports = async client => {
  //< Log that Insultron hath once again risen
  client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");
  //< Set Insultron's user activity to whatever ya want, my dude
  client.user.setActivity(`${client.settings.get("default").prefix}help`, {type: "PLAYING"});
};
