const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = ".";

client.on('ready', () => {
client.user.setStatus('idle')
	.then(console.log)
	.catch(console.error);
});

client.on('ready', () => {
	client.user.setPresence({ game: { name: `Dans Ta Pub`, type: "SEEING" } });
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
	const channel = member.guild.channels.find(ch => ch.name === 'départ-arrivé');
	if (!channel)return;
	const embed = new Discord.RichEmbed()
	.setColor("#3ad729")
	.addField("Bienvenue", `${member}`)
	.setTitle(":inbox_tray: Bienvenue sur le serveur :inbox_tray:");
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
		if(msg.length <= 30) {
			console.log("Votre publicité doit contenir plus de 30 caractère");
			return message.channel.send ("Votre publicité doit contenir plus de 30 caractère");	

		}
		var reason = msg;
		var test = message.guild.channels.find(`name`, "💫pub-vip💫");
		console.log(test);
		const embed = new Discord.RichEmbed()
		.setColor("#15f153")
		.setTitle("Publicité")
		.addField("Publicité de :", `${message.author}`)
		.addField("chan :", "💫pub-vip💫")
		.addField("Publicité :", reason);
		// envoie au channel courant
		//message.channel.send({embed})
		// envoie au channel distant par l'id
		let chan = client.channels.find("id", "571904978936135696"); // Find the channel ID "123456789"
	    if(chan) { // Check if that channel exists
	        chan.send({embed});
	    } else {
	        message.channel.send("je ne trouve pas le salon de Pub contacter un administrateur! ");
	    }

		
	}
	// fin de l'ajout
  });
client.login(process.env.BOT_TOKEN)
