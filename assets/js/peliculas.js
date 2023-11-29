const appPeliculas = async() => {


	// Carga peliculas
    const url = "https://api.themoviedb.org/3/movie/" + "now_playing" + "?api_key=78d991126ffe36d8e5a86072b85d5d2c&language=es-MX";
     
    const contenedor = document.querySelector(".box-container");
    
    const frag = document.createDocumentFragment();
    
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

        for (let i = 0; i < 20; i++) {
            let pelicula = datos.results[i];
            console.log(pelicula)

            // const divBC = document.createElement("div");
            // divBC.classList.add("box-container");

            const divB = document.createElement("div");
            let box = "box-1"
            divB.classList.add("box-pelicula", box);

            const divC = document.createElement("div");
            divC.classList.add("content");

            const img = document.createElement("img");
            img.src = "https://image.tmdb.org/t/p/w500/" + pelicula.poster_path;

            const anc = document.createElement("a");
            anc.href = "peli.html?idpelicula=" + pelicula.id;

            const tit = document.createElement("p");
            tit.textContent = pelicula.title;

            // divBC.append(divB);
            divB.append(divC);
            divC.append(anc);
            divC.append(tit);
            anc.append(img);
            frag.append(divB);   
        };
    contenedor.append(frag);



    let cargarMas = document.querySelector ('#cargar-mas');
    let currentItem = 4;

    cargarMas.onclick = () => {
        let boxes = document.querySelectorAll(
            '.box-container .box-1'
        );
        for (var i = currentItem; i< currentItem + 4; i++) {
            boxes[i].style.display = 'block';
        }
        currentItem +=4;
        if (currentItem >= boxes.length) {
            cargarMas.style.display = 'none'
        }
    }
};

appPeliculas();
