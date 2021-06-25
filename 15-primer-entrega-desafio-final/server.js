const express = require('express');
/* const productos = require('./api/productos'); */
/* const routerProductos = express.Router(); */


// creo una app de tipo express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// protejo el servidor ante cualquier excepcion no atrapada
app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Algo se rompio!');
});

const router = require('./routes/productos');
app.use('/api/productos', router);
// pongo a escuchar el servidor en el puerto indicado
const puerto = 8000;

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});


module.exports = server;