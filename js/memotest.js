// 1. Configuración inicial
let jugadores = [];       // Aquí guardaremos los puntos de cada uno
let turnoActual = 0;      // Quién está jugando ahora (0, 1, 2 o 3)
let cartasDadasVuelta = []; // Para comparar si las dos que eligió son iguales
let coincidenciasEncontradas = 0;

// 2. Elementos del DOM que vamos a manipular seguido
const btnComenzar = document.getElementById('btn-comenzar');
const selectJugadores = document.getElementById('cantidad-jugadores');
const contenedorMarcador = document.getElementById('marcador-multijugador');
const seccionConfig = document.getElementById('configuracion');


btnComenzar.addEventListener("click", function() {
    // 1. Limpiamos el HTML interno del marcador (lo dejamos vacío)
    contenedorMarcador.innerHTML = ""; 

    // 2. Obtenemos el valor y lo convertimos a número entero
    let cantidadSeleccionada = parseInt(selectJugadores.value);

    //Ocultamos el menú de configuración
    seccionConfig.style.display = "none";

    console.log("Cantidad de jugadores seleccionada:", cantidadSeleccionada);
    
    // Aquí es donde deberíamos llamar a la función que "dibuja" a los jugadores
    crearMarcadores(cantidadSeleccionada);
});

function crearMarcadores(cantidad){
    for (let i = 1; i <= cantidad; i++) {
        contenedorMarcador.innerHTML += `
            <div class="col shadow-sm p-2 m-1 border rounded bg-white" id="jugador-${i}">
                <h5 class="mb-0">Jugador ${i}</h5>
                <p class="mb-0">Puntos: <span id="puntos-${i}">0</span></p>
            </div>
        `;
        
    }

}