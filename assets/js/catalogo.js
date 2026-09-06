let productos =
    JSON.parse(
        localStorage.getItem("productosLevelUp")
    ) || [];


let carrito =
    JSON.parse(
        localStorage.getItem("carritoLevelUp")
    ) || [];


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


function cargarProductos() {

    productos =
        JSON.parse(
            localStorage.getItem("productosLevelUp")
        ) || [];


    const textoBusqueda =
        document
            .getElementById("buscar")
            .value
            .toLowerCase()
            .trim();


    const categoriaSeleccionada =
        document
            .getElementById("categoria")
            .value;


    const productosFiltrados =
        productos.filter(producto => {


            const coincideTexto =

                producto.nombre
                    .toLowerCase()
                    .includes(textoBusqueda)

                ||

                producto.codigo
                    .toLowerCase()
                    .includes(textoBusqueda);


            const coincideCategoria =

                !categoriaSeleccionada

                ||

                producto.categoria === categoriaSeleccionada;


            return coincideTexto &&
                   coincideCategoria;

        });


    mostrarProductos(
        productosFiltrados
    );

}


function mostrarProductos(productosFiltrados) {

    const contenedor =
        document.getElementById(
            "contenedorProductos"
        );


    const cantidad =
        productosFiltrados.length;


    document
        .getElementById("cantidadProductos")
        .textContent =

        `${cantidad} producto${cantidad !== 1 ? "s" : ""}`;


    if (cantidad === 0) {

        contenedor.innerHTML = `

            <div class="col-12">

                <div
                    class="levelup-panel text-center p-5">

                    <h3 class="mb-3">
                        No encontramos productos
                    </h3>

                    <p class="text-secondary mb-0">
                        Prueba modificando la búsqueda
                        o seleccionando otra categoría.
                    </p>

                </div>

            </div>

        `;

        return;

    }


    contenedor.innerHTML =
        productosFiltrados
            .map(producto => `

                <div class="col-sm-6 col-lg-4 col-xl-3">

                    <div class="product-card h-100 overflow-hidden">

                        <div class="product-image">

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


                        <div class="p-3">

                            <span
                                class="badge product-category mb-2">

                                ${escaparHTML(producto.categoria)}

                            </span>


                            <h5 class="mt-2">
                                ${escaparHTML(producto.nombre)}
                            </h5>


                            <p class="small text-secondary">
                                Código:
                                ${escaparHTML(producto.codigo)}
                            </p>


                            <p class="small text-secondary">
                                ${
                                    escaparHTML(
                                        producto.descripcion ||
                                        "Sin descripción."
                                    )
                                }
                            </p>


                            <div
                                class="d-flex justify-content-between
                                       align-items-center mt-3">

                                <span class="product-price">

                                    $${formatoPrecio(producto.precio)}

                                </span>

                                <div class="d-flex gap-2">

                                    <a
                                        href="producto-detalle.html?codigo=${encodeURIComponent(producto.codigo)}"
                                        class="btn btn-sm btn-outline-light">
                                        Ver detalle
                                    </a>

                                    <button
                                        class="btn btn-sm btn-levelup-blue"
                                        onclick="agregarAlCarrito('${escaparHTML(producto.codigo)}')">
                                        Agregar
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            `)
            .join("");

}


function agregarAlCarrito(codigo) {

    const producto =
        productos.find(
            producto =>
                producto.codigo === codigo
        );


    if (!producto) {

        return;

    }


    const existente =
        carrito.find(
            producto =>
                producto.codigo === codigo
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

}


function actualizarContadorCarrito() {

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


    const contadorCarrito =
        document.getElementById("contadorCarrito");

    if (contadorCarrito) {
        contadorCarrito.textContent = cantidad;
    }

}


document
    .getElementById("btnFiltrar")
    .addEventListener(
        "click",
        cargarProductos
    );


document
    .getElementById("buscar")
    .addEventListener(
        "input",
        cargarProductos
    );


document
    .getElementById("categoria")
    .addEventListener(
        "change",
        cargarProductos
    );


cargarProductos();

actualizarContadorCarrito();