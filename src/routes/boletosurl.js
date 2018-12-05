//este archivo se encarga de el comportamiento de la aplicacion (controladores MVC)
/*Permite comunicar el modelo con el back-end, consultar datos modificar datos, eliminar datos, leer datos
ademas de definir las operaciones mediante las urls que vamos a dar en el servidor
https://otroespacioblog.wordpress.com/2013/05/22/conoce-un-poco-sobre-los-metodos-http-en-rest/ */
const express = require('express');
const router = express.Router();
const boletos =  require('../models/ticket')//modelo almacenado en constante para hacer consulta a la base de datos


//Obtiene schema boletos o todos los documentos boletos
router.get('/',async(req,res)=>{
    const  ticket  =   await boletos.find()//consulta a la db
    .then(()=>{
        res.send.json(ticket);
    })
    .catch((err)=>{
        console.log(err); 
    })
});
//obtiene un unico boleto
router.get('/:id',async(req,res)=>{
    const ticket = await boletos.findById(req.params.id)
    .then(()=>{
        res.send.json(ticket);
    })
    .catch((err)=>{
       console.log(err);
    })
});
//Ingresa schema boleto
router.post('/',async(req,res)=>{
    const {
        Empresa,
        Asiento,
        Origen,
        Destino,
        Fecha,
        Abordaje,
        Salida,
        Condiciones_Legales,
        Cod_QR} = req.body;//cliente envia documento al servidor
    const boleto = new boletos({
        Empresa,
        Asiento,
        Origen,
        Destino,
        Fecha,
        Abordaje,
        Salida,
        Condiciones_Legales,
        Cod_QR});
    await boleto.save()
    .then(()=>{res.json({status: 'boleto registrado exitosamente'});})
    .catch((err)=>{
        console.log(err);
    })
    //respuesta del servidor
});
//Actualiza schema boleto
router.put('/:id',async(req,res)=>{
    const{
        Empresa,
        Asiento,
        Origen,
        Destino,
        Fecha,
        Abordaje,
        salida,
        Condiciones_Legales,
        Cod_QR
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
        Cod_QR
    });
    await boletos.findByIdAndUpdate(req.params.id, newboleto)//actualiza a la base de datos
    .then(()=>{
        res.json({status:'Boleto Actualizado'});
    })
    .catch((err)=>{
        console.log(err); 
    })
});
//Elimina  boleto
router.delete('/:id',async(req,res)=>{
    await boletos.findByIdAndRemove(req.params.id)//actualiza a la base de datos
    .then(()=>{
        res.json({status:'Boleto Eliminado'});
    })
    .catch((err)=>{
        console.log(err);
    })
});
module.exports = router;
