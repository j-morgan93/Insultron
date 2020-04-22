exports.run = (client, message, args) => {
    message.channel.send("Pinging ...") //< Placeholder message
    .then((msg) => {
      msg.edit(`Ping: ${(msg.createdTimestamp - message.createdTimestamp)}ms.`) //< Edit with final ping value
    }).catch(console.error);

    //message.channel.send("Omae wa mou shindeiru").catch(console.error);
}
