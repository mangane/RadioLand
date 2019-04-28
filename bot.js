const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = ".";
function return_date() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var mn = today.getMinutes();
    var ss = today.getSeconds();
    var ms = today.getMilliseconds();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (hh < 10) {
        hh = '0' + hh;
    }
    if (mn < 10) {
        mn = '0' + mn;
    }
    if (ss < 10) {
        ss = '0' + ss;
    }
    today =  dd + '-' + mm + '-' + yyyy + ' et il est ' + hh + ':' + mm + ':' + ss + ':' + ms;
    return today;
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
    .setFooter(`Identifiant :\n${member}`)
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
	message.delete ()
		if(!message.member.hasPermission("MANAGE_MESSAGE")) return message.reply(":x: Et ben non, je crois bien que tu n'a pas les permissions d'utiliser cette commande");
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
		.addField("Publicité :", reason);
		// envoie au channel courant
		//message.channel.send({embed})
		// envoie au channel distant par l'id
		let chan = client.channels.find("name", "pub-dans-ta-pub"); // Find the channel ID "123456789"
	    if(chan) { // Check if that channel exists
	        chan.send({embed});
	    } else {
	        message.channel.send("je ne trouve pas le salon de Pub contacter un administrateur! ");
	    }

		if(command === "help") {
                    message.delete ()
                    const help = new Discord.RichEmbed()
                    .setColor("#2e1fe6")
                    .setTitle("Bienvenue dans le menu d'aide")
                    .addField("Test");
                    message.channel.send({help})
	}
	// fin de l'ajout
  });
client.login(process.env.BOT_TOKEN)
