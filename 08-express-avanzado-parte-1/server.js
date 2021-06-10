const express = require('express');
const productos = require('./api/productos');


// creo una app de tipo express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/productos/guardar', (req, res) => {
    productos.guardar(req.body.title, req.body.price, req.body.thumbnail);
    return res.json({ estado: 'GUARDADO' });
})

app.get('/api/productos/listar/:id', (req, res) => {
    let id = req.params.id;
    let producto = productos.listar(id);
    res.json(producto)
})

app.get('/api/productos/listar', (req, res) => {
        let listado = productos.getProductos();
        return res.json(listado);

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