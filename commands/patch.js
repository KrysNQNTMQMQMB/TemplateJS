const Discord = require('discord.js')

module.exports.run = async(bot,message,args) => {

  let patchEmbed = new Discord.MessageEmbed()
  .setAuthor("Patch 1.0")
  .setDescription('Liste des derniers ajouts')
  .setThumbnail(bot.user.displayAvatarURL({dynamic: true, size: 512}))
  .addField('userstats', `enregistre le nombre de messages que vous avez envoyés.`)
  .addField('commande(s) :', '+userstats')
  .setFooter('NameServ - PatchBot')

  message.channel.send(patchEmbed)

}

module.exports.config = {
  name: 'patch'
}
