const appDetalles = {
    data() {
        return {
            album: {}, // Detalles del álbum cargados desde Local Storage
            cantidad: 1 // Cantidad inicial
        };
    },
    methods: {
        // Cargar detalles del álbum desde Local Storage
        cargarDetalles() {
            const albumGuardado = JSON.parse(localStorage.getItem('detalleAlbum'));
            console.log('Álbum cargado desde Local Storage:', albumGuardado); // Confirmación en consola
            if (albumGuardado) {
                this.album = albumGuardado;
            } else {
                alert('No hay detalles del álbum disponibles.');
                window.location.href = 'index.html';
            }
        },
        // Aumentar cantidad
        aumentarCantidad() {
            if (this.cantidad < 6) this.cantidad++;
        },
        // Disminuir cantidad
        disminuirCantidad() {
            if (this.cantidad > 1) this.cantidad--;
        },
        // Agregar al carrito
        agregarAlCarrito() {
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            const producto = { ...this.album, cantidad: this.cantidad };

            // Verificar si el producto ya está en el carrito
            const index = carrito.findIndex(item => item.collectionId === producto.collectionId);
            if (index > -1) {
                carrito[index].cantidad += this.cantidad; // Incrementar cantidad
            } else {
                carrito.push(producto); // Agregar nuevo producto
            }

            // Guardar carrito actualizado en Local Storage
            localStorage.setItem('carrito', JSON.stringify(carrito));
            alert('Producto agregado al carrito.');
        }
    },
    mounted() {
        this.cargarDetalles();
    }
};

// Crear y montar la aplicación Vue
Vue.createApp(appDetalles).mount('#app');
