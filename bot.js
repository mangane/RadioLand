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
if(message.content.startsWith(prefix + `infoserv`)) {
        message.delete()
        const count = new Discord.RichEmbed()
        .setColor(0x954D23)
        .setTitle("**Information du serveur **")
    .addField("Nom du serveur", message.guild.name)
        .addField("Date de création du serveur",  message.guild.createdAt)
    .addField("Vous avez rejoint le serveur",  message.member.joinedAt)
        .addField("Total des membres :",  message.guild.memberCount);
        return message.channel.send(count)
    }
});
client.login(process.env.BOT_TOKEN)
