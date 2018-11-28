//este archivo se encarga de el comportamiento de la aplicacion (controladores MVC)
/*Permite comunicar el front-end con el back-end, consultar datos modificar datos, eliminar datos, leer datos
ademas de definir las operaciones mediante las urls que vamos a dar en el servidor */
const express = require('express');
const router = express.Router();
const boletos =  require('../models/task')//modelo almacenado en constante para hacer consulta a la base de datos
/*
let promise = Promise((resolve, reject)=>{});promise a implementar en el futuro
 */
router.get('/',async(req,res)=>{
      const  ticket  =   await boletos.find();//consulta a la db
      res.json(ticket + 'boleto en pantalla');//repuesta de la db
});
router.get('*',(req,res)=>{
    res.send('lo sentimos la pagina no existe')
});

module.exports = router;
