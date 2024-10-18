const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));


const fs = require('fs');
const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client(); // define client
client.commands = new Discord.Collection(); // set client commands
client.events = new Discord.Collection(); // set client events 
client.prefix= "«"; // define clients prefix 
       


// Set commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // filter js files inside commnads folder 

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
      if(command.name){
        client.commands.set(command.name, command);
      }else{
        continue;
      }
    }
// Set commands END

//Event Handler 

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js')); //filter js files inside events folder 

  for (const file of eventFiles) {
    const event = require(`./events/${file}`);
  if(event.once){
    client.once(event.name, (...args) => event.execute(...args, client));
  }else{
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}
//Event handler END 

client.login(process.env.TOKEN); //login