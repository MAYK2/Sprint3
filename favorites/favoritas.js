fetch('https://moviestack.onrender.com/api/movies', {
    headers: {
        'X-Api-Key': '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd'
    }
})
.then(res => res.json())
.then(data => {
    const peliculas = data.movies; // Obtengo las películas de la API
    const favoritos = localStorage.getItem('favoritos') ? JSON.parse(localStorage.getItem('favoritos')) : [] // Obtener los IDs de las películas favoritas del localStorage

    // Función para renderizar las películas favoritas en la página
    function renderizar() {
        const peliculasFavoritas = peliculas.filter(pelicula => favoritos.includes(pelicula.id));
        const favoritosContainer = document.getElementById('favoritosContainer');
        favoritosContainer.innerHTML = ''; // Limpio el contenedor antes de renderizar

        if (peliculasFavoritas.length === 0) {
            favoritosContainer.innerHTML = '<p class= "text-xl italic">"No hay nada en favoritos"</p>'
        } else {
            peliculasFavoritas.forEach(pelicula => {
                // Generar el HTML para cada película favorita
                const peliculaHTML = `
                <div class="pelicula-favorita p-4 text-center flex justify-center items-center flex-col border border-black w-full sm:w-1/2 md:w-1/3 lg:w-1/3">
                <img src="https://moviestack.onrender.com/static/${pelicula.image}" alt="${pelicula.title}" class="pelicula-imagen">
                <div class="pelicula-info text-white italic">
                <h2 class="pelicula-titulo text-white">${pelicula.title}</h2>
                <p class="pelicula-resumen text-white">${pelicula.overview}</p>
                <a href="${pelicula.homepage}" class="pelicula-enlace text-gray-500 hover:text-blue-700 text-xl font-bold uppercase mt-2 inline-block hover:underline">Más información</a>
                <button class="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black rounded-full transition duration-300 heart-button" data-pelicula-id="${pelicula.id}">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block align-middle text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21.562l-1.822-1.622C5.088 15.097 2 12.35 2 8.5 2 5.42 4.42 3 7.5 3c1.797 0 3.462.905 4.5 2.25C13.038 3.905 14.703 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.85-3.088 6.597-8.178 11.44L12 21.562z"/>
                </svg>
                </button>
                
                </div>
                </div>
                
                `;
                favoritosContainer.innerHTML += peliculaHTML;
            });

            // Vincular eventos de clic a los botones de corazón después de renderizar las películas favoritas
            alternarFavorito();
        }
    }

    // Función para manejar los clics en los botones de corazón
    function alternarFavorito() {
        const heartButtons = document.querySelectorAll('.heart-button');
        heartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const peliculaId = button.dataset.peliculaId;
                const index = favoritos.indexOf(peliculaId);
                if (index !== -1) {
                    favoritos.splice(index, 1);
                }
                localStorage.setItem('favoritos', JSON.stringify(favoritos));
                renderizar();
            });
        });
    }

    // Renderizar las películas favoritas al cargar la página
    renderizar();
})
.catch(err => console.log(err));
