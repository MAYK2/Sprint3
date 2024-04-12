import { crearSelects, inputBusqueda } from "../function.js"; 
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
crearSelects();
inputBusqueda(peliculas);
console.log(peliculas);
})
.catch(err => console.log(err))

