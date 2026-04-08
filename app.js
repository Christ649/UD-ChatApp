const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const server =  http.createServer(app);

//servir vos fichier statiques
app.use(express.static(__dirname));
app.get('/',(req,res)=> {
    res.sendFile(__dirname + '/Acceuil.html');
});
app.get('aide',(req,res)=> {
    res.sendFile(__dirname + '/aide.html');
});
app.get('profil',(req,res)=> {
    res.sendFile(__dirname + '/profil.html');
});
app.get('chatapp',(req,res)=> {
    res.sendFile(__dirname + '/chatapp.html');
});
const io = new Server(server);
io.on('connection',(socket) => {
    console.log('Un utilisateur est connecte :' + socket.id);
    //ecouter quand quelqu'un envoie un message
    socket.on('chat message',(data) => {
        //Renvoyer le message a tout le monde
        io.emit('chat message',data);

    });
    socket.on('disconnect',() =>{
        console.log('Utilisateur deconnecte');
    });
});
const PORT = process.env.port || 8080;
server.listen(PORT,() => {
    console.log(`serveur lance sur le port ${PORT}`);
})