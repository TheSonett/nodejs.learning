import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const PORT = 3000;
const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket)=> {
    console.log(`User connected, ${socket.id}`);

    socket.emit("welcome", `Welcome to the server, ${socket.id}`);
    socket.broadcast.emit("welcome", `${socket.id} has joined the channel!`);

    socket.on('disconnect', ()=> {
        console.log(`User disconnected! ${socket.id}`);
    });

    socket.on('message', ({message, room})=> {
        console.log({message, room});
        socket.to(room).emit("receive-msg", message);
    });
});


app.get("/", (req, res)=> {
    res.send("<h1>Server is Ready!</h1>");
});

server.listen(PORT, ()=> {
    console.log(`Server is running on port: ${PORT}`);
});