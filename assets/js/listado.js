const URL = "http://localhost:4000"



fetch(URL + '/usuario') // Obtener los productos
    .then(res => res.json()) // Convertir la respuesta a JSON
    .then(data => { // Mostrar los datos en consola
       let html = ''; // Variable para guardar el HTML
console.log(data);

       data.forEach(element => {

        html = html + `<tr>
            <td>${element.id}</td>
            <td>${element.nombre}</td>
            <td>${element.email}</td>
            <td>${element.pasword}</td>
            <td><a href="./modificar.html?codigo=${element.id}">Modificar</a></td>
            <td><button class="alert" onclick="eliminar(${element.id});">Eliminar</button></td>
        </tr>`;
       });

       document.getElementById('usuarios').innerHTML = html;
    });


function eliminar(id){

    fetch(URL + '/usuario/' + id, { // Hago la petición a la API para eliminar el producto
        method: 'DELETE' // Indico el método HTTP
    }).then(res => res.json()) // Convierto la respuesta a JSON
    .then(data => {
        console.log(data); // Muestro los datos en consola
        alert('Usuario eliminado: ' + id); // Muestro un mensaje al usuario
        window.location.reload(); // Recargo la página
    });


}