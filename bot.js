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
    .addField(":Satyre59: @🔉| Satyre 59 ","-Dimanche 8h30-10h00-Vendredi 20h00-22h00-Samedi 20h00-21h00"}
        .addField("Date de création du serveur",  message.guild.createdAt)
    .addField("Vous avez rejoint le serveur",  message.member.joinedAt)
        .addField("Total des membres :",  message.guild.memberCount);
        return message.channel.send(count)
    }
});
client.login(process.env.BOT_TOKEN)
