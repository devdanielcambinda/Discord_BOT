const Discord = require('discord.js');
module.exports ={
    name:"messageUpdate",
    execute(oldMessage, newMessage, client) {
		
        const oldContent = oldMessage.content;
        const newContent = newMessage.content;

    if (oldContent === newContent){
        return;
    } else {

        const editedM = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Edited Message')
      .addFields(
        {name:'Message by: ', value:`${oldMessage.author.tag}`, inline:true },
        {name:'Channel: ', value: `${oldMessage.channel}` , inline:false},
        {name:'Old Message: ', value:`${oldContent}`, inline: false},
        {name:'New Message: ', value:`${newContent}`, inline: false}
      )
      .setThumbnail(newMessage.author.displayAvatarURL())
      .setTimestamp();

    //client.channels.cache.get("812774016489095229").send(editedM);
    newMessage.guild.channels.cache.find(channel=>channel.name==="bot-logs").send(editedM);

    }
	}
}