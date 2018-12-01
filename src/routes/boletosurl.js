//este archivo se encarga de el comportamiento de la aplicacion (controladores MVC)
/*Permite comunicar el modelo con el back-end, consultar datos modificar datos, eliminar datos, leer datos
ademas de definir las operaciones mediante las urls que vamos a dar en el servidor
https://otroespacioblog.wordpress.com/2013/05/22/conoce-un-poco-sobre-los-metodos-http-en-rest/ */
const express = require('express');
const router = express.Router();
const boletos =  require('../models/ticket')//modelo almacenado en constante para hacer consulta a la base de datos
/*let promise = Promise((resolve, reject)=>{});promise a implementar en el futuro*/

//Obtiene schema boletos o todos los documentos boletos
router.get('/',async(req,res)=>{
    const  ticket  =   await boletos.find();//consulta a la db
    res.json(ticket);//repuesta de la db
});
//obtiene un unico boleto
router.get('/:id',async(req,res)=>{
    const ticket = await boletos.findById(req.params.id);
    res.json(ticket);
});
//Ingresa schema boleto
router.post('/',async(req,res)=>{
    const {
        Empresa,
        Origen,
        Destino,
        Fecha,
        Abordaje,
        Salida,
        Condiciones_Legales} = req.body;//cliente envia documento al servidor
    const boleto = new boletos({
        Empresa,
        Origen,
        Destino,
        Fecha,
        Abordaje,
        Salida,
        Condiciones_Legales});
    await boleto.save();
    res.json({status: 'boleto registrado exitosamente'});//respuesta del servidor
});
//Actualiza schema boleto
router.put('/:id',async(req,res) => {
    const{
        Empresa,
        Origen,
        Destino,
        Fecha,
        Abordaje,
        salida,
        Condiciones_Legales
    } = req.body;
    const newboleto = ({
        Empresa,
        Origen,
        Destino,
        Fecha,
        Abordaje,
        salida,
        Condiciones_Legales
    });
    await boletos.findByIdAndUpdate(req.params.id, newboleto);//actualiza a la base de datos
    res.json({status:'Boleto Actualizado'})
});
//Elimina schema boleto
router.delete('/:id',async(req,res)=>{
    await boletos.findByIdAndRemove(req.params.id);//actualiza a la base de datos
    res.json({status:'Boleto Eliminado'})
});

module.exports = router;
