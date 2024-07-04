const express = require("express")
const http = require("http")
const path = require("path")
const socket = require("socket.io");
const { isLocalStorageAvailable } = require("web3modal");

const app = express();
const server = http.createServer(app)
const io = socket(server);

app.set("view engine" ,"ejs")
app.use(express.static('public'));
app.set(express.static(path.join(__dirname,"public")))
app.get("/", (req, res) => {
  res.render("index")
});

io.on("connection",(socket)=>{

  socket.on("send-location",(data)=>{
    io.emit("recieve-location",{id:socket.id,...data})
  });

  socket.on("disconnect",()=>{
    io.emit("user-disconnected", socket.id)
  })
  console.log("io connected")
})

server.listen(3000, );
