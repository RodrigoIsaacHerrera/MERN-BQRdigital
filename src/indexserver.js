//archivo principal EXPRESS NODEJS que levanta el sistema. inicializa el servidor.
const express = require('express');
const app = express();
const morgan = require('morgan');//este modulo se utiliza como middleware (use)
const path = require('path'); //permite parsear directiorios segun el sistema operativo


//Settings
app.set('port', process.env.PORT || 1989 );//pocess.env.P... permite pasar el puerto de una nunbe si la hay.
//Middlewares
app.use(morgan('dev'));
app.use(express.json());//fundamental para permitir recibir y enviar json data desde server.
//Routes
app.use('/api/boletos',require('./routes/tasksurl'));

//Static files

// up-server
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')} levantado!!`);
});