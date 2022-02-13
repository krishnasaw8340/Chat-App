const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const port = (process.env.PORT || 5000);
app.use(cors());

// Step 1
const server = http.createServer(app);
// End step 1

const users = [{}];


// Step 3
app.get("/",(req,res)=>{
    res.send("Backend Page is rendering over the Browser")
})
// End step 3

// Step 4
const io = socketIO(server);

io.on("connection",(socket)=>{
    console.log("New Connection");
    socket.on('joined', ({user}) =>{
        users[socket.id] = user;
        console.log(`${user} has joined`);
        socket.broadcast.emit('userJoined',{user:"Admin",message:`${users[socket.id]} has joined`})

        socket.emit('welcome',{user: "Admin", message:`welcome to grp ${users[socket.id]}`})
    })

    socket.on('message',({message,id})=>{

        // io.emit because we send message to the all in circuit
        io.emit('sendMessage',{user:users[id],message,id})
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]} has left`})
        // socket.broadcast.emit('leave',{user:"Admin", message:` ${users[socket.id]} has left`})
        console.log(`${users[socket.id]} has left`);
    })
});
//  End step 4

// Step 2 for checking that server is starting or not
server.listen(port,()=>{
    console.log(`Server is running... ${port}`);
})
// end step 2
