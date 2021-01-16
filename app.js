const Express = require("express");
const Ip = require("ip");

const app = Express();

const IP = Ip.address(), PORT = 80;

app.use(Express.static(__dirname + "/client/"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/index.html");
});

app.listen(PORT, IP, () => { console.log(`Server listen to ${IP}:${PORT}`); })