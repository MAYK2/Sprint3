import { agregarFavoritos, crearSelects, inputBusqueda } from "../function.js"; 
var peliculas;
fetch('https://moviestack.onrender.com/api/movies',
{
    headers:{
        'X-Api-Key': '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd'
    }
})
.then(res => res.json())
.then(data => {
   peliculas = data.movies
   console.log(peliculas);
crearSelects();
inputBusqueda(peliculas);
agregarFavoritos()
})
.catch(err => console.log(err))


    