/// cargar formulario
const url = window.location.href;
const idpelicula = url.split("=")[1].split("&")[0];
const poster = url.split("=")[2];
console.log(url)
console.log("id =" + idpelicula)
console.log("imagen =" + poster)
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

    fetch(URL + '/peliculas', { // Enviar los datos al servidor
        method: 'POST', // Metodo de envio
        body: formData // Los datos del formulario
    })
     .then(res => res.json()) // Convertir la respuesta a JSON
     .then(data => { // Mostrar los datos en consola
        console.log(data);
        alert('Pelicula agregada correctamente');
        window.location.href = '../index.html' // Redireccionar a index.html
    })

})