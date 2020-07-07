require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const randomStatement = require('./serviceStatements');
const { scryfallAutocomplete, getCardsFromChcollector } = require('./api');
const parseQoh = require('./parseQoh');

const PREFIX = '!inv';

const createMessageLine = ({ foilQty, nonfoilQty, set_name }) => {
    return `In stock: ${nonfoilQty} nonfoil, ${foilQty} foil from _${set_name}_`;
}

const transformDataIntoMessage = cards => {
    const messages = cards.map(d => {
        const { foilQty, nonfoilQty } = parseQoh(d.qoh);
        const { set_name } = d;

        return createMessageLine({ foilQty, nonfoilQty, set_name });
    });

    return messages.join('\n');
}

client.once('ready', () => {
    console.log('Ready to go!');
});

client.on('message', async message => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);

    const userTitle = args.join(' ');

    try {
        const titleChoices = await scryfallAutocomplete(userTitle);
        const titlePick = titleChoices[0];

        if (!titlePick) {
            await message.channel.send(`We couldn't find any cards matching **${userTitle}**. Sorry!`);
            return;
        }

        console.log(`User query: ${userTitle}, Title picked: ${titlePick}`);

        await message.channel.send(`You searched for **${titlePick}**. _${randomStatement()}_`);

        const cards = await getCardsFromChcollector(titlePick);

        if (cards.length === 0) {
            await message.channel.send('None in stock...sorry about that');
            return;
        }

        await message.channel.send(transformDataIntoMessage(cards));
    } catch (err) {
        console.log(err);
    }
})

client.login(process.env.TOKEN);