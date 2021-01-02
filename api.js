const axios = require('axios');

const scryfallAutocomplete = async (title) => {
    try {
        const { data } = await axios.get(
            'https://api.scryfall.com/cards/autocomplete',
            {
                params: { q: decodeURI(title) },
            }
        );

        return data.data; // Scryfall's res is data, on top of previous data...
    } catch (err) {
        console.log(err);
    }
};

const getCardsFromChcollector = async (title) => {
    const { data } = await axios.get(process.env.FETCH_CARDS_TEST, {
        params: { matchInStock: true, title: title, location: 'ch1' },
    });

    return data;
};

module.exports.scryfallAutocomplete = scryfallAutocomplete;
module.exports.getCardsFromChcollector = getCardsFromChcollector;
