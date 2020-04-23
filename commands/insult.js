// at the top of your file
const Discord = require('discord.js');

exports.run = (client, message, args) => {
  //< Ensure we were supplied with a valid target
  if (message.mentions.members.size === 0) return message.reply("Please mention a user to fucks wit");

  //< Get the first (assumed only) mention as the target
  let target = message.mentions.members.first();

  //< Randomly select the three main components of yonder Insult
  let starter = client.words.starters[Math.floor(Math.random() * client.words.starters.length)];
  let middle = client.words.middles[Math.floor(Math.random() * client.words.middles.length)];
  let finisher = client.words.finishers[Math.floor(Math.random() * client.words.finishers.length)];

  //< Generate the Insult body with some maw-fucking markdown ferda
  let insult = `**${starter.word.toLowerCase()}**, **${middle.word.toLowerCase()}**, **${finisher.word.toLowerCase()}**`;

  //< Get the 'joiner' ('a' or 'an' depending on starting character)
  let joiner = getJoiner(starter.word);

  //< TODO :: Generate an embed with the full definitions of each part
  const weddedAndEmbedded = {
  	color: 0x0099ff,
    title: `${message.author.username} hath insulted ${target.user.username}`,
  	description: "*Insultron* wishes to explicity define what you've just been called.",
  	fields: [
  		{
  			name: `**${starter.word}**`,
  			value: starter.definition,
  		},
      {
  			name: `**${middle.word}**`,
  			value: middle.definition,
  		},
      {
  			name: `**${finisher.word}**`,
  			value: finisher.definition,
  		}
  	],
  	timestamp: new Date(),
  	footer: {
  		text: "© Spatula City",
  		icon_url: message.author.avatarURL,
  	},
  };

  //< Reply to them bitches (and then react to your own joke you bot fuck)
  message.channel.send({content:`${target}, you are ${joiner} ${insult}!`, embed: weddedAndEmbedded })
    .then((msg) => {
      msg.react('🔥');
      msg.react('💩');
    }).catch(console.error);
}

function getJoiner(str){
  let match = startsWithVowel(str);
  if (match){
    return "an";
  } else {
    return "a";
  }
}

function startsWithVowel(str){
  let vowelRegex = '^[aieouAIEOU].*';
  return str.match(vowelRegex);
}
