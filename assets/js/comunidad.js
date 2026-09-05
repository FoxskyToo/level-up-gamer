const publicaciones = [

    {
        id: 1,
        tipo: "Noticia",
        titulo: "Nuevas tendencias en el mundo gamer",
        resumen:
            "Conoce algunas de las tendencias que están marcando la experiencia de los jugadores y el desarrollo de nuevos productos."
    },

    {
        id: 2,
        tipo: "Guía",
        titulo: "Cómo elegir un mouse gamer",
        resumen:
            "Revisa los aspectos más importantes que debes considerar al momento de elegir un mouse para jugar."
    },

    {
        id: 3,
        tipo: "Consejo",
        titulo: "Mejora tu espacio de juego",
        resumen:
            "Una buena distribución del escritorio, iluminación y ergonomía puede hacer una gran diferencia durante largas sesiones."
    },

    {
        id: 4,
        tipo: "Guía",
        titulo: "Qué considerar al elegir una silla gamer",
        resumen:
            "Comodidad, soporte lumbar, ajustes y materiales son algunos de los factores importantes al momento de elegir."
    },

    {
        id: 5,
        tipo: "Noticia",
        titulo: "La comunidad gamer continúa creciendo",
        resumen:
            "Cada vez más jugadores participan en actividades, eventos y comunidades relacionadas con videojuegos."
    },

    {
        id: 6,
        tipo: "Consejo",
        titulo: "Mantén tus periféricos en buenas condiciones",
        resumen:
            "La limpieza y mantención periódica de mouse, teclado y audífonos puede ayudar a prolongar su vida útil."
    }

];


function mostrarPublicaciones(lista) {

    const contenedor =
        document.getElementById("contenedorPublicaciones");

    const cantidad =
        document.getElementById("cantidadPublicaciones");


    cantidad.textContent =
        `${lista.length} publicacion${lista.length !== 1 ? "es" : ""}`;


    if (lista.length === 0) {

        contenedor.innerHTML = `
            <div class="col-12">

                <div class="levelup-panel p-5 text-center">

                    <h3 class="h5 mb-3">
                        No encontramos publicaciones
                    </h3>

                    <p class="text-secondary mb-0">
                        Prueba cambiando el texto de búsqueda o el tipo de contenido.
                    </p>

                </div>

            </div>
        `;

        return;

    }


    contenedor.innerHTML =
        lista.map(publicacion => `

            <div class="col-md-6 col-lg-4">

                <article class="community-card h-100 p-4">

                    <span class="badge community-badge mb-3">
                        ${publicacion.tipo}
                    </span>

                    <h3 class="h5 mb-3">
                        ${publicacion.titulo}
                    </h3>

                    <p class="text-secondary mb-4">
                        ${publicacion.resumen}
                    </p>

                    <button
                        class="btn btn-levelup-blue btn-sm"
                        onclick="leerPublicacion(${publicacion.id})">

                        Leer más

                    </button>

                </article>

            </div>

        `).join("");

}


function filtrarPublicaciones() {

    const texto =
        document
            .getElementById("buscarPublicacion")
            .value
            .toLowerCase()
            .trim();


    const tipo =
        document
            .getElementById("tipoPublicacion")
            .value;


    const filtradas =
        publicaciones.filter(publicacion => {

            const coincideTexto =
                publicacion.titulo
                    .toLowerCase()
                    .includes(texto)
                ||
                publicacion.resumen
                    .toLowerCase()
                    .includes(texto);


            const coincideTipo =
                !tipo ||
                publicacion.tipo === tipo;


            return coincideTexto && coincideTipo;

        });


    mostrarPublicaciones(filtradas);

}


function leerPublicacion(id) {

    const publicacion =
        publicaciones.find(
            item => item.id === id
        );


    if (!publicacion) {
        return;
    }


    alert(
        `${publicacion.titulo}\n\n${publicacion.resumen}`
    );

}


document
    .getElementById("buscarPublicacion")
    .addEventListener(
        "input",
        filtrarPublicaciones
    );


document
    .getElementById("tipoPublicacion")
    .addEventListener(
        "change",
        filtrarPublicaciones
    );


document
    .getElementById("btnFiltrarComunidad")
    .addEventListener(
        "click",
        filtrarPublicaciones
    );


mostrarPublicaciones(publicaciones);