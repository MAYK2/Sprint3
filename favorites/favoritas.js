const moviesData = [
    {
        image: "../Recursos Moviestack/fastandfurious2.jpg",
        description: "Acción desenfrenada en las calles con Vin Diesel y Paul Walker.",
        alt: "RapidosyFuriosos2"
    },
    {
        image: "../Recursos Moviestack/karatekid.jpg",
        description: "Un maestro de artes marciales enseña a un joven los secretos del karate y la vida.",
        alt: "Imagen de karate kid"
    },
    {
        image: "../Recursos Moviestack/2012movie.jpeg",
        description: "Un épico desastre global y una lucha por la supervivencia en el año 2012.",
        alt: "Imagen pelicula 2012"
    },
    {
        image: "../Recursos Moviestack/terminator.jpeg",
        description: "Un ciborg del futuro es enviado al pasado para cambiar el curso de la historia.",
        alt: "Imagen de terminator"
    },
    {
        image: "../Recursos Moviestack/colateral.jpeg",
        description: "Un taxista se encuentra en medio de una noche de asesinato y caos en Los Ángeles.",
        alt: "Imagen de tom Cruise en colateral"
    }
];


const moviesContainer = document.getElementById('movies-container');
moviesContainer.classList.add('flex', 'flex-wrap');

moviesData.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('w-1/3', 'px-2', 'mb-4');

    const image = document.createElement('img');
    image.src = movie.image;
    image.alt = movie.alt;
    image.classList.add('w-full', 'h-80', 'object-fit', 'mb-4');

    const description = document.createElement('p');
    description.textContent = movie.description;
    description.classList.add('text-gray-300');

    card.appendChild(image);
    card.appendChild(description);

    moviesContainer.appendChild(card);
});