export function crearSelects() {
    let select = document.getElementById('select');
    const generos = ['Horror', 'Mystery', 'Thriller', 'Action', 'Drama', 'Adventure', 'Crime', 'Fantasy', 'Comedy', 'Animation', 'Family', 'Romance', 'Science Fiction', 'History'];

    generos.forEach(genero => {
        const option = document.createElement('option');
        option.value = genero;
        option.text = genero;
        select.appendChild(option);
    });
}



export function inputBusqueda(peliculas) {
    let idBusqueda
    let selectGenero
    const limpiarContenedor = (moviesContainer) => {
        moviesContainer.innerHTML = '';
    };

    const filtrarPeliculas = () => {
        idBusqueda = document.getElementById('busqueda');
        selectGenero = document.getElementById('select');
        let moviesContainer = document.getElementById('contenedor-peliculas');

        const textoBusqueda = idBusqueda.value.toLowerCase();
        const generoSeleccionado = selectGenero.value.toLowerCase();

        limpiarContenedor(moviesContainer);

        peliculas.forEach(pelicula => {
            const tituloEnMinusculas = pelicula.title.toLowerCase();
            const generosEnMinusculas = pelicula.genres.map(genre => genre.toLowerCase());

            if ((tituloEnMinusculas.includes(textoBusqueda) || textoBusqueda === '') &&
                (generoSeleccionado === 'géneros' || generosEnMinusculas.includes(generoSeleccionado))) {
                const card = document.createElement('div');
                card.classList.add('w-64', 'h-96', 'mx-4', 'my-4', 'flex', 'flex-col');
                card.innerHTML = `
                <div class="bg-white shadow-md rounded-lg overflow-hidden flex-grow relative">
                <div id="contenedor-peliculas" class="flex flex-wrap justify-center py-8">
                    <img class="w-full object-cover" src="https://moviestack.onrender.com/static/${pelicula.image}" alt="${pelicula.title}">
                    <div class="p-4 flex flex-col">
                        <h3 class="text-xl font-medium mb-2 w-200">${pelicula.title}</h3>
                        <p class="text-gray-700">${pelicula.overview.substring(0, 100)}...<a href="../details/details.html?id=${pelicula.id}"><button class="underline">Ver más</button></a></p>
                        <div class="absolute bottom-0 right-0 mb-4 mr-4">
                            <!-- Corazón -->
                            <button class="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black rounded-full transition duration-300 heart-button"  data-pelicula-id="${pelicula.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21.562l-1.822-1.622C5.088 15.097 2 12.35 2 8.5 2 5.42 4.42 3 7.5 3c1.797 0 3.462.905 4.5 2.25C13.038 3.905 14.703 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.85-3.088 6.597-8.178 11.44L12 21.562z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
          `;
                moviesContainer.appendChild(card);
            }
        });
    };

    filtrarPeliculas();
    idBusqueda = document.getElementById('busqueda');
    idBusqueda.addEventListener('input', filtrarPeliculas);

    selectGenero = document.getElementById('select');
    selectGenero.addEventListener('change', filtrarPeliculas);
}

export let agregarFavoritos = function (){
    const heartButtons = document.querySelectorAll('.heart-button');
    
    heartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const peliculaId = button.dataset.peliculaId;
            toggleFavorito(peliculaId);
            actualizarColorCorazon(button, peliculaId);
        });
    });

    // Verificar y actualizar el color del corazón al cargar la página
    heartButtons.forEach(button => {
        const peliculaId = button.dataset.peliculaId;
        actualizarColorCorazon(button, peliculaId);
    });
}

function toggleFavorito(peliculaId) {
    let favoritos = localStorage.getItem('favoritos') ? JSON.parse(localStorage.getItem('favoritos')) : [];
    const index = favoritos.indexOf(peliculaId);

    if (index !== -1) {
        favoritos.splice(index, 1);
    } else {
        favoritos.push(peliculaId);
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

function actualizarColorCorazon(corazon, peliculaId) {
    let favoritos = localStorage.getItem('favoritos') ? JSON.parse(localStorage.getItem('favoritos')) : [];
    const enFavoritos = favoritos.includes(peliculaId);
    
    if (enFavoritos) {
        corazon.classList.add('text-red-500'); // Agregar color rojo si está en favoritos
    } else {
        corazon.classList.remove('text-red-500'); // Eliminar color rojo si no está en favoritos
    }
}


export let crearEstructura = function (pelicula) {
    let main = document.getElementById('detalles')
    let div = `<section id="imagenDetalles" class="flex flex-col text-2xl gap-10 my-5">
    <img src="https://moviestack.onrender.com/static/${pelicula.image}">
    <table class="border-white border-2 w-[50%] mx-auto">
        <tr class="border">
            <td class="border-r border-white">Original languaje</td>
            <td class="border-l border-white">${pelicula.original_language}</td>
        </tr>
        <tr class="border">
            <td class="border-r border-white">release date</td>
            <td class="border-l border-white">${pelicula.release_date}</td>
        </tr>
        <tr class="border">
            <td class="border-r border-white">runtime</td>
            <td class="border-l border-white">${pelicula.runtime} mins</td>
        </tr>
        <tr class="border">
            <td class="border-r border-white">status</td>
            <td class="border-l border-white">${pelicula.status}</td>
        </tr>
    </table>
</section>
<section id="DescriptionVentas" class="text-white  flex flex-col justify-center items center gap-5 text-center text-2xl w-1/2">
    <h1>Titulo:${pelicula.title}</h1>
    <h2>"${pelicula.tagline}"</h2>
    <h3>Genres: ${pelicula.genres}</h3>
    <p class="px-10 py-5">${pelicula.overview}</p>
    <table class="border-white border-2 w-[50%] mx-auto">
        <tr class="border">
            <td class="border-r border-white">vote average</td>
            <td class="border-l border-white">${pelicula.vote_average}%</td>
        </tr>
        <tr class="border">
            <td class="border-r border-white">budget</td>
            <td class="border-l border-white">USD ${pelicula.budget.toLocaleString()}</td>
        </tr>
        <tr class="border">
            <td class="border-r border-white">revenue</td>
            <td class="border-l border-white">USD ${pelicula.revenue.toLocaleString()}</td>
        </tr>
    </table>
</section>`
    main.innerHTML = div;
}


