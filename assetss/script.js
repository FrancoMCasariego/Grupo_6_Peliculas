let cargarMas = document.querySelector ('#cargar-mas');
let currentItem = 4;

cargarMas.onclick = () => {
    let boxes = [...document.querySelectorAll(
        '.box-container .box-1'
    )];
    for (var i = currentItem; i< currentItem + 4; i++) {
        boxes[i].style.display = 'block';
    }
    currentItem +=4;
    if (currentItem >= boxes.length) {
        cargarMas.style.display = 'none'
    }
}