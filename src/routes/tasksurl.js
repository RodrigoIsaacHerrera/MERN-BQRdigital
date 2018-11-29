//este archivo se encarga de el comportamiento de la aplicacion (controladores MVC)
/*Permite comunicar el front-end con el back-end, consultar datos modificar datos, eliminar datos, leer datos
ademas de definir las operaciones mediante las urls que vamos a dar en el servidor
https://otroespacioblog.wordpress.com/2013/05/22/conoce-un-poco-sobre-los-metodos-http-en-rest/ */
const express = require('express');
const router = express.Router();
const boletos =  require('../models/task')//modelo almacenado en constante para hacer consulta a la base de datos
/*let promise = Promise((resolve, reject)=>{});promise a implementar en el futuro*/

//Obtiene schema boleto
router.get('/',async(req,res)=>{
      const  ticket  =   await boletos.find();//consulta a la db
      res.json(ticket + 'boleto en pantalla');//repuesta de la db
});
//Ingresa schema boleto
router.post('/',async(req,res)=>{
    const {title,description} = req.body;//cliente envia documento al servidor
    const boleto = new boletos({title,description,});
    console.log(boleto);
    res.json('metodo post exitoso (documento creado)');//respuesta del servidor;
});
router.get('*',async(req,res)=>{
    res.json(404,'no tengo este archivo');
});

module.exports = router;
