module.exports = (clientZapBot) => {
    return async function (input, cb) {
        await clientZapBot.sendText(`${input.phone}@c.us`, input.text)
        cb(null);
    }
}