//archivo que permite conectarse a MONGODATABASE NO-SQL, este documento es llamado por index.js(Servidor)
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true })
    .then(db => console.log('DB is connected'))
    .then(err =>console.error(err)); 
   