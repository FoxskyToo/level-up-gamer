let productos =
    JSON.parse(localStorage.getItem("productosLevelUp")) || [];


function guardarProductos() {

    localStorage.setItem(
        "productosLevelUp",
        JSON.stringify(productos)
    );

}


function formatoPrecio(precio) {

    return Number(precio).toLocaleString("es-CL");

}


function mostrarProductos() {

    const tabla =
        document.getElementById("tablaProductos");


    if (productos.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td
                    colspan="5"
                    class="text-center text-secondary">

                    No hay productos registrados.

                </td>
            </tr>
        `;

        return;
    }


    tabla.innerHTML =
        productos.map((producto, index) => `

            <tr>

                <td>
                    ${producto.codigo}
                </td>

                <td>
                    ${producto.nombre}
                </td>

                <td>
                    ${producto.categoria}
                </td>

                <td>
                    $${formatoPrecio(producto.precio)}
                </td>

                <td>

                    <button
                        class="btn btn-sm btn-danger"
                        onclick="eliminarProducto(${index})">

                        Eliminar

                    </button>

                </td>

            </tr>

        `).join("");

}


document
    .getElementById("formProducto")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const codigo =
            document
                .getElementById("codigo")
                .value
                .trim();


        const codigoExiste =
            productos.some(
                producto =>
                    producto.codigo.toLowerCase() === codigo.toLowerCase()
            );


        if (codigoExiste) {

            alert(
                "Ya existe un producto con ese código."
            );

            return;

        }


        const producto = {

            codigo: codigo,

            nombre:
                document
                    .getElementById("nombre")
                    .value
                    .trim(),

            categoria:
                document
                    .getElementById("categoria")
                    .value,

            precio:
                Number(
                    document
                        .getElementById("precio")
                        .value
                ),

            imagen:
                document
                    .getElementById("imagen")
                    .value
                    .trim(),

            descripcion:
                document
                    .getElementById("descripcion")
                    .value
                    .trim()

        };


        productos.push(producto);

        guardarProductos();

        this.reset();

        mostrarProductos();


        alert(
            "Producto agregado correctamente."
        );

    });


function eliminarProducto(index) {

    const confirmar =
        confirm(
            "¿Deseas eliminar este producto?"
        );


    if (!confirmar) {

        return;

    }


    productos.splice(index, 1);

    guardarProductos();

    mostrarProductos();

}


mostrarProductos();