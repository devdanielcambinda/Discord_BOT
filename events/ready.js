module.exports = {
    name:'ready',
    once: true,
    execute(client){
        
        //client.channels.cache.get("812745727746768946").send("This bot is now online !");
        //client.channels.cache.filter(c=>c.name==="bot-logs").forEach(channel=>channel.send("This bot is now online !"));
        client.user.setPresence({
            activity:{ name:'«commands' , type:'LISTENING'}, status:'ONLINE'
          });
          
    }

 
}