const Discord = require("discord.js")

module.exports.run = async(bot,message,args) => {

  const { member, mentions } = message
  const tag = `<@${member.id}>`

  if(
    member.hasPermission('BAN_MEMBERS')
  ) {
    const target = mentions.users.first()


  if(target) {
    const targetMember = message.guild.members.cache.get(target.id)
    targetMember.ban()
    message.channel.send(`${tag}, Cet utilisateur viens d'être ban du serveur`)
  } else {
    message.channel.send(`${tag}, S'il te plait défini qui tu ban kick`)
  }

} else {
  message.channel.send(`${tag}, Tu n'a pas la persmission de faire cette commande`)
}

let banembed = new MessageEmbed()
.setTitle("Bannissement")
.setDescription(`${tag} vient d'être banni par ${message.author}`)

bot.channels.cache.get("ChannelStaff").send(banembed);

}


module.exports.config = {
  name: "ban"
}
