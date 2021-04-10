const Discord = require("discord.js")

module.exports.run = async(bot,message,args) => {

  const { member, mentions } = message
  const tag = `<@${member.id}>`

  if(
    member.hasPermission('KICK_MEMBERS')
  ) {
    const target = mentions.users.first()


  if(target) {
    const targetMember = message.guild.members.cache.get(target.id)
    targetMember.kick()
    message.channel.send(`${tag}, Cet utilisateur viens d'être kick du serveur`)
  } else {
    message.channel.send(`${tag}, S'il te plait défini qui tu veux kick`)
  }

} else {
  message.channel.send(`${tag}, Tu n'a pas la persmission de faire cette commande`)
}

let kickembed = new MessageEmbed()
.setTitle("exclusion")
.setDescription(`${tag} vient d'être exclu par ${message.author}`)

bot.channels.cache.get("ChannelStaff").send(kickembed);

}


module.exports.config = {
  name: "kick"
}
