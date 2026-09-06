(function inicializarProductos() {
    const claveInicializacion = "productosInicialesLevelUpV1";

    if (localStorage.getItem(claveInicializacion)) return;

    const productosIniciales = [
        {
            "codigo": "JM001",
            "nombre": "UNO",
            "categoria": "Juegos de Mesa",
            "precio": 9990,
            "imagen": "../assets/img/productos/Juegos de Mesa/unosinfondo.png",
            "descripcion": "Juego de cartas para compartir con amigos y familia."
        },
        {
            "codigo": "JM002",
            "nombre": "Monopoly",
            "categoria": "Juegos de Mesa",
            "precio": 24990,
            "imagen": "../assets/img/productos/Juegos de Mesa/monosinfondo.png",
            "descripcion": "Juego de mesa de propiedades y negociaci?n."
        },
        {
            "codigo": "JM003",
            "nombre": "Catan",
            "categoria": "Juegos de Mesa",
            "precio": 39990,
            "imagen": "../assets/img/productos/Juegos de Mesa/catansinfondo.png",
            "descripcion": "Juego de estrategia, recursos e intercambio."
        },
        {
            "codigo": "AC001",
            "nombre": "Luces decorativas gamer",
            "categoria": "Accesorios",
            "precio": 19990,
            "imagen": "../assets/img/productos/Accesorios/lucesXsinfondo.png",
            "descripcion": "Iluminaci?n decorativa para tu espacio de juego."
        },
        {
            "codigo": "AC002",
            "nombre": "Soporte para micr?fono",
            "categoria": "Accesorios",
            "precio": 14990,
            "imagen": "../assets/img/productos/Accesorios/apoyamicsinfondo.png",
            "descripcion": "Complemento para organizar tu micr?fono en el escritorio."
        },
        {
            "codigo": "AC003",
            "nombre": "Soporte para aud?fonos",
            "categoria": "Accesorios",
            "precio": 12990,
            "imagen": "../assets/img/productos/Accesorios/apoyaaudisinfondo.png",
            "descripcion": "Mant?n tus aud?fonos a mano y tu escritorio ordenado."
        },
        {
            "codigo": "CO001",
            "nombre": "Nintendo Switch 2",
            "categoria": "Consolas",
            "precio": 599990,
            "imagen": "../assets/img/productos/Consolas/consola1.png",
            "descripcion": "Consola Nintendo para disfrutar de tus videojuegos favoritos."
        },
        {
            "codigo": "CO002",
            "nombre": "PlayStation 5",
            "categoria": "Consolas",
            "precio": 549990,
            "imagen": "../assets/img/productos/Consolas/consola2.png",
            "descripcion": "Consola PlayStation con control DualSense."
        },
        {
            "codigo": "CO003",
            "nombre": "Xbox Series X blanca",
            "categoria": "Consolas",
            "precio": 599990,
            "imagen": "../assets/img/productos/Consolas/consola3.png",
            "descripcion": "Consola Xbox Series X en color blanco."
        },
        {
            "codigo": "CG001",
            "nombre": "PC Gamer Intel Core i9",
            "categoria": "Computadores Gamers",
            "precio": 2999990,
            "imagen": "../assets/img/productos/Computadores Gamers/compu1.png",
            "descripcion": "Torre gamer con dise?o negro e iluminaci?n RGB."
        },
        {
            "codigo": "CG002",
            "nombre": "PC Gamer Ryzen 5 RGB",
            "categoria": "Computadores Gamers",
            "precio": 699990,
            "imagen": "../assets/img/productos/Computadores Gamers/compu2.png",
            "descripcion": "Torre gamer con panel transparente e iluminaci?n multicolor."
        },
        {
            "codigo": "CG003",
            "nombre": "PC Gamer Kronos Ryzen 5",
            "categoria": "Computadores Gamers",
            "precio": 899990,
            "imagen": "../assets/img/productos/Computadores Gamers/compu3.png",
            "descripcion": "Torre gamer Kronos con iluminaci?n RGB."
        },
        {
            "codigo": "SG001",
            "nombre": "Silla Gamer Krone rosada",
            "categoria": "Sillas Gamers",
            "precio": 149990,
            "imagen": "../assets/img/productos/Sillas Gamers/Silla1.png",
            "descripcion": "Silla gamer rosada con cojines y apoyabrazos."
        },
        {
            "codigo": "SG002",
            "nombre": "Silla Gamer Krone lila",
            "categoria": "Sillas Gamers",
            "precio": 149990,
            "imagen": "../assets/img/productos/Sillas Gamers/Silla2.png",
            "descripcion": "Silla gamer lila para complementar tu escritorio."
        },
        {
            "codigo": "SG003",
            "nombre": "Silla Gamer Krone oscura",
            "categoria": "Sillas Gamers",
            "precio": 149990,
            "imagen": "../assets/img/productos/Sillas Gamers/Silla3.png",
            "descripcion": "Silla gamer de color oscuro con cojines de apoyo."
        },
        {
            "codigo": "MS001",
            "nombre": "Mouse Gamer Logitech",
            "categoria": "Mouse",
            "precio": 29990,
            "imagen": "../assets/img/productos/Mouse/Mouse1.png",
            "descripcion": "Mouse Logitech con cable e iluminaci?n."
        },
        {
            "codigo": "MS002",
            "nombre": "Mouse Gamer rojo",
            "categoria": "Mouse",
            "precio": 34990,
            "imagen": "../assets/img/productos/Mouse/Mouse2.png",
            "descripcion": "Mouse gamer rojo con botones laterales."
        },
        {
            "codigo": "MS003",
            "nombre": "Mouse Gamer HyperX",
            "categoria": "Mouse",
            "precio": 39990,
            "imagen": "../assets/img/productos/Mouse/Mouse3.png",
            "descripcion": "Mouse HyperX con cable y botones laterales."
        },
        {
            "codigo": "MP001",
            "nombre": "Mousepad RGB",
            "categoria": "Mousepad",
            "precio": 14990,
            "imagen": "../assets/img/productos/Mousepad/mousepad1.png",
            "descripcion": "Mousepad negro con iluminaci?n en los bordes."
        },
        {
            "codigo": "MP002",
            "nombre": "Mousepad Kronos rojo",
            "categoria": "Mousepad",
            "precio": 12990,
            "imagen": "../assets/img/productos/Mousepad/Mousepad2.png",
            "descripcion": "Mousepad extendido con dise?o rojo y negro."
        },
        {
            "codigo": "MP003",
            "nombre": "Mousepad mapamundi",
            "categoria": "Mousepad",
            "precio": 11990,
            "imagen": "../assets/img/productos/Mousepad/Mousepad3.png",
            "descripcion": "Mousepad extendido con dise?o de mapa del mundo."
        }
    ];

    const productosGuardados =
        JSON.parse(localStorage.getItem("productosLevelUp")) || [];
    const codigosExistentes = new Set(
        productosGuardados.map(producto => producto.codigo.toLowerCase())
    );
    const productosNuevos = productosIniciales.filter(
        producto => !codigosExistentes.has(producto.codigo.toLowerCase())
    );

    localStorage.setItem(
        "productosLevelUp",
        JSON.stringify([...productosGuardados, ...productosNuevos])
    );
    localStorage.setItem(claveInicializacion, "true");
})();
