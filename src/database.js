//este archivo permite conectarse a MONGODATABASE NO-SQL, este documento es llamado por indexserver.js(Servidor)

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true })
    .then(db => console.log('DB is connected, animo mi amor <3 las computadoras te amamos'))
    .catch(err =>console.error(err)); 
   