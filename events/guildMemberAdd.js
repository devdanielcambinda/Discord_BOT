const Discord = require('discord.js');
module.exports = {
    name:'guildMemberAdd',
    execute(newMember, client){

        const embed = new Discord.MessageEmbed()
        .setColor('#12ed50')
        .setTitle('Welcome to our server !')
        .addFields(
            {name:'Name: ', value: `<@${newMember.id}>`},
            {name:'Bot: ', value: newMember.user.bot ?  'Yes' : ' No'},
            {name:'Date of account creation: ', value: new Date (newMember.user.createdAt).toLocaleDateString() }
        )
        .setThumbnail(newMember.user.displayAvatarURL())
        .setTimestamp();
        
        newMember.guild.channels.cache.find(channel=>channel.name==="welcome").send(embed);

    }
}