const Discord = require("discord.js")

module.exports.run = async(bot,message,args) => {

  message.delete()
  if(!message.member.hasPermission("ADMINISTRATOR")) return;

  let OpenTicket = new Discord.MessageEmbed()
  .setTitle("๐Ticket")
  .setDescription('Reagissez "๐" pour ouvrir un ticket')
  .setFooter("NameServ' - Ticket")

  let myGuild = bot.guilds.cache.get('IDserv')
  let SendChannel = myGuild.channels.cache.get('IDCHannelTicket')
  SendChannel.send(OpenTicket)
  .then(msg => msg.react('๐'))
}
module.exports.config = {
  name: "openticket"
}
