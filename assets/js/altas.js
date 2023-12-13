/// cargar formulario


const queryString = window.location.search; // Obtener la query string de la URL
const urlParams = new URLSearchParams(queryString); // Obtener los parámetros de la query string

console.log(urlParams)

const idpelicula = urlParams.get('idpelicula'); // Obtener el id pelicula
const poster = urlParams.get('imagen')

console.log(idpelicula)
// Carga info


const idtmbd = document.querySelector(".idtmdb");
idtmbd.value = idpelicula;


const imagen = document.querySelector(".imagen");
imagen.value = poster;


/// cargar formulario en bd

const URL = "http://localhost:4000"
const documento = document.getElementById('agregarPelicula');

documento.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(documento); // Obtener los datos del formulario

    // formData.append('imagen', documento.imagen.files[0]); // Agregar la imagen al formulario
    try {
        
   
    fetch(URL + '/peliculas/' + idpelicula, { // Enviar los datos al servidor
        method: 'PUT', // Metodo de envio
        body: formData // Los datos del formulario
    })
     .then(res => res.json()) // Convertir la respuesta a JSON
     .then(data => { // Mostrar los datos en consola
        console.log(data);
        alert('Se voto correctamente');
        window.location.href = '../index.html' // Redireccionar a index.html
    })
} catch (error) {
        console.log(error)
}

})