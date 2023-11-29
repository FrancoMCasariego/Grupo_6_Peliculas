


const appindex = async() => {


	// Carga peliculas en el div carusel
    const url = "https://api.themoviedb.org/3/movie/" + "popular" + "?api_key=78d991126ffe36d8e5a86072b85d5d2c&language=es-MX";
     
    const contenedor = document.querySelector(".carousel");
    
    const frag = document.createDocumentFragment();
    
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

        for (let i = 0; i < 10; i++) {
            let pelicula = datos.results[i];
            console.log(pelicula)

            const div = document.createElement("div");
            div.classList.add("pelicula");

            const img = document.createElement("img");
            img.src = "https://image.tmdb.org/t/p/w500/" + pelicula.poster_path;

            const anc = document.createElement("a");
            anc.href = "./pages/peli.html?idpelicula=" + pelicula.id;

            div.append(anc);
            anc.append(img)
            frag.append(div)   
        };
    contenedor.append(frag);

};

appindex();



	// 			manejar flechas y indicadores

	const fila = document.querySelector('.contenedor-carousel');
	const peliculas = document.querySelectorAll('.pelicula');

	const flechaIzquierda = document.getElementById('flecha-izquierda');
	const flechaDerecha = document.getElementById('flecha-derecha');

	// ? ----- ----- Event Listener para la flecha derecha. ----- -----
	flechaDerecha.addEventListener('click', () => {
		fila.scrollLeft += fila.offsetWidth;

		const indicadorActivo = document.querySelector('.indicadores .activo');
		if(indicadorActivo.nextSibling){
			indicadorActivo.nextSibling.classList.add('activo');
			indicadorActivo.classList.remove('activo');
		}
	});

	// ? ----- ----- Event Listener para la flecha izquierda. ----- -----
	flechaIzquierda.addEventListener('click', () => {
		fila.scrollLeft -= fila.offsetWidth;

		const indicadorActivo = document.querySelector('.indicadores .activo');
		if(indicadorActivo.previousSibling){
			indicadorActivo.previousSibling.classList.add('activo');
			indicadorActivo.classList.remove('activo');
		}
	});

	// ? ----- ----- Paginacion ----- -----
	const numeroPaginas = Math.ceil(peliculas.length / 5);
	for(let i = 0; i < numeroPaginas; i++){
		const indicador = document.createElement('button');

		if(i === 0){
			indicador.classList.add('activo');
		}

		document.querySelector('.indicadores').appendChild(indicador);
		indicador.addEventListener('click', (e) => {
			fila.scrollLeft = i * fila.offsetWidth;

			document.querySelector('.indicadores .activo').classList.remove('activo');
			e.target.classList.add('activo');
		});
	}

	// ? ----- ----- Hover ----- -----
	peliculas.forEach((pelicula) => {
		pelicula.addEventListener('mouseenter', (e) => {
			const elemento = e.currentTarget;
			setTimeout(() => {
				peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
				elemento.classList.add('hover');
			}, 300);
		});
	});

	fila.addEventListener('mouseleave', () => {
		peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
	});

// };

// appindex();