const fetch = require('node-fetch');
module.exports = {
    name: 'covid',
	description: 'This commands gives information about covid cases in the named country',
    execute(message,args,client,Discord){

        if(!args.length){

            message.channel.send("You need to say a country !");

        }else {

         fetch(`https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=${args[0]}`, {
	            "method": "GET",
	            "headers": {
                "x-rapidapi-key": `${process.env.API_KEY_RAPIDAPI}`,
                "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com"
	            }
                })
                .then(res =>  res.json())
                .then(object => {
                    
                    const messagemErro = object.message;

                    if( messagemErro.length > 2){
                        
                        
                        message.channel.send("Country not found or country name not in english. But you can find the covid global stats below");

                        const embed = new Discord.MessageEmbed()
                        .setColor('#870909')
                        .setTitle(`Covid Global stats`)
                        .addFields(
                            {name:'Confirmed cases: ', value: object.data.confirmed , inline: false },
                            {name:'Recovered: ', value: object.data.recovered , inline:false},
                            {name:'Deaths: ', value: object.data.deaths  , inline:false }
                        )
                        .setTimestamp();
            
                    message.channel.send(embed);

                    }else {

                        const embed = new Discord.MessageEmbed()
                        .setColor('#870909')
                        .setTitle(`Covid in ${object.data.location}`)
                        .addFields(
                            {name:'Confirmed cases: ', value: object.data.confirmed , inline: false },
                            {name:'Recovered: ', value: object.data.recovered , inline:false},
                            {name:'Deaths: ', value: object.data.deaths  , inline:false }
                        )
                        .setTimestamp();
            
                        message.channel.send(embed);

                    }

                    
                });


            }

        }




    }