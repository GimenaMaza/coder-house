/**
 * productos.js - declaro las rutas asociadas a los productos
 */
const express = require('express');
const router = express.Router();

// instancio el controlador
const Productos = require('../api/productos');
const productos = new Productos();


router.post('/guardar', (req, res) => {
    productos.guardar(req.body.title, req.body.price, req.body.thumbnail);
    return res.json({ estado: 'GUARDADO' });
})

router.get('/listar/:id', (req, res) => {
    const item = products.updateProduct(req.params.id, req.body)
    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'El producto no fue encontrado'
        })
    }

})

router.get('/listar', (req, res) => {
    let listado = productos.getProductos();
    if (listado.length === 0) {
        res.send({ error: "No hay productos cargados" })
    } else {
        return res.json(listado);
    }


})

router.delete('/borrar/:id', (req, res) => {
    return res.json({ estado: 'BORRADO' });

})


/* router.put('/actualizar/:id', (req, res) => {

    let id = req.params.id;
    let actualizar = { title: req.body.title, price: req.body.price, thumbnail: req.body.thumbnail }

    productos = productos.map(p => {
        if (p.id == id) {
            p = Object.assign(p, actualizar);
        }​
        return p;
    })


}) */

module.exports = router;