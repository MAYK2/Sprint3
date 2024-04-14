fetch('https://moviestack.onrender.com/api/movies', {
    headers: {
        'X-Api-Key': '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd'
    }
})
    .then(res => res.json())
    .then(data => {
        const peliculas = data.movies; // Obtener las películas de la API
        const favoritos = localStorage.getItem('favoritos') ? JSON.parse(localStorage.getItem('favoritos')): [] // Obtener los IDs de las películas favoritas del localStorage

        // Filtrar las películas favoritas
        const peliculasFavoritas = peliculas.filter(pelicula => favoritos.includes(pelicula.id));

        // Renderizar las películas favoritas en la página
        const favoritosContainer = document.getElementById('favoritosContainer');
        favoritosContainer.innerHTML = ''; // Limpiar el contenedor antes de renderizar

        peliculasFavoritas.forEach(pelicula => {
            // Generar el HTML para cada película favorita
            const peliculaHTML = `
            <div class="pelicula-favorita p-4 text-center flex justify-center items-center flex-col border border-black w-full sm:w-1/2 md:w-1/3 lg:w-1/3">
        <img src="https://moviestack.onrender.com/static/${pelicula.image}" alt="${pelicula.title}" class="pelicula-imagen">
        <div class="pelicula-info text-white italic">
            <h2 class="pelicula-titulo text-white">${pelicula.title}</h2>
            <p class="pelicula-resumen text-white">${pelicula.overview}</p>
            <a href="${pelicula.homepage}" class="pelicula-enlace text-gray-500 hover:text-blue-700 text-xl font-bold uppercase mt-2 inline-block hover:underline">Más información</a>
        </div>
    </div>
        
        `;
            favoritosContainer.innerHTML += peliculaHTML;
        });
    })
    .catch(err => console.log(err));
