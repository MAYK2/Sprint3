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
            <div class="bg-white shadow-md rounded-lg overflow-hidden flex-grow">
              <img class="w-full h-40 object-cover" src="https://moviestack.onrender.com/static/${pelicula.image}" alt="${pelicula.title}">
              <div class="p-4">
                <h3 class="text-xl font-medium mb-2">${pelicula.title}</h3>
                <p class="text-gray-700">${pelicula.overview.substring(0, 100)}...<a href="../details/details.html?id=${pelicula.id}"><button class="underline">Ver más</button></a></p>
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


export let crearEstructura = function(pelicula){
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


