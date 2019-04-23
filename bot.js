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
if(message.content.startsWith(prefix + "invite")) {
			message.delete()
		const embed = new Discord.RichEmbed()		
			.setColor(0x954D23)
			.setTitle("Invitation :")
			.addField("Voici l'email :","gaetanoverbot@gmail.com")
			.addField("Voici le lien pour m'inviter","https://discordapp.com/api/oauth2/authorize?client_id=520322405982535705&permissions=8&scope=bot");
		message.channel.send({embed});
} 
});
client.login(process.env.BOT_TOKEN)
