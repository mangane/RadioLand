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
    if(message.content.startsWith(prefix + "anim")) {
        message.delete()
        const embed = new Discord.RichEmbed()
        .setColor("#2e1fe6")
        .setTitle("Voici les animateurs de RadioLand avec leurs horaires :")
        .addField(" :Satyre59: Satyre59 :","```Dimanche 8h30-10h00\nVendredi 20h00-22h00\n Samedi 20h00-21h00```")
        .setFooter("RadioLand");
         message.channel.send({embed})
    }
  });
client.login(process.env.BOT_TOKEN)
