const Discord = require('discord.js')

module.exports.run = async(bot,message,args) => {

  let serverEmbed = new Discord.MessageEmbed()
  .setAuthor("Caro'Bot")
  .setThumbnail(bot.user.displayAvatarURL({dynamic: true, size: 512}))
  .addField('Nom du bot :', `NameBOT`)
  .addField('prefix : ', '+')
  .addField('Commande HELP :', '+help')
  .setFooter('Informations du bot')

  message.channel.send(serverEmbed)

}

module.exports.config = {
  name: 'botinfo'
}
