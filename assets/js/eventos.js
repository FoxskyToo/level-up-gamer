const eventos = [

    {
        id: 1,
        nombre: "Torneo Level-Up Santiago",
        ciudad: "Santiago",
        region: "Metropolitana",
        fecha: "18 de octubre de 2026",
        descripcion:
            "Torneo presencial con competencias, actividades para la comunidad y premios.",
        puntos: 500
    },

    {
        id: 2,
        nombre: "Encuentro Gamer Valparaíso",
        ciudad: "Valparaíso",
        region: "Valparaíso",
        fecha: "7 de noviembre de 2026",
        descripcion:
            "Jornada gamer con torneos, exhibiciones y espacios para compartir con otros jugadores.",
        puntos: 300
    },

    {
        id: 3,
        nombre: "Festival Esports Concepción",
        ciudad: "Concepción",
        region: "Biobío",
        fecha: "21 de noviembre de 2026",
        descripcion:
            "Evento dedicado a esports, competencias y actividades para jugadores de distintos niveles.",
        puntos: 450
    }

];


function mostrarEventos(lista) {

    const contenedor =
        document.getElementById("contenedorEventos");

    const cantidad =
        document.getElementById("cantidadEventos");


    cantidad.textContent =
        `${lista.length} evento${lista.length !== 1 ? "s" : ""}`;


    if (lista.length === 0) {

        contenedor.innerHTML = `
            <div class="col-12">

                <div class="levelup-panel p-5 text-center">

                    <h3 class="h5 mb-3">
                        No encontramos eventos
                    </h3>

                    <p class="text-secondary mb-0">
                        Prueba modificando la búsqueda o seleccionando otra región.
                    </p>

                </div>

            </div>
        `;

        return;

    }


    contenedor.innerHTML =
        lista.map(evento => `

            <div class="col-md-6 col-lg-4">

                <article class="event-card h-100 p-4">

                    <span class="badge event-region-badge mb-3">
                        ${evento.region}
                    </span>

                    <h3 class="h5 mb-3">
                        ${evento.nombre}
                    </h3>

                    <p class="text-secondary mb-2">
                        ${evento.ciudad}
                    </p>

                    <p class="text-secondary mb-3">
                        ${evento.fecha}
                    </p>

                    <p class="text-secondary">
                        ${evento.descripcion}
                    </p>


                    <div
                        class="d-flex justify-content-between
                               align-items-center mt-4">

                        <span class="event-points">
                            +${evento.puntos} pts
                        </span>

                        <button
                            class="btn btn-levelup-blue btn-sm"
                            onclick="verEvento(${evento.id})">

                            Ver evento

                        </button>

                    </div>

                </article>

            </div>

        `).join("");

}


function filtrarEventos() {

    const texto =
        document
            .getElementById("buscarEvento")
            .value
            .toLowerCase()
            .trim();


    const region =
        document
            .getElementById("regionEvento")
            .value;


    const filtrados =
        eventos.filter(evento => {

            const coincideTexto =
                evento.nombre
                    .toLowerCase()
                    .includes(texto)
                ||
                evento.ciudad
                    .toLowerCase()
                    .includes(texto)
                ||
                evento.descripcion
                    .toLowerCase()
                    .includes(texto);


            const coincideRegion =
                !region ||
                evento.region === region;


            return coincideTexto && coincideRegion;

        });


    mostrarEventos(filtrados);

}


function verEvento(id) {

    const evento =
        eventos.find(
            item => item.id === id
        );


    if (!evento) {
        return;
    }


    alert(
        `${evento.nombre}\n\n` +
        `${evento.ciudad} - ${evento.region}\n` +
        `${evento.fecha}\n\n` +
        `${evento.descripcion}\n\n` +
        `Puntos LevelUp: ${evento.puntos}`
    );

}


document
    .getElementById("buscarEvento")
    .addEventListener(
        "input",
        filtrarEventos
    );


document
    .getElementById("regionEvento")
    .addEventListener(
        "change",
        filtrarEventos
    );


document
    .getElementById("btnFiltrarEventos")
    .addEventListener(
        "click",
        filtrarEventos
    );


mostrarEventos(eventos);