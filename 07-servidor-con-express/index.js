/**
 * ejemplo de un servidor http con express
 */

const express = require('express');
const fs = require('fs');
const { get } = require('http');

// creo una app de tipo express
const app = express();

const puerto = 4000;

let contVisitasRandom = 0;
let contVisitasItems = 0;

app.get('/items', (req, res) => {
    contVisitasItems++;
    const data = fs.readFileSync(`./productos.txt`, 'utf-8');
    const arrayProductos = JSON.parse(data);
    res.json({
        items: arrayProductos,
        cantidad: arrayProductos.length
    });
});

app.get('/item-random', (req, res) => {
    contVisitasRandom++;
    const data = fs.readFileSync(`./productos.txt`, 'utf-8');
    const arrayProductos = JSON.parse(data);
    let numeroAleatorio = Math.floor(Math.random() * arrayProductos.length)
    let producto = arrayProductos[numeroAleatorio];
    res.json({ item: producto });
});

app.get('/visitas', (req, res) => {
    res.json({
        "visitas": {
            items: contVisitasItems,
            item: contVisitasRandom
        }

    });
});




// pongo a escuchar el servidor en el puerto indicado
const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});