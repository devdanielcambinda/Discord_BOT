module.exports = {
    name: 'server-info',
	description: 'This commands gives information about the server.',
    execute(message,args, client,Discord){
  
        const embed = new Discord.MessageEmbed()
        .setColor('#870909')
        .setTitle('Server-Info')
        .setThumbnail(message.guild.iconURL())
        .addFields(
            {name:'Creation date: ', value: new Date (message.guild.createdTimestamp).toLocaleDateString() , inline: false },
            {name: 'Owner: ', value: '<@'+message.guild.ownerID+'>' , inline:false},
            {name:'Members: ', value: message.guild.memberCount  , inline:false }
        )
        .setTimestamp();

        message.channel.send(embed);
    }
}