const appCarrito = {
    data() {
        return {
            carrito: [] // Productos en el carrito
        };
    },
    computed: {
        subtotal() {
            return this.carrito.reduce((sum, producto) => sum + producto.collectionPrice * producto.cantidad, 0);
        },
        iva() {
            return this.subtotal * 0.16;
        },
        total() {
            return this.subtotal + this.iva;
        },
        totalArticulos() {
            return this.carrito.reduce((sum, producto) => sum + producto.cantidad, 0);
        }
    },
    methods: {
        cargarCarrito() {
            const carritoStorage = localStorage.getItem('carrito');
            this.carrito = carritoStorage ? JSON.parse(carritoStorage) : [];
        },
        actualizarCantidad(producto, cambio) {
            const index = this.carrito.findIndex(p => p.collectionId === producto.collectionId);
            if (index > -1) {
                this.carrito[index].cantidad += cambio;
                if (this.carrito[index].cantidad <= 0) {
                    this.carrito.splice(index, 1);
                }
                localStorage.setItem('carrito', JSON.stringify(this.carrito));
            }
        },
        eliminarProducto(producto) {
            const index = this.carrito.findIndex(p => p.collectionId === producto.collectionId);
            if (index > -1) {
                this.carrito.splice(index, 1);
                localStorage.setItem('carrito', JSON.stringify(this.carrito));
            }
        },
        vaciarCarrito() {
            if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
                this.carrito = [];
                localStorage.removeItem('carrito');
            }
        }
    },
    mounted() {
        this.cargarCarrito();
    }
};

Vue.createApp(appCarrito).mount('#app');
