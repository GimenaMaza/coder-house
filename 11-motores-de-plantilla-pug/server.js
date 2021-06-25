const express = require('express');
const products = require('./api/productos');
const router = express.Router();
const handlebars = require('express-handlebars');

// App Express
const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Settings

app.set('views', './views');
app.set('view engine', 'pug');


// Routes
app.get('/', (req, res) => {
    const productos = products.viewAll()
    console.log('productos', productos)
    if (productos.length > 0) {
        res.render('tabla', { productos: products.viewAll(), productsExists: true })
    } else {
        res.render('tabla', { productos: products.viewAll(), productsExists: false })
    }
})

app.use('/api', router);



// Server
const PORT = 4000;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on('error', (error) => {
    console.log('Error en el servidor ', error)
})