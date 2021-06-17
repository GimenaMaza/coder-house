const express = require('express');
/* const productos = require('./api/productos'); */
/* const routerProductos = express.Router(); */
const handlebars = require('express-handlebars');


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
// configuracion de handlebars en express
app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/'
}));

app.set('view engine', 'hbs');

app.set('views', './views');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { productos: data, hayProductos: true });
});


const router = require('./routes/productos');
app.use('/api/productos', router);
// pongo a escuchar el servidor en el puerto indicado
const puerto = 4000;

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});


module.exports = server;