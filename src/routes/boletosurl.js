//este archivo se encarga de el comportamiento de la aplicacion (controladores MVC)
/*Permite comunicar el modelo con el back-end, consultar datos modificar datos, eliminar datos, leer datos
ademas de definir las operaciones mediante las urls que vamos a dar en el servidor
https://otroespacioblog.wordpress.com/2013/05/22/conoce-un-poco-sobre-los-metodos-http-en-rest/ */
const express = require('express');
const router = express.Router();
const boletos =  require('../models/ticket')//modelo almacenado en constante para hacer consulta a la base de datos


//Obtiene schema boletos o todos los documentos boletos
router.get('/',async(req,res)=>{
    try {
        const  ticket  =   await boletos.find()//consulta a la db
        res.json(ticket);
    } catch (error) {
        console.log(error);
    }
});
//obtiene un unico documento boleto
router.get('/:id',async(req,res)=>{
    try {
        const ticket = await boletos.findById(req.params.id);
        res.json(ticket);
    } catch (error) {
        console.log(error);  
    }   
});
//Ingresa schema boleto
router.post('/',async(req,res)=>{
    try {
        const {
            Empresa,
            Asiento,
            Origen,
            Destino,
            Fecha,
            Abordaje,
            Salida,
            Condiciones_Legales,
            Cod_QR,
            Tarifa} = req.body;//cliente envia documento al servidor
        const boleto = new boletos({
            Empresa,
            Asiento,
            Origen,
            Destino,
            Fecha,
            Abordaje,
            Salida,
            Condiciones_Legales,
            Cod_QR,
            Tarifa});
        await boleto.save();
        res.json({status: 'boleto registrado exitosamente'});//respuesta del servidor
    } catch (error) {
        console.log(error);  
    } 
});
//Actualiza schema boleto
router.put('/:id',async(req,res)=>{
    try {
        const{
            Empresa,
            Asiento,
            Origen,
            Destino,
            Fecha,
            Abordaje,
            salida,
            Condiciones_Legales,
            Cod_QR,
            Tarifa
        } = req.body;
        const newboleto = ({
            Empresa,
            Asiento,
            Origen,
            Destino,
            Fecha,
            Abordaje,
            salida,
            Condiciones_Legales,
            Cod_QR,
            Tarifa
        });
        await boletos.findByIdAndUpdate(req.params.id, newboleto)//actualiza a la base de datos
        res.send({status:'Boleto Actualizado'})
    } catch (error) {
        console.log(error); 
    }
    
});
//Elimina  boleto
router.delete('/:id',async(req,res)=>{
    try {
        await boletos.findByIdAndRemove(req.params.id)//actualiza a la base de datos    
        res.json({status:'Boleto Eliminado'});
    } catch (error) {
        console.log(error);
    }
    
    
});
module.exports = router;
