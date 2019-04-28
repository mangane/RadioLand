const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = ".";
client.on('ready', () => {
client.user.setStatus('idle')
  .then(console.log)
  .catch(console.error);
});
client.on('ready', () => {
  client.user.setPresence({ game: { name: `Dans Ta Pub`, type: "LISTENING" } });
  });
client.on('guildMemberRemove', member => {
	 const channel = member.guild.channels.find(ch => ch.name === 'départ-arrivé');
	if(!channel)return;
    const embed = new Discord.RichEmbed()
    .setColor("#3ad729")
    .setFooter(`Identifiant :\n${member}`)
    .addField("Au revoir", `${member}`)
    .setTitle(":outbox_tray: Une personne est partie, reviendra-t-elle ?:outbox_tray:");
	channel.send({embed})
});
client.on('guildMemberAdd', member => {
	
  const channel = member.guild.channels.find(ch => ch.name === 'départ-arrivé');
	if (!channel)return;
    const embed = new Discord.RichEmbed()
    .setColor("#3ad729")
    .setFooter(`Nous sommes le : ${member.joinedAt}`)
    .addField("Bienvenue", `${member}`)
    .setTitle(":inbox_tray: Bienvenue sur le serveur :inbox_tray:");
	channel.send({embed})
});
  client.on(`message`, message =>{
    if(message.content.startsWith(prefix + "count")) {
      message.delete ()
      message.reply(`Nous sommes ${message.guild.memberCount} Sur RadioLand`);
      }
	  if(message.content.startsWith(prefix + "stats")) {
    message.delete()
    const embed = new Discord.RichEmbed()
    .setColor("#2e1fe6")
    .setTitle("Statistiques")
    .addField("Nombre de serveur :", client.guilds.size)
    .addField("Nombre d'utilisateurs :", client.users.size);
    message.channel.send({embed})
}
	  if (message.content.startsWith(prefix + "user-info")) { 
		  message.delete()
		  let ruse = message.mentions.id.first()
		  const embed = new Discord.RichEmbed ()
		  .setColor("#2e1fe6")
		  .setTitle(`information sur l'utilisateur ${ruse}`);
		  message.channel.send({embed})
}
  });
client.login(process.env.BOT_TOKEN)
