const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const http = require('http');
const server = http.createServer(app);
app.set('view engine','ejs');
app.set('views',path.resolve(__dirname+'/views'));
app.use('/css',express.static(path.resolve(__dirname+'/assets/css')))
app.use('/js',express.static(path.resolve(__dirname+'/assets/js')))
app.use(bodyparser.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.render('index')
})


const io = require('socket.io')(server);
var users ={}
io.on('connection',(socket)=>{ 
    socket.on('user-joined',(username)=>{
        users[socket.id] = username;
        socket.broadcast.emit('user-connected',username);
        io.emit('user-list',users);
        console.log(users);
    })

    socket.on('message',user=>{
        socket.broadcast.emit('message',user);
    })

    socket.on('disconnect',()=>{
        socket.broadcast.emit('user-disconnected',user=users[socket.id]);
        delete users[socket.id];
        io.emit('user-list',users);
        console.log(users);
    })
})

server.listen(3585,()=>{
    console.log("App is running on port 3585")
})