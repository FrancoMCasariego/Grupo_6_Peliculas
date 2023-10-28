const api_key = "api_key=78d991126ffe36d8e5a86072b85d5d2c";


// cantidadPeliculas: cantidad de peliculas a mostrar, 1 a 20.
// tipo puede ser: "now_playing", "upcoming", "popular" o "top_rated"
// id; id del contenedor


const mostrarPeliculas = async(cantidadPeliculas, tipo, id) => {

    const url = "https://api.themoviedb.org/3/movie/" + tipo + "?api_key=78d991126ffe36d8e5a86072b85d5d2c&language=es-MX";
    
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


        document.getElementById(id).innerHTML = peliculas;

    };


mostrarPeliculas(20, "now_playing", "contenedor_inicio");

mostrarPeliculas(3, "popular", "contenedor_peliculas");

mostrarPeliculas(5, "upcoming", "contenedor_proximamente");