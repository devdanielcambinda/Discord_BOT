const fetch = require('node-fetch');
const request = require('request');
module.exports ={
    name:'lolchampsrotation',
    description:'This commands lists this weeks league of legends free champions',
    execute (message,args, client,Discord){
        fetch(`https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations`, {
	            "method": "GET",
	            "headers": {
                "X-Riot-Token": `${process.env.API_KEY_LOL}`,
                "origin": "https://developer.riotgames.com"
	            }
                })
                .then(res =>  res.json())
                .then(async object => {
                    
                    const embed = new Discord.MessageEmbed()
                    .setColor('#870909')
                    .setTitle('Free League of legends Champions this week')
                    .setTimestamp();

                    
                    
                        let championNames = "";
                        for await (const id of object.freeChampionIds){
                        const championData = await getChampName(id)
                        championNames += `${championData.name}\n`
                        }

                        embed.setDescription(championNames)

                    const embedNewPlayers = new Discord.MessageEmbed()
                    .setColor('#870909')
                    .setTitle('Free League of legends Champions this week for new players')
                    .addField('Max new player level: ', 10 , true)
                    .setTimestamp();

                        let newPlayersNames = ""
                        for await (const id of object.freeChampionIdsForNewPlayers){
                        const newPlayersChampionData = await getChampName(id)
                        newPlayersNames += `${newPlayersChampionData.name}\n`
                        }     
                    
                    embedNewPlayers.setDescription(newPlayersNames)

                    message.channel.send(embed)
                    message.channel.send(embedNewPlayers)
                    
                });
    }
}

async function getChampName(id) {
    const data = Object.values(await fetch('http://ddragon.leagueoflegends.com/cdn/11.20.1/data/en_US/champion.json').then(res=>res.json()).then(r=>r?r.data : {}))
    return data.find(champion=>champion.key==id)
    }

