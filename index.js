const express = require("express")
const BetterQueue = require("better-queue")
const venom = require("venom-bot");
const sendMessage = require("./sendMessage");
const app = express();

let messageQueue = null

const initBot = () => {
    venom
        .create(
            "1_session", () => {}, () => {},
            { folderNameToken: 'tokens' }
        )
        .then((client) => {
            messageQueue = new BetterQueue(sendMessage(client))
        })
        .catch((erro) => { 
            console.log(erro);
        });
}

app.use(express.json())

app.post("/messages", (request, response) => {
    const body = request.body;
    messageQueue.push(body);
    response.sendStatus(201);
})

app.listen(4500, () => {
    console.log("Server is running port 4500")
    initBot()
})