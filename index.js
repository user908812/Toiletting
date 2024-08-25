const express = require('express');
const app = express();
const path = require('path');
const port = 2137;

const http = require('http');
const {Server} = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);
app.use(express.static(path.resolve("")));

app.get("/", (req, res) => {
    return res.sendFile("index.html")
});

server.listen(port, () => {
    console.log(`Port connected to ${port}.`);
});