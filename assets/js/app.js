const api_key = "api_key=78d991126ffe36d8e5a86072b85d5d2c";
const url = "https://api.themoviedb.org/3/movie/popular?api_key=78d991126ffe36d8e5a86072b85d5d2c&language=es-MX";

const mostrarPeliculas = async(cantidadPeliculas) => {
    
    const respuesta = await fetch(url);
    const datos = await respuesta.json();


    let peliculas = "";
    let poster = "";
    let titulo = "";

    for (let i = 0; i < cantidadPeliculas; i++) {
        let pelicula = datos.results[i];
        peliculas += `
            <div class="pelicula">
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                <h3 class="titulo">${pelicula.title}</h3>
            </div>
            `;
        };


        document.getElementById("contenedor").innerHTML = peliculas;

    };


mostrarPeliculas(3);