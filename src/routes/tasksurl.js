//este archivo se encarga de el comportamiento de la aplicacion (controladores MVC)
/*Permite comunicar el front-end con el back-end, consultar datos modificar datos, eliminar datos, leer datos
ademas de definir las operaciones mediante las urls que vamos a dar en el servidor */
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.json({
        status: 'hOMe page json format',
    });
});
router.get('*',(req,res)=>{
    res.send('lo sentimos la pagina no existe')
});

module.exports = router;
