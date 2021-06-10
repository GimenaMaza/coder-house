const express = require('express');
const productos = require('./api/productos');


// creo una app de tipo express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('./api/productos/guardar', (req, res) => {
    return res.json({ estado: 'GUARDADO' });
})

app.get('./api/productos/listar', (req, res) => {
        /* let arrayProductos = productos.getProductos();
        console.log('esto hay en el array' + arrayProductos) */
        /* let arrayProductos = productos;
        console.log(arrayProductos); */
        let arrayProductos = productos.getProductos();
        return res.json(arrayProductos);

    })
    // pongo a escuchar el servidor en el puerto indicado
const puerto = 8000;

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});