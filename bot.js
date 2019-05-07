const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = ".";
const cooldown = new Set ();
var dev_id = [516274923828805667];
function return_date() 
{
    function return_dateFr()
    {
         // les noms de jours / mois
         var jours = new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
         var mois = new Array("Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre");
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
          if(heure < 10)
              heure = "0" + heure;
              // ajout de 2h de décalage
              heure = Number(heure) + 2;
         return heure + "h" + minutes;
	    
    }
    return return_dateFr() + '|' + heure();
}
client.on('ready', () => {
client.user.setStatus('idle')
	.then(console.log)
	.catch(console.error);
});
client.on('ready', () => {
	client.user.setPresence({ game: { name: `Dans Ta Pub | .help`, type: "WATCHING" } });
});
client.on('guildCreate', guild => {
    const embed = new Discord.RichEmbed()
        .setDescription(`📌 Merci à **${guild.name}** d'avoir ajouté DanPub.`)
        .addField("📋 __Nom du serveur__", guild.name, true)
        .addField("📊 __Nombre de membres__ :", guild.memberCount, true)
        .addField("💻 __Nombre de salons__ :", guild.channels.size, true)
        .addField("👤 __Propriétaire__ :", guild.owner, true)
        .addField("🌍 __Région du serveur__ :", guild.region, true)
        .addField("📝 __ID du serveur__ :", guild.id, true)
        .setColor("RANDOM")
      client.channels.get('573259104710164495').send(embed);
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
			return message.channel.send(":x: Et ben non, je crois bien que tu n'a pas les permissions d'utiliser cette commande :x:").then(message => {message.delete(5000)})
	const deleteCount = parseInt(args[0], 10);
	if(!deleteCount || deleteCount < 2 || deleteCount > 100)
		return message.reply("Veuillez indiquer un nombre compris entre 2 et 100 pour le nombre de messages à supprimer.").then(message => {message.delete(5000)});
		const fetched = await message.channel.fetchMessages({limit: deleteCount});
		message.channel.bulkDelete(fetched)
		.catch(error => message.reply(`Impossible de supprimer des messages à cause de: ${error}`)).then(message => {message.delete(5000)});
	}
	if(command === "count") {
		message.delete();
		message.reply(`Nous sommes ${message.guild.memberCount} Sur ${message.guild.name}`).then(message => {message.delete(5000)});
	}
if(command === "stats") {
		message.delete()
		const embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Statistiques")
		.addField("Nombre de serveur :", client.guilds.size)
		.addField("Nombre d'utilisateurs :", client.users.size);
		message.channel.send({embed})
}
	if(cooldown.has(message.author.id)) { 
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
		if(msg.length <= 30) {
			console.log("Votre publicité doit contenir plus de 30 caractère");
			return message.channel.send ("Votre publicité doit contenir plus de 30 caractère");	
		}
		var reason = msg;
		var test = message.guild.channels.find(`name`, "dans-ta-pub");
		console.log(test);
		const embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Publicité")
		.addField("Publicité de :", `${message.author}`)
		.addField("Publicité :", reason);
		// envoie au channel courant
		//message.channel.send({embed})
		// envoie au channel distant par l'id
		//const channel = message.guild.channels.find(`name`,"dans-ta-pub");// Find the channel ID "123456789"
	    //if(channel) { // Check if that channel exists
	        client.channels.findAll('name', 'dans-ta-pub').map(channel => channel.send(embed))
} else {
if(command === "pub") { // Vérification. Est-ce que le membre est dans le cooldown.
    message.channel.send("⚠️ Le cooldown est activé pendant 2h ! ");
    }
}
cooldown.add(message.author.id);
setTimeout(() => { 
    cooldown.delete(message.author.id); 
}, 720000);
 }

	if (command === "help") {
const embed = new Discord.RichEmbed()
		.setColor("RANDOM")
.setTitle ("Bienvenue dans l'interface d'aide")
.addField ("Pour savoir comment utiliser la commande. pub"," Taper .help-pub")
.addField ("Pour afficher mes commandes :"," Taper .cmd")
.setFooter (`Demandé par ${message.author.username}`,`${message.author.avatarURL}`);
message.channel.send ({embed})
}
	if(command === "help-pub") {
const embed = new Discord.RichEmbed()
               .setColor ("RANDOM")
.setTitle ("Bienvenue dans l'interface pour apprendre à utiliser la commande .pub")
.addField ("Pour apprendre à te servir de moi :"," Pour utiliser la commande. pub il vous faut un salon nommer\n ``dans-ta-pub``, le bot devra avoir accès à ce salon, pour y poster les pubs!\n\n Nous vous remercions!  \n\n __Le staff de DanBot__")
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
.setColor ("RANDOM")
.setTitle ("Bienvenue sur l'interface de mes commandes")
.setDescription("Prefix .")
.addField ("Commande universel :","``help\\help-pub\\stats\\count\\invite\\user-info\\dons\\support\\help-bvn``")
.addField ("Commande modération :","``kick\\ban\\purge``")
.addField ("Commande Fun :","``slap``");
message.channel.send ({embed})
}
	if(command === "invite") {
message.delete ()
const embed = new Discord.RichEmbed  ()
.setTitle("Voici l'invitation pour m'ajouter à votre serveur")
.setDescription("[Pour m'ajouter à votre serveur cliquer ici](https://discordapp.com/api/oauth2/authorize?client_id=570251638221307914&permissions=8&scope=bot)")
.setFooter ("Crée par ⏳Gaétan");
message.channel.send ({embed})
}
	if (command === 'say') {
if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(":x: Et ben non, je crois bien que tu n'a pas les permissions d'utiliser cette commande :x:");
        let m = args.slice(1).join(' ');
        message.delete(100);
        message.channel.send(`${m}`);
} 
	if (command === "ping") {
    message.delete();
    message.reply("Pong! (Calcul en cours...)").then(m => m.edit(`${message.author}:ping_pong: Pong!__\n La latence actuelle est de ${m.createdTimestamp - message.createdTimestamp}ms__`) );
    message.react("✅");
  }
	   if (command === "user-info") { 
		   message.delete ()
 const user = message.mentions.users.first()
 const member = message.guild.member(user)
     const embed = new Discord.RichEmbed() // Use Discord.MessageEmbed if you use the master version
        .setColor('RANDOM') // I just put random in here, but you can chnage it to anything else.
        .setTitle(`${user.username}`)
        .addField('ID:', `${user.id}`, true)
        .addField('Status:', `${user.presence.status}`, true)
        .addField('Game:', `${user.presence.game ? user.presence.game.name : 'None'}`, true)
        .setFooter(`Demandé par ${message.author.username}`);
    message.channel.send({embed})

}
if (command === "dons") {
message.delete ()
const embed = new Discord.RichEmbed  ()
.setColor ("RANDOM")
.setDescription("https://www.paypal.me/SupportOverBot")
.setTitle("Nous faire un dons");
message.channel.send ({embed})
}
	if (command === "support") {
message.delete ()
const embed = new Discord.RichEmbed  ()
.setColor ("RANDOM")
.setDescription("https://discord.gg/F9HK5cC")
.setTitle("Nous rejoindre");
message.channel.send ({embed})
}
if (command === "help-bvn") {
message.delete ()
const embed = new Discord.RichEmbed  ()
.setColor ("RANDOM")
.setTitle("Utiliser les messages de Bienvenue")
.setDescription("Nous avons simplifier au maximum les messages de bienvenue, il vous suffit de crée un salon nommer\``départ-arrivé`` !!!\n Bonne continuation\n__Le staff de DanPub__");
message.channel.send ({embed })
}
 if (command === "slap") {
message.delete ()
if(message.mentions.users.size === 0)
			return message.channel.send("Vous avez oublié de mentionner une personne ");
const ruse = message.mentions.users.first()
message.channel.send (` ${message.author} Met une grosse baffe à `).then(async msg => {
        setTimeout(() => {
            msg.edit(`${message.author} Met une grosse baffe à 》`);
        }, 1000);
setTimeout(() => {
            msg.edit(`${message.author} Met une grosse baffe à 》》`);
        }, 2000);
setTimeout(() => {
            msg.edit(`${message.author} Met une grosse baffe à 》》》 ${ruse}`);
        }, 3000);
 });
    
 };
	
	
  if(command === "naissance-add") {
		message.delete()
		var amsg = message.content;
		// supprime le premier mot de la chaine (string) donc "!pub machin" va supprimer pub
		var msg = amsg.substr(amsg.indexOf(" ") + 1);
		console.log(msg);
		console.log(typeof msg);
		// Donne le nombre de caractères dans la chaine
		console.log(msg + ' ' + msg.length);
		// ici c'est length pas size inférieur ou égal
		if(msg.length <= 5) {
			console.log("Votre Demande doit contenir plus de 5 caractère");
			return message.channel.send ("Votre Demande doit contenir plus de 5 caractère");	
		}
		var reason = msg;
		var test = client.channels.find(`id`,"573340669465198602");
		console.log(test);
		const embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.addField("Demande d'ajout de date de naissance  :", `${message.author.id}`)
		.addField("Date de naissance  :", reason);
		// envoie au channel courant
		//message.channel.send({embed})
		// envoie au channel distant par l'id
		const channel = client.channels.find(`id`,"573340669465198602");// Find the channel ID "123456789"
	    if(channel) { // Check if that channel exists
	        channel.send({embed})
		    message.channel.send ("Votre demande d'ajouter votre date de naissance est en cours de validation ");
	      } else {
	        message.channel.send("je ne trouve pas le salon de dans-ta-pub, contacter un administrateur! ");
	    }
}
	if (command === "anniv") {
message.delete ()
const embed = new Discord.RichEmbed()
.setColor("RANDOM")
.setTitle("Calendrier des dates de naissance des utilisateurs")
.addField("Janvier :","<@462209917911040000> le 17")
.addField ("Fevrier :","None")
.addField ("Mars :","None")
.addField ("Avril :","None")
.addField("Mai :","None")
.addField("Juin :","None")
.addField("Juillet :","<@516274923828805667> le 15")
.addField ("Août :","None")
.addField("Septembre :","None")
.addField ("Octobre :","None")
.addField("Novembre :","None")
.addField ("Décembre :","None")
.setFooter("Pour demander l'ajout de votre date de naissance faite .naissance-add (date)");
message.channel.send ({embed})
}
	if(command === "gagareboot") {
   message.delete()
		client.user.setStatus('invisible')
		client.user.setActivity('Reconnection...')
		setTimeout(() => {
            message.channel.send(`J'ai bien redémarrer !`);
        }, 7000)
		setTimeout(() => {
          client.user.setStatus('idle')
			.then(console.log)
	.catch(console.error)
        }, 10000)
		setTimeout(() => {
          client.user.setPresence({ game: { name: `Dans Ta Pub | .help`, type: "WATCHING" } })
			.then(console.log)
	.catch(console.error)
        }, 10000)
	.then(console.log)
	.catch(console.error);
	}
	if(command === "test") {
		message.channel.send("<a:bye:569489385746202634>");
	}
  });
client.login(process.env.BOT_TOKEN);
