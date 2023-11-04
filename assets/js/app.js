// const api_key = "api_key=78d991126ffe36d8e5a86072b85d5d2c";
// cantidadPeliculas: cantidad de peliculas a mostrar, 1 a 20.
// tipo puede ser: "now_playing", "upcoming", "popular" o "top_rated"
// id; id del contenedor

const mostrarPeliculas = async() => {
    const url = "https://api.themoviedb.org/3/movie/" + "upcoming" + "?api_key=78d991126ffe36d8e5a86072b85d5d2c&language=es-MX";
    
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

        for (let i = 0; i < 20; i++) {
            let pelicula = datos.results[i];
            let idPelicula = pelicula.id;
            posterTituloPelicula(idPelicula);
            videoPelicula(idPelicula);
        };
};

const posterTituloPelicula = async(idPelicula) => {
    const div = document.createElement("div");
    div.className = "poster"
    const frag = document.createDocumentFragment();
    try {
        const url = "https://api.themoviedb.org/3/movie/" + idPelicula + "?api_key=78d991126ffe36d8e5a86072b85d5d2c&language=es-MX";
            
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        const img = document.createElement("img");
        img.src = "https://image.tmdb.org/t/p/w342/" + datos.poster_path;

        const txt = document.createElement("h3");
        txt.textContent = datos.title;

        div.append(img);
        div.append(txt);
        frag.append(div);
        contenedor_peliculas.append(frag);
    } catch (error) {
    };
};

const videoPelicula = async(idPelicula) => {
    const div = document.createElement("div");
    div.className = "video"
    const url = "https://api.themoviedb.org/3/movie/" + idPelicula + "/videos?api_key=78d991126ffe36d8e5a86072b85d5d2c";
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        let ultimo = datos.results.length - 1;
        const key = datos.results[ultimo].key;
        const video = document.createElement("iframe");
        video.src = "https://www.youtube.com/embed/" + key;
        div.append(video);
        contenedor_peliculas.append(div);
    } 
    catch (error) {
    };
};

mostrarPeliculas();
// videoPelicula(507089);
// posterTituloPelicula(507089);