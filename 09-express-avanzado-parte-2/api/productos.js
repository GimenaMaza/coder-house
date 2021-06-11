class Productos {
    constructor() {
        this.productos = [];
    }

    guardar(title, price, thumbnail) {
        try {
            this.productos.push({
                id: this.productos.length + 1,
                title: title,
                price: price,
                thumbnail: thumbnail
            });


        } catch (error) {
            throw error;
        }
    }

    getProductos() {
        return this.productos;
    }

    listar(id) {
        const producto = this.productos.find(producto => producto.id == id);
        return producto;
    }
}

// exporto una instancia de la clase
module.exports = new Productos();