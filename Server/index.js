// CONFIGURACION PARA LA CREACION DEL SERVIDOR
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('Client')); //TODO HTML QUE HAYA EN LA CARPETA PUBLIC VA A SER HTML ESTATICO Y CARGARA EL HTML

app.get('/hola-mundo',function(req, res){
    res.status(200).send('Hola mundo desde una ruta');
})

var messages = [{
    id:1,
    text: 'Bienvenido al chat privado',
    nickname: 'Bot - ArnolRT'
}]

io.on('connection',function(socket){
    console.log("El nodo con IP: "+socket.handshake.address+" se ha conectado");

    socket.emit('messages',messages);

    socket.on('add-message',function(data){
        messages.push(data);

        io.sockets.emit('messages',messages);
    });
})

// CREACION DEL SERVIDOR EN MODO ESCUCHA
server.listen(6677,function(){
    console.log('servidor funcionando en http://localhost:6677');
});

