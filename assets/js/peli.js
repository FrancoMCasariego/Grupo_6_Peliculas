
function obtenerVolor() {
    const url = window.location.href;
    const valor = url.split("=")[1];

    return valor;
};

// Carga info
const infoPeli = async(idpelicula) => {


    const url = "https://api.themoviedb.org/3/movie/" + idpelicula  + "?api_key=78d991126ffe36d8e5a86072b85d5d2c&language=es-MX";

    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    console.log(datos);

    const tit = document.querySelector(".titulo");
    tit.textContent = datos.title;

    const est = document.querySelector(".fecha");
    est.textContent = datos.release_date;

    const gen = document.querySelector(".genero");
    gen.textContent = "Genero";

    const res = document.querySelector(".descripcion");
    res.textContent = datos.overview;
           
};

// Carga video
const cargarVideo = async(idpelicula) => {

    console.log(idpelicula);

	
    const url = "https://api.themoviedb.org/3/movie/" + idpelicula  + "/videos" + "?api_key=78d991126ffe36d8e5a86072b85d5d2c";
     
    const divv = document.querySelector(".video");
    
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    console.log(datos)

    let ind = datos.results.length - 1;
    let key = datos.results[ind].key;
    divv.src = "https://www.youtube.com/embed/" + key;

};

let id = obtenerVolor();

infoPeli(id);
cargarVideo(id);

