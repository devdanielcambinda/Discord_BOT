module.exports = {
    name:'commands',
    description:'This command is use to show all the available commands',
    execute (message,args, client,Discord){

        const embed = new Discord.MessageEmbed()
                    .setColor('#870909')
                    .setTitle('Bot commands')
                    .setTimestamp();
        
        client.commands.forEach(comando => {
            embed.addFields({name:'Command:', value:`«${comando.name}`, inline: true },
                            {name:'Description:', value: comando.description, inline: true },
                            {name: '\u200b' ,value: '\u200b',inline:true})
        });

        message.channel.send(embed);

    }
}