const { rejects } = require('assert');
const fs = require('fs');

class Archivo {
    constructor(nombre) {
        this.nombre = nombre;
    }
    async guardar(title, price, thumbnail) {
        try {
            const data = await fs.promises.readFile(`./${this.nombre}`, 'utf8')
            const arrayProductos = JSON.parse(data);
            arrayProductos.push({
                id: arrayProductos.length + 1,
                title: title,
                price: price,
                thumbnail: thumbnail
            });
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(arrayProductos, null, '\t'));

        } catch (error) {
            throw error;
        }
    }
    async leer() {
        let contenido = []
        try {
            contenido = await fs.promises.readFile(`./${this.nombre}`, 'utf8')
            console.log(contenido);
        } catch (error) {
            console.log(contenido);
            throw error
        }
    }

    async borrar() {
        try {
            await fs.promises.unlink(`./${this.nombre}`, 'utf8')
        } catch (error) {
            throw error;
        }
    }

}

let archivo1 = new Archivo("productos.txt");

archivo1.guardar("Producto test", 8, "www.test.com")
    .then(data => { console.log("Se guardó correctamente el producto") })
    .catch(error => { console.log("Error al guardar el archivo") })

archivo1.leer()
    .then(data => { console.log("Se pudo leer el archivo correctamente") })
    .catch(error => { console.log("Error al leer el archivo") })

archivo1.borrar()
    .then(data => { console.log("Se pudo borrar el archivo correctamente") })
    .catch(error => { console.log("Error al borrar el archivo") })