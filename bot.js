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
client.on('guildMemberRemove', member => {
	 const channel = member.guild.channels.find(ch => ch.name === 'bienvenue');
  if(!channel) return;
    const embed = new Discord.RichEmbed()
    .setColor("#3ad729")
    .addField(" :Bye: Une personne est partie, reviendra-t-elle ?", member.username})
    .setFooter("RadioLand Au revoir");
channel.send({embed})
});
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'bienvenue');
  if (!channel) return;
    const embed = new Discord.RichEmbed()
    .setColor("#3ad729")
    .addField(" :Bvn: Bienvenue sur le serveur :", member.username)
    .addFooter ("RadioLand Bienvenue");
channel.send({embed})
});
  client.on(`message`, message =>{
    if(message.content.startsWith(prefix + "anim")) {
        message.delete()
        const embed = new Discord.RichEmbed()
        .setColor("#2e1fe6")
        .setTitle("Voici les animateurs de RadioLand avec leurs horaires :")
        .addField("Satyre59 :","```-Dimanche 8h30-10h00\n-Vendredi 20h00-22h00\n-Samedi 20h00-21h00```")
        .addField ("Buxter_YTB :","```-Lundi 8h00-10h00\n-Mardi 17h00-19h00\n-samedi 17h00-18h00\n-Dimanche 13h00-15h00```")
        .addField("Le duo : Sαтυиαe et Sophieskyyy :","```-Le Samedi 18h00-19h00\n-Le dimanche 11h00-12h00```")
        .addField ("Mr Chat :","```-Vendredi 22h00-00h00\n-Mercredi 15h30-18h00```")
        .addField ("AshOo :","```-Vendredi : 18h00-19h00\n-Samedi : 19h00-20h00```")
        .setFooter("RadioLand");
         message.channel.send({embed})
    }
    if(message.content.startsWith(prefix + "count")) {
      message.delete ()
      message.reply(`Nous sommes ${message.guild.memberCount} Sur RadioLand`);
      }
  });
client.login(process.env.BOT_TOKEN)
