const express = require('express');
const {Server} = require("socket.io");

const http = require("http");

const app = express();

const server = http.createServer(app);

const io = new Server(server);


//Static Folder
app.use(express.static("public"));


const PORT = process.env.PORT || 3000;



server.listen(PORT,()=>{
    console.log(`Server is Running on port ${PORT}`);
});


// Setup Websocket
io.on("connection",(socket)=>{
    console.log(`User Connected ${socket.id}`);
    
    //Listening
    socket.on("disconnect",()=>{
        console.log(`User disconnected`);
    });
    socket.on("chat-message", data => {
        io.sockets.emit("chat-message",data);
    });
});


