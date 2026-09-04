const formRegistro =
    document.getElementById("formRegistro");

const mensajeRegistro =
    document.getElementById("mensajeRegistro");


function calcularEdad(fechaNacimiento) {

    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);

    let edad =
        hoy.getFullYear() -
        nacimiento.getFullYear();

    const diferenciaMes =
        hoy.getMonth() -
        nacimiento.getMonth();


    if (
        diferenciaMes < 0 ||
        (
            diferenciaMes === 0 &&
            hoy.getDate() < nacimiento.getDate()
        )
    ) {

        edad--;

    }


    return edad;
}


function mostrarMensaje(mensaje, tipo) {

    mensajeRegistro.className =
        `alert alert-${tipo}`;

    mensajeRegistro.textContent =
        mensaje;

}


function esCorreoDuoc(email) {

    return email
        .toLowerCase()
        .includes("@duocuc.cl");

}


formRegistro.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const nombre =
            document
                .getElementById("nombre")
                .value
                .trim();


        const apellido =
            document
                .getElementById("apellido")
                .value
                .trim();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const fechaNacimiento =
            document
                .getElementById("fechaNacimiento")
                .value;


        const gamertag =
            document
                .getElementById("gamertag")
                .value
                .trim();


        const password =
            document
                .getElementById("password")
                .value;


        const passwordConfirmacion =
            document
                .getElementById("passwordConfirmacion")
                .value;


        const codigoReferido =
            document
                .getElementById("codigoReferido")
                .value
                .trim();


        /* Validar edad */

        const edad =
            calcularEdad(fechaNacimiento);


        if (edad < 18) {

            mostrarMensaje(
                "Debes ser mayor de 18 años para registrarte.",
                "danger"
            );

            return;

        }


        /* Validar contraseña */

        if (password !== passwordConfirmacion) {

            mostrarMensaje(
                "Las contraseñas ingresadas no coinciden.",
                "danger"
            );

            return;

        }


        /* Obtener usuarios existentes */

        const usuarios =
            JSON.parse(
                localStorage.getItem("usuariosLevelUp")
            ) || [];


        /* Validar email duplicado */

        const existeEmail =
            usuarios.some(
                usuario =>
                    usuario.email.toLowerCase() ===
                    email.toLowerCase()
            );


        if (existeEmail) {

            mostrarMensaje(
                "Ya existe un usuario registrado con ese correo electrónico.",
                "danger"
            );

            return;

        }


        const usuario = {

            nombre: nombre,

            apellido: apellido,

            email: email,

            fechaNacimiento: fechaNacimiento,

            gamertag: gamertag,

            password: password,

            codigoReferido: codigoReferido,

            descuentoDuoc:
                esCorreoDuoc(email) ? 20 : 0

        };


        usuarios.push(usuario);


        localStorage.setItem(
            "usuariosLevelUp",
            JSON.stringify(usuarios)
        );


        if (usuario.descuentoDuoc === 20) {

            mostrarMensaje(
                "Cuenta creada correctamente. Tu correo Duoc tiene asociado un 20% de descuento.",
                "success"
            );

        } else {

            mostrarMensaje(
                "Cuenta creada correctamente.",
                "success"
            );

        }


        formRegistro.reset();

    }
);