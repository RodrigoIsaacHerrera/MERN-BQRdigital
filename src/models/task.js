// archivo que forma parte de la defincion del esquema de la base de datos.
const mongoose = require('mongoose');
const {Schema} = mongoose;

const taskschema = new Schema({
    title : {type: String, required:true},
    description: {type: String, required:true},
})
module.exports = mongoose.model('task', taskschema);
