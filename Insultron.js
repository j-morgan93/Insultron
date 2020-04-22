const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

//< Get the Discord 'client' and associated local 'config.json'
const client = new Discord.Client();
const config = require("./config.json");

//< This is the JSON file that contains all the word definitions
const words = require("./words.json");

//< Assign the config to the client so it remains accessible
client.config = config;
//< See if we can just assign the 'Words' to the Client itself
client.words = words;

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
