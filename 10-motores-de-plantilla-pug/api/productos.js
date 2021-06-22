// Product constructor
class Products {

    constructor() {
        this.items = []
    }

    addProduct(product) {
        const newItem = {
            id: this.items.length + 1,
            ...product
        }
        this.items.push(newItem)
        console.log(this.items);
        return newItem
    }

    viewAll() {
        return this.items;
    }

    viewByID(id) {
        return this.items.find(prod => prod.id === Number(id));
    }

    updateProduct(id, product) {
        const productoIndex = this.items.findIndex(p => p.id == id)
        if (productoIndex === -1) {
            throw new Error('producto no encontrado')
        }
        const productoActualizado = {
            id: id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail
        }

        this.items[productoIndex] = productoActualizado;

        return productoActualizado
    }

    deleteProduct(id) {
        const itemToDelete = this.items.find(prod => prod.id === Number(id));

        this.items.splice(itemToDelete.id - 1, 1);
        return itemToDelete;
    }

}

module.exports = new Products()