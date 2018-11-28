//este archivo permite conectarse a MONGODATABASE NO-SQL, este documento es llamado por indexserver.js(Servidor)
//https://otroespacioblog.wordpress.com/2013/05/22/conoce-un-poco-sobre-los-metodos-http-en-rest/
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true })
    .then(db => console.log('DB is connected, animo mi amor <3 las computadoras te amamos'))
    .catch(err =>console.error(err)); 
   