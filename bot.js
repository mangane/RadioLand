const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = ".";


function return_date() 
{
    function dateFr()
    {
         // les noms de jours / mois
         var jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
         var mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");
         // on recupere la date
         var date = new Date();
         // on construit le message
         var message = jours[date.getDay()] + " ";   // nom du jour
         message += date.getDate() + " ";   // numero du jour
         message += mois[date.getMonth()] + " ";   // mois
         message += date.getFullYear();
         return message;
    }

    function heure()
    {
         var date = new Date();
         var heure = date.getHours();
         var minutes = date.getMinutes();
         if(minutes < 10)
              minutes = "0" + minutes;
         return heure + "h" + minutes;
    }
    //console.log(dateFr() + ' ' + heure());
    return dateFr() + ' et il est ' + heure();
}

client.on('ready', () => {
	client.user.setPresence({ game: { name: `Dans Ta Pub`, type: "WATCHING" } });
});



client.on('guildMemberRemove', member => {
	
	const channel = member.guild.channels.find(ch => ch.name === 'départ-arrivé');
	if(!channel)return;
	const embed = new Discord.RichEmbed()
	.setColor("#3ad729")
	.addField("Au revoir", `${member}`)
	.setTitle(":outbox_tray: Une personne est partie, reviendra-t-elle ?:outbox_tray:");
	channel.send({embed})
});

client.on('guildMemberAdd', member => {
  console.log(return_date());
  var date = return_date();
  console.log(date);
  const channel = member.guild.channels.find(ch => ch.name === 'départ-arrivé');
    if (!channel)return;
    const embed = new Discord.RichEmbed()
    .setColor("#3ad729")
    .setFooter("Nous sommes le : " + date)
    .addField("Bienvenue", `${member}`)
    .setTitle("📥 Bienvenue sur le serveur 📥");
    channel.send({embed})
});

client.on("message", async message => {
	/* KoS_ début du code =>
		ajout d'un condition de bot et d'une vérification si y'a un préfixe ou pas
	*/
	if(message.author.bot) return;
	if(message.content.indexOf(prefix) !== 0) return;
	// ajout de args vu que tu appelle une variable qui n'existe pas
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	// maintenant au lieu de mettre un if(message.content.startsWith(prefix + "commande") tu met in if(command === "commande")
	// c'est plus clair non ?
	if(command === "purge") {
	const deleteCount = parseInt(args[0], 10);
	if(!deleteCount || deleteCount < 2 || deleteCount > 100)
		return message.reply("Veuillez indiquer un nombre compris entre 2 et 100 pour le nombre de messages à supprimer.");
		const fetched = await message.channel.fetchMessages({limit: deleteCount});
		message.channel.bulkDelete(fetched)
		.catch(error => message.reply(`Impossible de supprimer des messages à cause de: ${error}`));
	}
	if(command === "count") {
		message.delete();
		message.reply(`Nous sommes ${message.guild.memberCount} Sur RadioLand`);
	}
	if(command === "stats") {
		message.delete()
		const embed = new Discord.RichEmbed()
		.setColor("#2e1fe6")
		.setTitle("Statistiques")
		.addField("Nombre de serveur :", client.guilds.size)
		.addField("Nombre d'utilisateurs :", client.users.size);
		message.channel.send({embed})
	}
	if(command === "pub") {
		message.delete()
		var amsg = message.content;
		// supprime le premier mot de la chaine (string) donc "!pub machin" va supprimer pub
		var msg = amsg.substr(amsg.indexOf(" ") + 1);
		console.log(msg);
		console.log(typeof msg);
		// Donne le nombre de caractères dans la chaine
		console.log(msg + ' ' + msg.length);
		// ici c'est length pas size inférieur ou égal
		if(msg.length <= 10) {
			console.log("Votre publicité doit contenir plus de 10 caractère");
			return message.channel.send ("Votre publicité doit contenir plus de 10 caractère");	

		}
		var reason = msg;
		var test = message.guild.channels.find(`name`, "pub-dans-ta-pub");
		console.log(test);
		const embed = new Discord.RichEmbed()
		.setColor("#15f153")
		.setTitle("Publicité")
		.addField("Publicité de :", `${message.author}`)
		.addField("Publicité :", reason);
		// envoie au channel courant
		//message.channel.send({embed})
		// envoie au channel distant par l'id
		const channel = member.guild.channels.find(ch => ch.name === 'départ-arrivé');
	        channel.send({embed});
	    } else {
	        message.channel.send("je ne trouve pas le salon de Pub contacter un administrateur! ");
	    }
  });
client.login(process.env.BOT_TOKEN);
