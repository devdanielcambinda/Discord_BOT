const Discord = require('discord.js');
module.exports ={
    name:'messageDelete',
    async execute(message, client){

        if (!message.guild || !message.content ) return;
     
        const fetchedLogs = await message.guild.fetchAuditLogs({
                limit: 1,
                type: 'MESSAGE_DELETE',
            }).catch(() => ({
                entries: []
            }));
        
            const deletionLog = fetchedLogs.entries.first();
        
            const { executor, target } = deletionLog;
        
            if (target.id === message.author.id) {
        
            const deletedM = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Deleted Message')
            .addFields(
                {name:'Message by: ', value:`${message.author.tag}`, inline:true },
                {name:'Deleted by: ', value:`${executor.tag}`, inline: true},
                {name:'Channel: ', value: `${message.channel}` , inline:false},
                {name:'Message: ', value:`${message.content}`, inline: false}
            )
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp();
        
            //client.channels.cache.get("812774016489095229").send(deletedM);
            message.guild.channels.cache.find(channel=>channel.name==="bot-logs").send(deletedM);

            }    else {
        
            // self deleted 
            deletedM = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Deleted Message')
            .addFields(
                {name:'Message by: ', value:`${message.author.tag}`, inline:true },
                {name:'Deleted by: ', value:`Self delete/bot`, inline: true},
                {name:'Channel: ', value: `${message.channel}` , inline:false},
                {name:'Message: ', value:`${message.content}`, inline: false}
            )
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp();
        
                //client.channels.cache.get("812774016489095229").send(deletedM);
                message.guild.channels.cache.find(channel=>channel.name==="bot-logs").send(deletedM);
            }

        }
}