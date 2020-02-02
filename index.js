const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');


app.get('/',function(req,res){
    res.render('index.ejs');
});

app.use(express.static(path.join(__dirname,'public')));

const server = http.listen(8080,function(){
    console.log("listening on port: 8080");
});


io.on('connection',function(socket){
   
    socket.on('username',function(username){
        socket.username = username;
        io.emit('is_online','<i>'+socket.username+' joined the chat</i>');
    })

    console.log("user connected");
    socket.on('disconnect',function(){
        console.log('user diconnected');
    });
    
    socket.on('chat_message',function(msg,sender){
        if(msg!=''){
            console.log(socket.username);
             let message = '<strong>'+socket.username+'<strong>'+':'+'<i>'+msg+'<i>';
             io.emit('chat_message',message,sender);
        }
    })
    socket.on('typing',function(username){
        console.log(username+' typing');
    });

   
});


