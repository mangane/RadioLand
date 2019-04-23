const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = ".";
client.on('ready', () => {
client.user.setStatus('idle')
  .then(console.log)
  .catch(console.error);
});
client.on('ready', () => {
  client.user.setActivity("Maintenance en cours");
  });
if(message.channel.startsWith(prefix + "test")) {
    message.reply ("ceci est un  test");
});
client.login(process.env.BOT_TOKEN)
