const Express = require("express");
const Ip = require("ip");
const Socket = require("socket.io");

const app = Express();

const IP = Ip.address(), PORT = 80;

app.use("/", Express.static(__dirname + "/client/"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/index.html");
});

const server = app.listen(PORT, IP, () => { console.log(`Listening to ${IP}:${PORT}`); })
const io = Socket(server);

let sockets = [];

let players = [];
let spectators = [];

io.on("connection", (socket) => {
    let id = registerID(socket);
    
    socket.on("disconnect", (e) => {
        for (let i = 0; i < players.length; i++)
            if (players[i] == id) { players.splice(i); break; }

            
        for (let i = 0; i < spectators.length; i++)
            if (spectators[i] == id) { spectators.splice(i); break; }

        sockets.splice(id);
    });

    socket.on("multiplayer", () => {
        if (players.length < 2) {
            for (p of players)
                if (p == id) return;
            
                players.push(id);
        }
        else spectators.push(id);

        if (players.length == 2) {
            
            console.log(players);

            for (let i = 0; i < players.length; i++) {
                sockets[players[i]].emit("play", { team: i + 1 });
            }
        }
    });

    socket.on("boardcast", (e) => {
        for (p of players) {
            sockets[p].emit("boardcast", e);
        }
    });
});

function boardcast(key, val) {
    for (s of sockets) {
        if (s != undefined)
            s.emit(key, val);
    }
}

function registerID(socket) {
    let id = (Math.random() * 100).toFixed(0)
    
    if (sockets[id] == undefined) {
        sockets[id] = socket;
        return id;
    } else return registerID(socket);
}