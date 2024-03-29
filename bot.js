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

piinfo = false;

//all message commands
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

        } else if (CMD_NAME === 'compliment'){
            numb = Math.floor(Math.random() * Math.floor(4));
            if (numb == 1){
                message.channel.send("Your heart is larger than the Milkyway + Andromeda combined!");
            } else if (numb == 2){
                message.channel.send("Biology tells you you’re 70% water, Chemistry tells you you’re 60% oxygen, Physics tell you you’re 99.99999999% empty space, And I can tell you you’re 100% cute.");
            } else if (numb == 3){
                message.channel.send("Are you French? Because Eiffel for you :)");
            } else if (numb == 0){
                message.channel.send("What's the difference betweeen you and practice? Nothing, because both of you make perfect!");
            } else if (numb == 4){
                message.channel.send("Aside from being sexy, what do you do for a living?")
            }

        } else if (CMD_NAME === 'roast'){
            number = Math.floor(Math.random() * Math.floor(3));
            if (number == 1){
                message.channel.send("Yo mama so fat she bends spacetime (Spacetime bends around large masses)");
            } else if (number == 2){
                message.channel.send("Life is beautiful. You are not.");
            } else if (number == 3){
                message.channel.send("You're so single. Nothing else to say");
            } else if (number == 0){
                message.channel.send("You are so dumb that you think a laptop is worn by girls");
            }

        } else if (CMD_NAME === 'pi'){
            message.channel.send("What do you want to know about pi? (Reply to this with eiher 1, 2 or 3 to know the corresponding facts!)");
            message.channel.send("1. A brief history of pi.");
            message.channel.send("2. The first 100 decimal places of pi.");
            message.channel.send("3. Some formulas to calculate pi.");

            piinfo = true;

        } else if (CMD_NAME === 'youtube'){
            message.channel.send("https://www.youtube.com/channel/UCyOhV5RftCILMDKUCcR6vBg");
        } else if (CMD_NAME === 'ding'){
            message.channel.send("dong");
        }
    } 
    //sending the pi info after they reply with either 1, 2 or 3
    else if (message.content == '1' && piinfo){
        message.channel.send("Ancient civilizations knew that there was a fixed ratio of circumference to diameter that was approximately equal to three. The Greeks refined the process and Archimedes is credited with the first theoretical calculation of Pi. In 1761 Lambert proved that Pi was irrational, that is, that it can't be written as a ratio of integer numbers. In 1882 Lindeman proved that Pi was transcendental, that is, that Pi is not the root of any algebraic equation with rational coefficients. This discovery proved that you can't 'square a circle', which was a problem that occupied many mathematicians up to that time.")
        piinfo = false;
    } else if (message.content == '2' && piinfo){
        message.channel.send("3.1415926535 8979323846 2643383279 5028841971 6939937510 5820974944 5923078164 0628620899 8628034825 3421170679");
        piinfo = false;
    } else if (message.content == '3' && piinfo){
        message.channel.send("Euler's Formula : (Pi^2)/6 = SUM (n = 1..infinity) of 1/n2 = 1/12 + 1/22 + 1/32 + ...");
        message.channel.send("Leibnitz's Formula : Pi/4 = 1/1 - 1/3 + 1/5 - 1/7 + ...");
        message.channel.send("Wallis Product : Pi/2 = 2/1 * 2/3 * 4/3 * 4/5 * 6/5 * 6/7 * ...");
        piinfo = false;
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
