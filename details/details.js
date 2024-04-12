import{ crearEstructura} from "../function.js";

let peliculas;
fetch('https://moviestack.onrender.com/api/movies',
    {
        headers: {
            'X-Api-Key': '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd'
        }
    })
    .then(res => res.json())
    .then(data => {
        peliculas = data.movies
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get('id');
        const pelicula = peliculas.find(pelicula => pelicula.id === movieId);
        crearEstructura(pelicula)
        console.log(peliculas);
    })
    .catch(err => console.log(err))








