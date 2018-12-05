// archivo que forma parte de la defincion del esquema de la base de datos.
const mongoose = require('mongoose');
const {Schema} = mongoose;

const ticketschema = new Schema({
    Empresa : {type: String, required:true},
    Asiento: {type:String,required:true},
    Origen:  {type:String,required:true},
    Destino: {type:String,required:true},
    Fecha:   {type:String,required:true},
    Abordaje:{type:String,required:true},
    Salida:  {type:String,required:true},
    Condiciones_Legales:{type: String, required:true},
    Cod_QR:{type:String,require:false}
})
module.exports = mongoose.model('ticket', ticketschema);
