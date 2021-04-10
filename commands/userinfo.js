const Discord = require('discord.js')

module.exports.run = async(bot,message,args) => {

  let userEmbed = new Discord.MessageEmbed()
  .setAuthor(message.author.tag)
  .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 512}))
  .addField(`Nom de l'utilisateur`, `${message.author.username}`)
  .addField('Tag', message.author.discrimator)
  .addField('ID', message.author.id)
  .addField('Status', message.author.presence.status)
  .addField('Compte créer le ', message.author.createdAt)
  .setFooter('Informations sur vous')

  message.channel.send(userEmbed)

}

module.exports.config = {
  name: 'userinfo'
}
