document.addEventListener("DOMContentLoaded", function () {

    actualizarContadorCarritoGlobal();

    const usuarioSesion =
        JSON.parse(
            localStorage.getItem("usuarioSesionLevelUp")
        );


    const accionesInvitado =
        document.getElementById("accionesInvitado");

    const accionesUsuario =
        document.getElementById("accionesUsuario");

    const nombreUsuario =
        document.getElementById("nombreUsuario");

    const btnCerrarSesion =
        document.getElementById("btnCerrarSesion");

    const btnCrearCuenta =
        document.getElementById("btnCrearCuenta");


    /*
     * USUARIO AUTENTICADO
     */
    if (usuarioSesion) {

        if (accionesInvitado) {
            accionesInvitado.classList.add("d-none");
        }


        if (accionesUsuario) {

            accionesUsuario.classList.remove("d-none");
            accionesUsuario.classList.add("d-flex");

        }


        if (nombreUsuario) {

            const nombreMostrar =
                usuarioSesion.gamertag ||
                usuarioSesion.nombre ||
                "Usuario";


            nombreUsuario.textContent =
                `Hola, ${nombreMostrar}`;

        }


        /*
         * Ocultar Crear cuenta
         */
        if (btnCrearCuenta) {

            btnCrearCuenta.classList.add("d-none");

        }


        /*
         * Cerrar sesión
         */
        if (btnCerrarSesion) {

            btnCerrarSesion.addEventListener(
                "click",
                function () {

                    localStorage.removeItem(
                        "usuarioSesionLevelUp"
                    );


                    window.location.reload();

                }
            );

        }

    }

    /*
     * USUARIO NO AUTENTICADO
     */
    else {

        if (accionesInvitado) {

            accionesInvitado.classList.remove("d-none");

        }


        if (accionesUsuario) {

            accionesUsuario.classList.add("d-none");
            accionesUsuario.classList.remove("d-flex");

        }


        if (btnCrearCuenta) {

            btnCrearCuenta.classList.remove("d-none");

        }

    }

});

function actualizarContadorCarritoGlobal() {

    const carrito =
        JSON.parse(
            localStorage.getItem("carritoLevelUp")
        ) || [];


    const cantidad =
        carrito.reduce(
            (total, producto) =>
                total + Number(producto.cantidad || 0),
            0
        );


    const contadorCarrito =
        document.getElementById("contadorCarrito");


    if (contadorCarrito) {
        contadorCarrito.textContent = cantidad;
    }

}