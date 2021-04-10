const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports.run = async (bot, message, args) => {

  if(args[0] === "help") return message.channel.send(`Vous devez juste faire : ${prefix}help`);

  if(args[0]) {
    let command = args[0];
    if(bot.commands.has(command)) {
      command = bot.commands.get(command)
      let helpEmbed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor("NameServ", message.guild.iconURL({dynamic: true, size: 512}))
      .setThumbnail(bot.user.displayAvatarURL({dynamic: true, size: 512}))
      .setDescription(`Le bot à comme préfix : ${prefix}`)
      message.channel.send(helpEmbed)
  }}
  let cmdmember = '\`help\` \`serverinfo\` \`userinfo\` \`botinfo\` \`userstats\` \`patch\`'
  let cmdadmin = '\`kick\` \`ban\` \`openticket\`'
  if(!args[0]) {
  let embed = new Discord.MessageEmbed()
  .setAuthor(`Commandes d'aide`)
  .setColor('RANDOM')
  .setDescription(`${message.author.username} va voir tes messages privés !`)

  let hEmbed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setAuthor("NameServ", message.guild.iconURL({dynamic: true, size: 512}))
  .setThumbnail(bot.user.displayAvatarURL({dynamic: true, size: 512}))
  .setDescription(`Voici toutes les commandes disponibles pour le bot \`${bot.user.username}\` \n Le prefix du bot est : \`${prefix}\``)
  .addField('Commandes pour les membres :', cmdmember)
  .addField('Commandes pour les admins :', cmdadmin)
  .addField('Conseil du robot', 'Ne spam pas mes commandes ca ne servira à rien :(')
  .setFooter('NameServ - help')
  message.channel.send(embed)
  message.author.send(hEmbed)
}
}


module.exports.config = {
  name: 'help'
}
