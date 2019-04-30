const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = ".";
const cooldown = new Set();

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
         var millisec = date.getMilliseconds();
         if(minutes < 10)
              minutes = "0" + minutes;
          if(heure < 10)
              heure = "0" + heure;
              // ajout de 2h de décalage
              heure = Number(heure) + 2;
         return heure + "h" + minutes + " et " + millisec + " millisecondes";
    }
    return dateFr() + ' il est ' + heure();
}
client.on('ready', () => {
client.user.setStatus('idle')
	.then(console.log)
	.catch(console.error);
});

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
		message.delete()
		if(!message.member.hasPermission("MANAGE_MESSAGE")) 
			return message.channel.send(":x: Et ben non, je crois bien que tu n'a pas les permissions d'utiliser cette commande :x:")
	const deleteCount = parseInt(args[0], 10);
	if(!deleteCount || deleteCount < 2 || deleteCount > 100)
		return message.reply("Veuillez indiquer un nombre compris entre 2 et 100 pour le nombre de messages à supprimer.");
		const fetched = await message.channel.fetchMessages({limit: deleteCount});
		message.channel.bulkDelete(fetched)
		.catch(error => message.reply(`Impossible de supprimer des messages à cause de: ${error}`));
	}
	if(command === "count") {
		message.delete();
		message.reply(`Nous sommes ${message.guild.memberCount} Sur ${message.guild.name}`);
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
		message.delete()
		var amsg = message.content;
		// supprime le premier mot de la chaine (string) donc "!pub machin" va supprimer pub
		var msg = amsg.substr(amsg.indexOf(" ") + 1);
		console.log(msg);
		console.log(typeof msg);
		// Donne le nombre de caractères dans la chaine
		console.log(msg + ' ' + msg.length);
		// ici c'est length pas size inférieur ou égal
		if(msg.length <= 30) {
			console.log("Votre publicité doit contenir plus de 30 caractère");
			return message.channel.send ("Votre publicité doit contenir plus de 30 caractère");	

		}
		var reason = msg;
		var test = message.guild.channels.find(`name`, "dans-ta-pub");
		console.log(test);
		const embed = new Discord.RichEmbed()
		.setColor("#15f153")
		.setTitle("Publicité")
		.addField("Publicité de :", `${message.author}`)
		.addField("Publicité :", reason);
		// envoie au channel courant
		//message.channel.send({embed})
		// envoie au channel distant par l'id
		const channel = message.guild.channels.find(`name`,"dans-ta-pub");// Find the channel ID "123456789"
	    if(channel) { // Check if that channel exists
	        channel.send({embed})
		    message.channel.send ("Votre publicité à été envoyer avec succès sur #dans-ta-pub");
	    } else {
	        message.channel.send("je ne trouve pas le salon de dans-ta-pub, contacter un administrateur! ");
	    }

		
	}
	if (command === "help") {
const embed = new Discord.RichEmbed()
		.setColor("#15f153")
.setTitle ("Bienvenue dans l'interface d'aide")
.addField ("Pour savoir comment utiliser la commande. pub"," Taper .help-pub")
.addField ("Pour afficher mes commandes :"," Taper .cmd")
.setFooter (`Demandé par ${message.author.username}`,`${message.author.avatarURL}`);
message.channel.send ({embed})
}
	if(command === "help-pub") {
message.delete ()
const embed = new Discord.RichEmbed()
.setColor ("#2e1fe6")
.setTitle ("Bienvenue dans l'interface pour apprendre à utiliser la commande .pub")
.addField ("Pour apprendre à te servir de moi :",`Pour utiliser mon service de .pub tu devra tout d'abord créé un salon nommer **dans-ta-pub** ensuite il te suffira de faire la commande sur un salon et tu viens de finir le setup du .pub`)
.setFooter(`demandé par ${message.author.username}`,`${message.author.avatarURL}`);
message.channel.send ({embed})
}
	if(command === "kick") {
		if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR"))
			return message.channel.send("Vous n'avez pas accès à cette commande, seul les administrateur on accès à cette commande!");
		if(message.mentions.users.size === 0)
			return message.channel.send("Vous avez oublié de mention la personne à exclure !");
		const member = message.mentions.members.first();
		message.channel.send(`${message.mentions.users.first()} à été Kické par ${message.author.username}`);
		member.kick();
		}
	 if (command === "ban") {
		if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR"))
			return message.channel.send("Vous n'avez pas accès à cette commande, seul les administrateur on accès à cette commande!");
		if(message.mentions.users.size === 0)
			return message.channel.send("Vous avez oublié de mention la personne à exclure !");
		const member = message.mentions.members.first();
		message.channel.send(`${message.mentions.users.first()} à été banni par ${message.author.username}`);
		member.ban();
	}
	if(command === "cmd") {
message.delete ()
const embed = new Discord.RichEmbed()
.setColor ("#15f153")
.setTitle ("Bienvenue sur l'interface de mes commandes")
.setDescription("Prefix = .")
.addField ("Commande universel :","``help\\help-pub\\stats\\count\\invite``")
.addField ("Commande modération :","``kick\\ban\\purge``");
message.channel.send ({embed})
}
	if(command === "invite") {
message.delete ()
const embed = new Discord.RichEmbed  ()
.setTitle("Voici l'invitation pour m'ajouter à votre serveur")
.setDescription("https://discordapp.com/api/oauth2/authorize?client_id=570251638221307914&permissions=8&scope=bot")
.setFooter ("Crée par ⏳Gaétan");
message.channel.send ({embed})
}
	if (command === 'say') {
if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(":x: Et ben non, je crois bien que tu n'a pas les permissions d'utiliser cette commande :x:");
        let m = args.slice(1).join(' ');
        message.delete(100);
        message.channel.send(`${m}`);
		} 
	if (cooldown.has(message.author.id)) { 
		message.delete()
		message.channel.send("Attend une minute svp. - " + message.author); 
	} else { cooldown.add(message.author.id); 
		setTimeout(() => { cooldown.delete(message.author.id); }, 60000); 
	       }
	// fin de l'ajout

	// ton ancien code un peu bordélique
	/*
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
	if(message.content.startsWith(prefix + `pub`)) {
		message.delete()
	if(message.size === 10)
		return mesage.channel.send ("Votre publicité doit contenir plus de 10 caractère")
		let rreason = args.join(" ").slice(28);
		let reportEmbed = new Discord.RichEmbed()
		.setDescription("Publicité")
		.setColor("#15f153")
		.addField("Publicité de :", `${message.author}`)
		.addField("Publicité :", rreason);
		let reportschannel = message.guild.channels.find(`name`, "💫pub-vip💫");
	if(!reportschannel) return message.channel.send("je ne trouve pas le salon de Pub contacter un administrateur! ");
		reportschannel.send(reportEmbed);
	}
	*/
  });
client.login(process.env.BOT_TOKEN);
