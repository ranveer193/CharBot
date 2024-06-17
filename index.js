const exp = require("constants");
const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const PORT = 1000;
const io = new Server(server);
 
io.on("connection", (socket) => {

    socket.on("user-join", (username) => {
        this.username = username;
        socket.broadcast.emit("user-join", this.username);
    });

    socket.on("chat-message", (data) => {
        socket.broadcast.emit("message",data);
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit("user-leave",this.username);
    });

})

app.get("/", (req, res) => {
    res.sendFile(path.resolve("./public/index.html"));
})

app.use(express.static(path.resolve("/public")));

server.listen(PORT, () => {
    console.log("Server Started!");
});