//archivo principal EXPRESS NODEJS que levanta el sistema. inicializa el servidor y sus modulos
const express = require('express');
const app = express();
const morgan = require('morgan');//este modulo se utiliza como middleware (use)
const path = require('path'); //permite parsear directiorios segun el sistema operativo
const { mongoose } = require('./database');//llamado a archivo indexserver.js

//Settings
app.set('port', process.env.PORT || 1989 );//pocess.env.P... permite pasar el puerto de una nunbe si la hay.
//Middlewares
app.use(morgan('dev'));//configuracion de middleware morgan.
app.use(express.json());//fundamental para permitir recibir y enviar formato documento json.
//Routes
app.use('/api/boletos',require('./routes/boletosurl'));
//Static files
app.use(express.static(path.join(__dirname,'public')));//indica donde estara el codgi standart(html,css,js)
// up-server
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')} levantado!!`);
});