//archivo principal EXPRESS NODEJS que levanta el sistema. inicializa el servidor.
const express = require('express');
const app = express();
const morgan = require('morgan');//este modulo se utiliza como middleware (use)
<<<<<<< HEAD
const path = require('path'); //permite parsear directiorios segun el sistema operativo


=======
>>>>>>> parent of 1596bab... Control de Cambios 02 comunicacion con Index.html
//Settings
app.set('port', process.env.PORT || 1989 );//pocess.env.P... permite pasar el puerto de una nunbe si la hay.
//Middlewares
app.use(morgan('dev'));
app.use(express.json());//fundamental para permitir recibir y enviar json data desde server.
//Routes
<<<<<<< HEAD
app.use('/api/boletos',require('./routes/tasksurl'));


=======
app.use('/',require('./routes/tasksurl'));
>>>>>>> parent of 1596bab... Control de Cambios 02 comunicacion con Index.html
//Static files

// up-server
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')} levantado!!`);
});