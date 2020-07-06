const statements = [
    "Coming right up!",
    "Coming right up!",
    "Coming right up!",
    "Coming right up!",
    "Coming right up!",
    "Here we go!",
    "Serving you some fresh cardboard.",
    "Mmm...that new pack smell.",
    "Let the brewing begin!",
    "EDHREC's got nothing on us.",
    "Your opponents won't know what hit em!",
    "Let's do this!",
    "Pronto!",
    "Excelsior!"
];

const randomStatement = () => statements[Math.floor(Math.random() * statements.length)];

module.exports = randomStatement;