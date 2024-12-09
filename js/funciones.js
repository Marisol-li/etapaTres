const appIndex = {
    data() {
        return {
            categorias: [
                { nombre: 'Rock', artistas: ['Nirvana', 'Queen', 'Pink Floyd'] },
                { nombre: 'Rap', artistas: ['Kendrick Lamar', 'Playboi Carti', 'Eminem'] },
                { nombre: 'Pop', artistas: ['Ariana Grande', 'Taylor Swift', 'Michael Jackson'] }
            ],
            artistas: [],
            albumes: [],
            albumesSeleccionados: new Set(),
            buscar: '',
            progreso: 0,
            totalArticulos: 0 // Total de artículos en el carrito
        };
    },
    computed: {
        artistasFiltrados() {
            return this.artistas.filter(artista =>
                artista.toLowerCase().includes(this.buscar.toLowerCase())
            );
        }
    },
    methods: {
        mostrarArtistas(artistas) {
            this.artistas = artistas;
        },
        async buscarAlbumes(nombreArtista) {
            try {
                const url = `https://itunes.apple.com/search?term=${encodeURIComponent(nombreArtista)}&entity=album&limit=8`;
                const response = await axios.get(url);
                this.albumes = response.data.results;

                if (this.albumes.length === 0) {
                    alert('No se encontraron álbumes para este artista.');
                }
            } catch (error) {
                console.error('Error al buscar álbumes:', error);
                alert('Hubo un problema al conectar con la API. Inténtalo más tarde.');
            }
        },
        gestionarAlbum(albumId) {
            if (this.albumesSeleccionados.has(albumId)) {
                this.albumesSeleccionados.delete(albumId);
            } else {
                if (this.albumesSeleccionados.size >= 10) {
                    alert('Solo puedes agregar hasta 10 álbumes.');
                    return;
                }
                this.albumesSeleccionados.add(albumId);
            }
            this.actualizarBarraProgreso();
        },
        verDetalle(album) {
            localStorage.setItem('detalleAlbum', JSON.stringify(album));
            window.location.href = 'detalle.html';
        },
        actualizarBarraProgreso() {
            this.progreso = (this.albumesSeleccionados.size / 10) * 100;
        },
        buscarArtista() {
            if (!this.buscar.trim()) {
                alert('Por favor, ingresa el nombre de tu álbum o artísta.');
                return;
            }
            this.buscarAlbumes(this.buscar);
        },
        cargarCarrito() {
            const carrito = localStorage.getItem('carrito');
            this.totalArticulos = carrito
                ? JSON.parse(carrito).reduce((sum, item) => sum + item.cantidad, 0)
                : 0;
        },
        agregarAlCarrito(album) {
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            const index = carrito.findIndex(item => item.collectionId === album.collectionId);

            if (index > -1) {
                carrito[index].cantidad += 1;
            } else {
                carrito.push({ ...album, cantidad: 1 });
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));
            this.cargarCarrito();
        }
    },
    mounted() {
        this.cargarCarrito();
    }
};

Vue.createApp(appIndex).mount('#app');
