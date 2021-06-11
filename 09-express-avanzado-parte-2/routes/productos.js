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
    let id = req.params.id;
    let producto = productos.listar(id);
    if (producto == null) {
        res.send({ error: "Producto no encontrado" })
    } else {
        res.json(producto)
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

module.exports = router;