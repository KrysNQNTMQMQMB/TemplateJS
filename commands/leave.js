const Discord = require("discord.js")

module.exports.run = async(bot,message,args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return;

bot.emit('guildMemberRemove', message.member)
}
module.exports.config = {
  name: "leave"
}
