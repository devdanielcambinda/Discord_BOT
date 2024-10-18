const lyricsFinder = require('lyrics-finder');
module.exports = {
    name: 'lyrics',
	description: 'This commands gives the lyrics of a song.',
    async execute(message,args, client,Discord){
  
        const regex = /"(.+)" "(.+)"/
        const execed = regex.exec(args.join(" ").trim())
        if(!execed) return; //invalid args
        const [_full, artist, title] = execed;
        

            let lyrics = await lyricsFinder(artist, title) || "Artist or music not found!";

            
            const embed = new Discord.MessageEmbed()
            .setColor('#870909')
            .setTitle('Music Lyrics')
            .addFields(
                {name:'Artist: ', value: artist , inline: true },
                {name:'Title: ', value: title , inline:true},
            )
            .setTimestamp();

            const splitUp = lyrics.match(/.{1,1000}/gs);
            splitUp.forEach(s=>embed.addField("\u200b", s));

            message.channel.send(embed);

    }
}