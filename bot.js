require ('dotenv').config();
//console.log(process.env.DISCORDJS_BOT_TOKEN);

const { Client, Message, WebhookClient } = require('discord.js');
const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});

const webhookClient = new WebhookClient(
    process.env.WEBHOOK_ID,
    process.env.WEBHOOK_TOKEN,
);

const PREFIX = "?";

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in`);
});

client.on('message', async (message) => {
    if (message.author.bot) return;
    console.log(`[${message.author.tag}]: ${message.content}`);
    if (message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        if (CMD_NAME === 'kick'){
            if (!message.member.hasPermission('KICK_MEMBERS')){
                return message.reply('You cant do that little guy');
            }
            if (args.length === 0) return message.reply('Please provide an ID dude');
            const member = message.guild.members.cache.get(args[0]);
            if (member){
                member
                .kick()
                .then((member) => message.channel.send(`${member} was kicked out.....ouff`))
                .catch((err) => message.channel.send('I dont have permissions to do this, good sir'));
            }else {
                message.channel.send('That member was not found');
            }
        } else if (CMD_NAME === 'ban'){
            if (!message.member.hasPermission('BAN_MEMBERS')){
                return message.reply('You cant do that little guy');
            }
            if (args.length === 0) return message.reply('Please provide an ID dude');
            
            try {
                const user = await message.guild.members.ban(args[0]);
                message.channel.send('The dude you wanted banned was banned successfully. Cool.');

            } catch (err) {
                console.log(err);
                message.channel.send('An error occured bro. Either i do not have permissions or the user was not found. Sowwy');
            }
            
        } else if (CMD_NAME === 'announce'){
            const msg = args.join(' ');
            webhookClient.send(msg);

        } else if (CMD_NAME === 'roast'){
            number = Math.floor(Math.random() * Math.floor(3));
            if (number == 1){
                message.channel.send("Yo mama so fat she bends spacetime (Spacetime bends around large masses)");
            } else if (number == 2){
                message.channel.send("Life is beautiful. You are not.");
            } else if (number == 3){
                message.channel.send("You're so single. Nothing else to say");
            } else if (number == 0){
                message.channel.send("You are so dumb that you thought a laptop is worn by girls");
            }
            
        }
    }
});

//adding reaction roles
client.on('messageReactionAdd', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === '772712214608085002'){
        switch (name){
            case '💻':
                member.roles.add('724249510758449172');
                break;
            case '🎮':
                member.roles.add('724249502516510740');
                break;
            case '💪':
                member.roles.add('772715031174578177');
                break;
        }
    }
});

//removing reaction roles
client.on('messageReactionRemove', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === '772712214608085002'){
        switch (name){
            case '💻':
                member.roles.remove('724249510758449172');
                break;
            case '🎮':
                member.roles.remove('724249502516510740');
                break;
            case '💪':
                member.roles.remove('772715031174578177');
                break;
        }
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);