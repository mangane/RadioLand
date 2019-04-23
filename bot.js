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
if(message.content.startsWith(prefix + `anim`)) {
        message.delete()
        const count = new Discord.RichEmbed()
        .setColor(0x954D23)
        .setTitle("**Voici les animations du serveur :**")
    .addField(":Satyre59: Satyre 59 ","Dimanche 8:30 10:00/Vendredi 20:00 22:00 Samedi 20:00 21:00"};
        return message.channel.send(count)
    }
});
client.login(process.env.BOT_TOKEN)
