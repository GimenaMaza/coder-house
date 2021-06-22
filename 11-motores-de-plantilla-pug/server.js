const express = require('express');
const products = require('./api/productos');
const router = express.Router();
const handlebars = require('express-handlebars');

// App Express
const app = express();

// Settings

app.set('views', './views');
app.set('view engine', 'pug');


// Routes
app.get('/', (req, res) => {
    const productos = products.viewAll()
    console.log(productos)
    if (productos.length > 0) {
        res.render('formulario', { productos: products.viewAll(), productsExists: true })
    } else {
        res.render('formulario', { productos: products.viewAll(), productsExists: false })
    }
})

app.use('/api', router);

router.get('/productos/listar', (req, res) => {

    const items = products.viewAll()
    if (items.length > 0) {
        res.json(items)
    } else {
        res.json({
            error: 'No hay productos cargados'
        })
    }
})

router.get('/productos/listar/:id', (req, res) => {

    const item = products.viewByID(req.params.id)

    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'El producto no fue encontrado'
        })
    }
})

router.post('/productos/guardar', (req, res) => {

    products.addProduct(req.body)

    res.redirect('/productos/vista');
})

router.put('/productos/actualizar/:id', (req, res) => {
    const item = products.updateProduct(req.params.id, req.body)
    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'El producto no fue encontrado'
        })
    }
})

router.delete('/productos/borrar/:id', (req, res) => {
    const item = products.deleteProduct(req.params.id)

    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'El producto no fue encontrado'
        })
    }
})

// Server
const PORT = 4000;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on('error', (error) => {
    console.log('Error en el servidor ', error)
})