/**
 * productos.js - declaro las rutas asociadas a los productos
 */
const express = require('express');
const router = express.Router();

// instancio el controlador
const items = require('../api/productos');

router.get('/productos/listar', (req, res) => {

    const productos = items.viewAll();
    if (productos.length > 0) {
        res.json(productos)
    } else {
        res.json({
            error: 'No hay productos cargados'
        })
    }
    console.log('listado de items');
    console.log(items);
})

router.get('/productos/listar/:id', (req, res) => {

    const item = items.viewByID(req.params.id)
    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'El producto no fue encontrado'
        })
    }
    console.log(' items por id');
    console.log(items);
})

router.post('/guardar', (req, res) => {
    items.addProduct(req.body);
    res.redirect('/');
})


router.put('/productos/actualizar/:id', (req, res) => {
    const item = items.updateProduct(req.params.id, req.body)
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
    const item = items.deleteProduct(idProduct);
    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'El producto no fue encontrado'
        })
    }
    console.log('delete')
    console.log(items);
})

module.exports = router;