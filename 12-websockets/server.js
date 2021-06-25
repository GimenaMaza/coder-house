const express = require('express');
const app = express();
const http = require('http');

const server = http.Server(app);
const io = require('socket.io')(server);

const handlebars = require('express-handlebars');
const Productos = require('./api/productos');

let items = new Productos();

// establecemos la configuración de handlebars
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'vista.hbs',
    })
);

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// definimos las rutas http
const router = express.Router();
app.use('/api', router);

/* -------------------- HTTP endpoints ---------------------- */

// TODO completar con lo realizado en entregas anteriores
router.get('/productos/listar', (req, res) => {
    const productos = items.listarAll();
    if (productos.length > 0) {
        res.json(productos)
    } else {
        res.json({
            error: 'No hay productos cargados'
        })
    }
})

router.get('/productos/listar/:id', (req, res) => {
    const item = items.listar(req.params.id)
    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'El producto no fue encontrado'
        })
    }
})

router.post('/productos/guardar', (req, res) => {
    items.guardar(req.body);
    res.redirect('/');
    console.log(items);
})

router.put('/productos/actualizar/:id', (req, res) => {
    const item = items.actualizar(req.params.id, req.body)
    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'El producto no fue encontrado'
        })
    }
})

router.delete('/productos/borrar/:id', (req, res) => {
    let idProduct = req.params.id;
    const item = items.borrar(idProduct);
    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'El producto no fue encontrado'
        })
    }
})

router.get('/productos/vista', (req, res) => {
    let prods = items.listarAll();

    res.render("vista", {
        productos: prods,
        hayProductos: prods.length
    });
});

/* -------------------- Web Sockets ---------------------- */

io.on('connection', socket => {
    console.log("¡Nuevo cliente conectado!");
    socket.emit('productos', items.get());
    socket.on('update', data => {
        if (data = 'ok') {
            io.sockets.emit('productos', items.get());
        }
    })

});

/* ------------------------------------------------------- */

const PORT = 8000;

const srv = server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

srv.on("error", error => console.log(`Error en servidor ${error}`))