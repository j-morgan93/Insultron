const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");

//< Assign the config to the client so it remains accessible
client.config = config;

//< Iterate through all the '{events}.js' files and add 'em
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

//< Need this to handle all the commands
client.commands = new Enmap();

//< Iterate through all the '{command}.js' files and add 'em
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(config.token);
