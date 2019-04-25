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
  client.on(`message`, message =>{
    if(message.content.startsWith(prefix + "test")) {
      message.reply("test");
      }
    if(message.content.startsWith(prefix + "allo")) {
      message.channel.send("hello")
      }
  });
client.login(process.env.BOT_TOKEN)
