const URL = "http://localhost:4000"

const queryString = window.location.search; // Obtener la query string de la URL
const urlParams = new URLSearchParams(queryString); // Obtener los parámetros de la query string

const id = urlParams.get('codigo'); // Obtener el código del producto

console.log(codigo)

fetch(URL + '/usuario/' + id) // Obtener el producto
.then(res => res.json()) // Convertir la respuesta a JSON
.then(data => { // Mostrar los datos en consola
    console.log(data);
    document.getElementById('codigo').value = data.id;
    document.getElementById('nombre').value = data.nombre;
    document.getElementById('email').value = data.email;
    document.getElementById('password').value = data.password;
});

const documento = document.getElementById('formulario');

documento.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(documento); // Obtener los datos del formulario

    fetch(URL + '/usuario/' + id, { // Enviar los datos al servidor
        method: 'PUT', // Metodo de envio
        body: formData // Los datos del formulario
    })
     .then(res => res.json()) // Convertir la respuesta a JSON
     .then(data => { // Mostrar los datos en consola
        console.log(data);
        alert('Usuario modificado correctamente');
        window.location.reload(); // Recargar la página
    })
})