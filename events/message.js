module.exports = (client, message) => {
  //< Ignore all bots
  if (message.author.bot) return;
  //< Ignore messages that don't start with the prefix, y'all
  if (message.content.indexOf(client.config.prefix) !== 0) return;

  //< Split command and args based on assumed '{prefix}{command} {arg1} ... {argN}' format
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  //< Get the actual command from the client.command Enmap
  const cmd = client.commands.get(command);

  //< Check if it exists - if not, fail elegantly
  if (!cmd) return;

  //< Run them shits, cuh
  cmd.run(client, message, args);
};
