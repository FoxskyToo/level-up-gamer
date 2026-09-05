const usuarioSesion =
    JSON.parse(
        localStorage.getItem("usuarioSesionLevelUp")
    );


if (!usuarioSesion) {

    window.location.href =
        "login.html";

}


const usuarios =
    JSON.parse(
        localStorage.getItem("usuariosLevelUp")
    ) || [];


const usuario =
    usuarios.find(
        usuario =>
            usuario.email === usuarioSesion.email
    );


const formPerfil =
    document.getElementById("formPerfil");

const mensajePerfil =
    document.getElementById("mensajePerfil");


function mostrarMensaje(mensaje, tipo) {

    mensajePerfil.className =
        `alert alert-${tipo}`;

    mensajePerfil.textContent =
        mensaje;

}


function cargarPerfil() {

    if (!usuario) {

        mostrarMensaje(
            "No fue posible cargar la información del usuario.",
            "danger"
        );

        return;

    }


    document.getElementById("nombre").value =
        usuario.nombre || "";


    document.getElementById("apellido").value =
        usuario.apellido || "";


    document.getElementById("email").value =
        usuario.email || "";


    document.getElementById("gamertag").value =
        usuario.gamertag || "";


    document.getElementById("categoriaFavorita").value =
        usuario.categoriaFavorita || "";


    if (usuario.descuentoDuoc === 20) {

        document
            .getElementById("beneficioDuoc")
            .classList.remove("d-none");

    }

}


formPerfil.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        usuario.nombre =
            document
                .getElementById("nombre")
                .value
                .trim();


        usuario.apellido =
            document
                .getElementById("apellido")
                .value
                .trim();


        usuario.gamertag =
            document
                .getElementById("gamertag")
                .value
                .trim();


        usuario.categoriaFavorita =
            document
                .getElementById("categoriaFavorita")
                .value;


        localStorage.setItem(
            "usuariosLevelUp",
            JSON.stringify(usuarios)
        );


        const nuevaSesion = {

            ...usuarioSesion,

            nombre: usuario.nombre,

            apellido: usuario.apellido,

            gamertag: usuario.gamertag

        };


        localStorage.setItem(
            "usuarioSesionLevelUp",
            JSON.stringify(nuevaSesion)
        );


        mostrarMensaje(
            "Perfil actualizado correctamente.",
            "success"
        );

    }
);


cargarPerfil();