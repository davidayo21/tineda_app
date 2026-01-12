//IMportar la libreria para crear aplicaciones web
const express = require('express');

//Crear una instancia de express (aplicacion principla)
const app = express();

//DEfinir un puerto sobre el cual funciona la aplicacion
const PORT = 3000;

//Crear la primera "ruta" cuando el usuario ingrese a la raiz de nuestra app.
app.get('/',(req, res) => {
res.send('<h1>Servidor de E-commerce Inicado </h1><p>NPM y Expressfuncionando! </p>')
});

//
app.listen(PORT,() =>{
    console.log(`>>> Servidor corriendo en http://localhost:${PORT}`);
    console.log( `>>> Presione Ctrl + c para detener)`);
});