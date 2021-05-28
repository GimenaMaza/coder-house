/**
 * Desafio Entregable
 * 
 * Desarrollar un servidor en nodejs que con cada requerimiento devuelva como
 * resultado un objeto con ciertos valores aleatorios.
 */
const http = require('http');

function obtenerRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function obtenerRandomDecimales(min, max) {
    return (Math.random() * (max - min)) + min;
}

function dosDecimales(n) {
    let t = n.toString();
    let regex = /(\d*.\d{0,2})/;
    return t.match(regex)[0];
}

const server = http.createServer((peticion, respuesta) => {
    // completar con la logica requerida
    var id = obtenerRandom(1, 11);
    var title = obtenerRandom(1, 11);
    var price = dosDecimales(obtenerRandomDecimales(0.00, 9999.99));
    var thumbnail = obtenerRandom(1, 11);
    let objeto = {
        id: id,
        title: "Producto " + title,
        price: price,
        thumbnail: "Foto " + thumbnail
    }
    respuesta.end(JSON.stringify(objeto))
});

server.listen(8000, function() {
    console.log(`Servidor escuchando en http://localhost:${this.address().port}`);
});