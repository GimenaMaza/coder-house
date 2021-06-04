const express = require('express');
const productos = require('./api/productos');

// creo una app de tipo express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// completar el codigo...


// pongo a escuchar el servidor en el puerto indicado
const puerto = 8000;

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});