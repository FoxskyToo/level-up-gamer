const btnWhatsapp =
    document.getElementById("btnWhatsapp");

const formSoporte =
    document.getElementById("formSoporte");

const mensajeSoporte =
    document.getElementById("mensajeSoporte");


function mostrarMensaje(mensaje, tipo) {

    mensajeSoporte.className =
        `alert alert-${tipo}`;

    mensajeSoporte.textContent =
        mensaje;

}


btnWhatsapp.addEventListener(
    "click",
    function() {

        /*
         * Número temporal.
         * Más adelante puedes reemplazarlo por
         * el número real que utilizará el proyecto.
         */

        const numeroWhatsapp =
            "56994782616";


        const mensaje =
            "Hola, necesito ayuda con Level-Up Gamer.";


        const url =
            `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;


        window.open(
            url,
            "_blank"
        );

    }
);


formSoporte.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const nombre =
            document
                .getElementById("nombreSoporte")
                .value
                .trim();


        const email =
            document
                .getElementById("emailSoporte")
                .value
                .trim();


        const tipo =
            document
                .getElementById("tipoConsulta")
                .value;


        const mensaje =
            document
                .getElementById("mensajeConsulta")
                .value
                .trim();


        const consultas =
            JSON.parse(
                localStorage.getItem("consultasSoporteLevelUp")
            ) || [];


        consultas.push({

            nombre: nombre,
            email: email,
            tipo: tipo,
            mensaje: mensaje,
            fecha: new Date().toISOString()

        });


        localStorage.setItem(
            "consultasSoporteLevelUp",
            JSON.stringify(consultas)
        );


        mostrarMensaje(
            "Tu consulta fue registrada correctamente.",
            "success"
        );


        formSoporte.reset();

    }
);