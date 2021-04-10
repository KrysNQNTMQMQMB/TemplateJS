const fs = require('fs');
const Discord = require('discord.js');
const botconfig = require("./config.json");
const tokenfile = require("./token.json");

const bot = new Discord.Client();
const client = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir('./commands', (err, files) => {
	if (err) console.log(err)
	let jsfile = files.filter(f => f.split('.').pop() === 'js')
	if(jsfile.lenght <= 0) {
		console.log('[HANDLER]: Aucune commande trouvée')
	}

	jsfile.forEach((f, i) => {
		let props = require(`./commands/${f}`)
		console.log(`[HANDLER]: ${f} ok !`)
		bot.commands.set(props.config.name, props)
	})

})

bot.on("ready", async () => {

	let thisguild = bot.guilds.cache.get('IDServer')
	let SendChannel1 = thisguild.channels.cache.get('IDServer')

	let StartBot = new Discord.MessageEmbed()
	.setThumbnail(bot.user.displayAvatarURL({dynamic: true, size: 512}))
	.setTitle('📢 Lancement')
	.setDescription('⚙️ Bot lancé !')

	SendChannel1.send(StartBot)

})

bot.on("ready", async () => {

let myGuild = bot.guilds.cache.get('IDServ')
let deleteChannel = myGuild.channels.cache.get('IDChannelDelete')

deleteChannel.bulkDelete(100)

let OpenTicket = new Discord.MessageEmbed()
.setTitle("🎙Ticket")
.setDescription('Reagissez "🗃" pour ouvrir un ticket')
.setFooter("NameServ - Ticket")

deleteChannel.send(OpenTicket)
.then(msg => msg.react('🗃'))

})


bot.on("ready", async () => {
  console.log(`${bot.user.username} est en ligne !`);
  bot.user.setActivity("ServCa - prefix : +", {type: "WATCHING"});
});

bot.on('guildMemberAdd', member => {

let channel = bot.channels.cache.get('IDChannelAutoRole')

	let embedJoin = new Discord.MessageEmbed()
		.setTitle('🌠 **Join**')
    .setColor('#8adff7')
		.setAuthor(`${member.user.username}`)
		.setDescription(`Je te souhaite la bienvenue ${member.user.username} !`)
		.addField('Va faire tes rôles dans :', `${channel}`)

	bot.channels.cache.get("IDChannelBienvenueLeave").send(embedJoin);
})

bot.on('guildMemberRemove', member => {

let embedLeave = new Discord.MessageEmbed()
	.setTitle('🌠 **Leave**')
	.setAuthor(`${member.user.username}`)
	.setColor('#8adff7')
	.setDescription(`Bye Bye, à la prochaine ${member.user.username} !`)

	bot.channels.cache.get("IDChannelBienvenueLeave").send(embedLeave)
})

bot.on('message', message => {


var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf-8'));
var sender = message.author;
var msg = message.content.toUpperCase();
var prefix = '+'


if(msg === prefix + 'USERSTATS') {
    message.channel.send('Vous avez envoyé **' + userData[sender.id].messagesSent + '** messages !' )
}


if (!userData[sender.id]) userData[sender.id] = {
    messageSent: 0
}

userData[sender.id].messagesSent++;

fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
    if (err) console.error(err);
});
});
bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

  let commandFiles = bot.commands.get(command.slice(prefix.length))
  if(commandFiles) commandFiles.run(bot, message, args)
})

bot.on('messageReactionAdd', async(reaction, user) => {
  const message = reaction.message;
	const member = message.guild.members.cache.get(user.id)

  if(user.bot) return;

  if(
    ['🗃', '🔒'].includes(reaction.emoji.name)
  ) {
    switch(reaction.emoji.name) {

        case "🗃":
        console.log(`ticket créé par ${member}`)

        if(reaction.message.channel.id !== "ChannelTicket") return console.log('Bug 1')

        reaction.users.remove(user);

        let username = user.username;
        let categoryID = "IDCatégorie"
        let channel = await message.guild.channels.create(`📥𝒕𝒊𝒄𝒌𝒆𝒕-${username}`,{type: "text", parent: message.guild.channels.cache.get(categoryID)});


        channel.updateOverwrite(message.guild.roles.everyone, {"VIEW_CHANNEL": false});
        channel.updateOverwrite(member, {
          "VIEW_CHANNEL": true,
          "SEND_MESSAGES": true,
          "ADD_REACTION": true
        });
        channel.updateOverwrite(message.guild.roles.cache.find(role => role.name == 'RoleAdministrateur'), {'VIEW_CHANNEL': true});

        var embed1 = new Discord.MessageEmbed()
        .setTitle("Bonjour,")
				.setColor('RANDOM')
        .setDescription("Expliquer votre problème ici")
        .setFooter("ServCa' - Ticket")

				var embed2 = new Discord.MessageEmbed()
				.setTitle('📢 Ouverture de Ticket')
				.addField(`Un membre à créer un ticket.`, `${channel}`)
				.setFooter("NameServ' - Ticket")

        channel.send(`${member}`)
        channel.send(embed1).then(async msg => msg.react('🔒'))
        let logChannel = message.guild.channels.cache.find( c => c.name == 'ChannelStaff')
        if(!logChannel) return;
        logChannel.send(embed2)
        break;

        case "🔒":
        console.log('Ticket fermé !')

        if(!message.channel.name.startsWith('ticket-')) return;
        if(!member.hasPermission("ADMINISTRATOR")) return;

				var embed3 = new Discord.MessageEmbed()
				.setTitle('📢 Fermeture de Ticket')
				.addField(`Un membre à fermé un ticket.`, `${message.channel.name}`)
				.setFooter("NameServ - Ticket")

        message.channel.delete()
        let logChannel2 = message.guild.channels.cache.find(c => c.name == 'ChannelStaff')
        if(!logChannel2) return;
        await logChannel2.send(embed3)
        break;
      }
    }
})


bot.login(tokenfile.token)
