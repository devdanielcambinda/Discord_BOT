const Discord = require('discord.js');
module.exports ={
    name:'message',
    execute(message, client){
        
        const prefix = client.prefix;
        if(message.channel.type === "dm") return;

        // Command handler
        if(message.content.startsWith(prefix)){

            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();
            const comando = client.commands.get(command) ;

            if (!client.commands.has(command)) return message.channel.send("Command doesn't exist !");  

            if(comando) comando.execute(message, args, client,Discord)
        
        }
        // Command handler END

    }
}