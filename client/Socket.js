const socket = io(document.URL);

const singleplayer = $("#singleplayer");
const multiplayer = $("#multiplayer");

const menu = $(".menu");

singleplayer.click(() => {
    menu.hide();
});

multiplayer.click(() => {
    socket.emit("multiplayer");

    $(".menu p").text("Waiting for players...");
});

socket.on("play", (e) => {
    myteam = e.team;
    mode = MODE_MULTIPLAYER;
    reset();
    menu.hide();
});

socket.on("boardcast", (e) => {
    addCoin(e.col);
    swapTeam();
});

function boardcast(msg) {
    socket.emit("boardcast", msg);
}