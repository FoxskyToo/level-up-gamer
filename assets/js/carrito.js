let carrito =
    JSON.parse(
        localStorage.getItem("carritoLevelUp")
    ) || [];


function guardarCarrito() {

    localStorage.setItem(
        "carritoLevelUp",
        JSON.stringify(carrito)
    );

}


function formatoPrecio(precio) {

    return Number(precio)
        .toLocaleString("es-CL");

}


function escaparHTML(texto) {

    const div =
        document.createElement("div");

    div.textContent =
        texto ?? "";

    return div.innerHTML;

}


function mostrarCarrito() {

    carrito =
        JSON.parse(
            localStorage.getItem("carritoLevelUp")
        ) || [];

    const contenedor =
        document.getElementById("contenedorCarrito");

    if (carrito.length === 0) {

        contenedor.innerHTML = `
            <div class="text-center py-5">

                <h3 class="h5 mb-3">
                    Tu carrito está vacío
                </h3>

                <p class="text-secondary mb-4">
                    Agrega productos desde nuestro catálogo para comenzar tu compra.
                </p>

                <a
                    href="catalogo.html"
                    class="btn btn-levelup">

                    Ir al catálogo

                </a>

            </div>
        `;

        actualizarResumen();

        return;
    }


    contenedor.innerHTML =
        carrito.map((producto, index) => {

            const subtotal =
                Number(producto.precio) *
                producto.cantidad;


            return `
                <div
                    class="row align-items-center
                           py-4 border-bottom border-secondary">

                    <div class="col-md-3 mb-3 mb-md-0">

                        <div class="product-image carrito-product-image">

                            ${
                                producto.imagen

                                ? `
                                    <img
                                        src="${escaparHTML(producto.imagen)}"
                                        alt="${escaparHTML(producto.nombre)}">
                                  `

                                : `
                                    <span class="text-secondary">
                                        Sin imagen
                                    </span>
                                  `
                            }

                        </div>

                    </div>


                    <div class="col-md-4">

                        <span class="badge product-category mb-2">
                            ${escaparHTML(producto.categoria)}
                        </span>

                        <h3 class="h6 mb-2">
                            ${escaparHTML(producto.nombre)}
                        </h3>

                        <p class="text-secondary small mb-0">
                            Código:
                            ${escaparHTML(producto.codigo)}
                        </p>

                    </div>


                    <div class="col-md-3 mt-3 mt-md-0">

                        <div
                            class="d-flex align-items-center gap-2">

                            <button
                                class="btn btn-outline-light btn-sm"
                                onclick="disminuirCantidad(${index})">

                                -
                            </button>

                            <span
                                class="px-2 fw-bold">

                                ${producto.cantidad}

                            </span>

                            <button
                                class="btn btn-levelup-blue btn-sm"
                                onclick="aumentarCantidad(${index})">

                                +
                            </button>

                        </div>

                    </div>


                    <div class="col-md-2 text-md-end mt-3 mt-md-0">

                        <p class="product-price mb-2">
                            $${formatoPrecio(subtotal)}
                        </p>

                        <button
                            class="btn btn-sm btn-danger"
                            onclick="eliminarProducto(${index})">

                            Eliminar
                        </button>

                    </div>

                </div>
            `;

        }).join("");


    actualizarResumen();

}


function aumentarCantidad(index) {

    carrito[index].cantidad++;

    guardarCarrito();

    mostrarCarrito();

}


function disminuirCantidad(index) {

    if (carrito[index].cantidad > 1) {

        carrito[index].cantidad--;

    } else {

        eliminarProducto(index);

        return;
    }


    guardarCarrito();

    mostrarCarrito();

}


function eliminarProducto(index) {

    const confirmar =
        confirm(
            "¿Deseas eliminar este producto del carrito?"
        );


    if (!confirmar) {

        return;

    }


    carrito.splice(index, 1);

    guardarCarrito();

    mostrarCarrito();

}


function vaciarCarrito() {

    if (carrito.length === 0) {

        return;

    }


    const confirmar =
        confirm(
            "¿Deseas vaciar completamente el carrito?"
        );


    if (!confirmar) {

        return;

    }


    carrito = [];

    guardarCarrito();

    mostrarCarrito();

}


function actualizarResumen() {

    carrito =
    JSON.parse(
        localStorage.getItem("carritoLevelUp")
    ) || [];

    const cantidad =
        carrito.reduce(
            (total, producto) =>
                total + producto.cantidad,
            0
        );


    const subtotal =
        carrito.reduce(
            (acumulado, producto) =>
                acumulado +
                (
                    Number(producto.precio) *
                    producto.cantidad
                ),
            0
        );


    const usuarioSesion =
        JSON.parse(
            localStorage.getItem("usuarioSesionLevelUp")
        );


    let descuento = 0;


    if (
        usuarioSesion &&
        usuarioSesion.descuentoDuoc === 20
    ) {

        descuento =
            Math.round(subtotal * 0.20);

    }


    const total =
        subtotal - descuento;


    document
        .getElementById("contadorCarrito")
        .textContent = cantidad;


    document
        .getElementById("cantidadResumen")
        .textContent = cantidad;


    document
        .getElementById("subtotalCarrito")
        .textContent =
        formatoPrecio(subtotal);


    document
        .getElementById("descuentoCarrito")
        .textContent =
        formatoPrecio(descuento);


    document
        .getElementById("totalCarrito")
        .textContent =
        formatoPrecio(total);


    const filaDescuento =
        document.getElementById("filaDescuento");


    if (descuento > 0) {

        filaDescuento.classList.remove("d-none");
        filaDescuento.classList.add("d-flex");

    } else {

        filaDescuento.classList.add("d-none");
        filaDescuento.classList.remove("d-flex");

    }

}


function finalizarCompra() {

    if (carrito.length === 0) {

        alert(
            "Tu carrito está vacío."
        );

        return;

    }


    const usuarioSesion =
        JSON.parse(
            localStorage.getItem("usuarioSesionLevelUp")
        );


    if (!usuarioSesion) {

        const irLogin =
            confirm(
                "Debes iniciar sesión para finalizar la compra. ¿Deseas ir al inicio de sesión?"
            );


        if (irLogin) {

            window.location.href =
                "login.html";

        }


        return;

    }


    const subtotal =
        carrito.reduce(
            (acumulado, producto) =>
                acumulado +
                (
                    Number(producto.precio) *
                    producto.cantidad
                ),
            0
        );


    let descuento = 0;


    if (usuarioSesion.descuentoDuoc === 20) {

        descuento =
            Math.round(subtotal * 0.20);

    }


    const total =
        subtotal - descuento;


    const compras =
        JSON.parse(
            localStorage.getItem("comprasLevelUp")
        ) || [];


    const compra = {

        id:
            Date.now(),

        usuarioEmail:
            usuarioSesion.email,

        fecha:
            new Date().toISOString(),

        productos:
            carrito.map(producto => ({
                codigo: producto.codigo,
                nombre: producto.nombre,
                categoria: producto.categoria,
                precio: producto.precio,
                cantidad: producto.cantidad
            })),

        subtotal:
            subtotal,

        descuento:
            descuento,

        total:
            total

    };


    compras.push(compra);


    localStorage.setItem(
        "comprasLevelUp",
        JSON.stringify(compras)
    );


    carrito = [];


    localStorage.setItem(
        "carritoLevelUp",
        JSON.stringify(carrito)
    );


    mostrarCarrito();


    alert(
        "Compra realizada correctamente."
    );

}

/* =========================
   EVENTOS
========================= */

const btnVaciarCarrito =
    document.getElementById("btnVaciarCarrito");

if (btnVaciarCarrito) {
    btnVaciarCarrito.addEventListener(
        "click",
        vaciarCarrito
    );
}


const btnFinalizarCompra =
    document.getElementById("btnFinalizarCompra");

if (btnFinalizarCompra) {
    btnFinalizarCompra.addEventListener(
        "click",
        finalizarCompra
    );
}


/* =========================
   INICIALIZACION
========================= */

mostrarCarrito();