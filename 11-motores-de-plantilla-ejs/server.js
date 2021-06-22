const express = require('express');
const products = require('./api/productos');
const router = express.Router();

// App Express
const app = express();

// Settings
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', './views');
app.set('view engine', 'ejs');


// Routes
app.get('/', (req, res) => {
    const items = products.viewAll()
    res.render('formulario', { items: items, mensaje: 'No hay productos' });
});

router.post('/productos/guardar', (req, res) => {

    products.addProduct(req.body)

    res.redirect('/');
})

app.get('/productos/vista', (req, res) => {

    const items = products.viewAll()
    console.log(items)
    if (items.length > 0) {
        res.render('vista', { items: products.viewAll(), productsExists: true })
    } else {
        res.render('vista', { items: products.viewAll(), productsExists: false })
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
const PORT = 4040;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on('error', (error) => {
    console.log('Error en el servidor ', error)
})