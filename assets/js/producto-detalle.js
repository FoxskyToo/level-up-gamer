const parametros =
    new URLSearchParams(window.location.search);

const codigoProducto =
    parametros.get("codigo");


let productos =
    JSON.parse(
        localStorage.getItem("productosLevelUp")
    ) || [];


let carrito =
    JSON.parse(
        localStorage.getItem("carritoLevelUp")
    ) || [];


let resenas =
    JSON.parse(
        localStorage.getItem("resenasLevelUp")
    ) || [];


const producto =
    productos.find(
        item => item.codigo === codigoProducto
    );


function formatoPrecio(precio) {

    return Number(precio)
        .toLocaleString("es-CL");

}


function cargarProducto() {

    if (!producto) {

        document.querySelector("main").innerHTML = `
            <div class="levelup-panel p-5 text-center">

                <h2 class="mb-3">
                    Producto no encontrado
                </h2>

                <p class="text-secondary mb-4">
                    El producto solicitado no existe o fue eliminado.
                </p>

                <a
                    href="catalogo.html"
                    class="btn btn-levelup">

                    Volver al catálogo

                </a>

            </div>
        `;

        return;

    }


    document.getElementById("productoNombre").textContent =
        producto.nombre;


    document.getElementById("productoCategoria").textContent =
        producto.categoria;


    document.getElementById("productoCodigo").textContent =
        `Código: ${producto.codigo}`;


    document.getElementById("productoDescripcion").textContent =
        producto.descripcion ||
        "Sin descripción disponible.";


    document.getElementById("productoPrecio").textContent =
        `$${formatoPrecio(producto.precio)} CLP`;


    if (producto.imagen) {

        const imagen =
            document.getElementById("productoImagen");

        imagen.src =
            producto.imagen;

        imagen.alt =
            producto.nombre;

        imagen.classList.remove("d-none");


        document
            .getElementById("productoSinImagen")
            .classList.add("d-none");

    }

}


function agregarAlCarrito() {

    const existente =
        carrito.find(
            item =>
                item.codigo === producto.codigo
        );


    if (existente) {

        existente.cantidad++;

    } else {

        carrito.push({
            ...producto,
            cantidad: 1
        });

    }


    localStorage.setItem(
        "carritoLevelUp",
        JSON.stringify(carrito)
    );


    actualizarContadorCarrito();

    alert(
        "Producto agregado al carrito."
    );

}


function actualizarContadorCarrito() {

    carrito =
        JSON.parse(
            localStorage.getItem("carritoLevelUp")
        ) || [];


    const cantidad =
        carrito.reduce(
            (total, item) =>
                total + item.cantidad,
            0
        );


    const contador =
        document.getElementById("contadorCarrito");


    if (contador) {

        contador.textContent =
            cantidad;

    }

}


function obtenerResenasProducto() {

    return resenas.filter(
        resena =>
            resena.codigoProducto === codigoProducto
    );

}


function mostrarResenas() {

    const lista =
        obtenerResenasProducto();


    const contenedor =
        document.getElementById("contenedorResenas");


    const promedio =
        document.getElementById("promedioResenas");


    if (lista.length === 0) {

        contenedor.innerHTML = `
            <div class="text-center py-4">

                <p class="text-secondary mb-0">
                    Este producto todavía no tiene reseñas.
                </p>

            </div>
        `;


        promedio.textContent =
            "Sin calificaciones";

        return;

    }


    const suma =
        lista.reduce(
            (total, resena) =>
                total + Number(resena.calificacion),
            0
        );


    const nota =
        suma / lista.length;


    promedio.textContent =
        `${nota.toFixed(1)} / 5`;


    contenedor.innerHTML =
        lista.map(resena => `

            <div class="review-item py-3">

                <div
                    class="d-flex justify-content-between
                           align-items-center gap-3 mb-2">

                    <strong>
                        ${resena.usuario}
                    </strong>

                    <span class="review-score">
                        ${"★".repeat(resena.calificacion)}
                    </span>

                </div>

                <p class="text-secondary mb-0">
                    ${resena.comentario}
                </p>

            </div>

        `).join("");

}


document
    .getElementById("formResena")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const usuarioSesion =
                JSON.parse(
                    localStorage.getItem("usuarioSesionLevelUp")
                );


            if (!usuarioSesion) {

                const mensaje =
                    document.getElementById("mensajeResena");


                mensaje.className =
                    "alert alert-warning";


                mensaje.textContent =
                    "Debes iniciar sesión para publicar una reseña.";

                return;

            }


            const calificacion =
                Number(
                    document
                        .getElementById("calificacion")
                        .value
                );


            const comentario =
                document
                    .getElementById("comentarioResena")
                    .value
                    .trim();


            resenas.push({

                codigoProducto:
                    producto.codigo,

                usuario:
                    usuarioSesion.gamertag ||
                    usuarioSesion.nombre,

                email:
                    usuarioSesion.email,

                calificacion:
                    calificacion,

                comentario:
                    comentario,

                fecha:
                    new Date().toISOString()

            });


            localStorage.setItem(
                "resenasLevelUp",
                JSON.stringify(resenas)
            );


            this.reset();

            mostrarResenas();


            const mensaje =
                document.getElementById("mensajeResena");


            mensaje.className =
                "alert alert-success";


            mensaje.textContent =
                "Tu reseña fue publicada correctamente.";

        }
    );


document
    .getElementById("btnAgregarCarrito")
    .addEventListener(
        "click",
        agregarAlCarrito
    );


cargarProducto();
mostrarResenas();
actualizarContadorCarrito();