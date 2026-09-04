const formLogin =
    document.getElementById("formLogin");

const mensajeLogin =
    document.getElementById("mensajeLogin");


function mostrarMensaje(mensaje, tipo) {

    mensajeLogin.className =
        `alert alert-${tipo}`;

    mensajeLogin.textContent =
        mensaje;
}


formLogin.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const email =
            document
                .getElementById("email")
                .value
                .trim()
                .toLowerCase();


        const password =
            document
                .getElementById("password")
                .value;


        const usuarios =
            JSON.parse(
                localStorage.getItem("usuariosLevelUp")
            ) || [];


        const usuario =
            usuarios.find(
                usuario =>
                    usuario.email.toLowerCase() === email &&
                    usuario.password === password
            );


        if (!usuario) {

            mostrarMensaje(
                "Correo electrónico o contraseña incorrectos.",
                "danger"
            );

            return;
        }


        localStorage.setItem(
            "usuarioSesionLevelUp",
            JSON.stringify({
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                gamertag: usuario.gamertag,
                descuentoDuoc: usuario.descuentoDuoc
            })
        );


        mostrarMensaje(
            "Inicio de sesión correcto.",
            "success"
        );


        setTimeout(
            function() {

                window.location.href =
                    "../index.html";

            },
            1000
        );

    }
);