/* ==========================================================================
   1. CONFIGURACIÓN INICIAL Y VARIABLES GLOBALES
   ========================================================================== */
let jugadores = [];               // Puntuación de cada jugador
let turnoActual = 0;              // Índice del jugador actual (0 a 3)
let cartasDadasVuelta = [];       // Almacena las 2 cartas seleccionadas para comparar
let coincidenciasEncontradas = 0; // Contador para saber cuándo termina el juego

// Elementos del DOM
const btnComenzar = document.getElementById('btn-comenzar');
const selectJugadores = document.getElementById('cantidad-jugadores');
const contenedorMarcador = document.getElementById('marcador-multijugador');
const seccionConfig = document.getElementById('configuracion');
const tablero = document.getElementById('tablero-juego');

// Imágenes del juego (Asegurate de que las rutas sean correctas)
const imagenesBase = [
    '../img/juegos/memotest/atiendo-boludos.jfif', 
    '../img/juegos/memotest/moria-casan.jfif', 
    '../img/juegos/memotest/mirtha-legrand.jfif',
    '../img/juegos/memotest/coco-basile.jfif',
    '../img/juegos/memotest/de-que-viven.jfif',
    '../img/juegos/memotest/messi.jfif',
    '../img/juegos/memotest/isabel-sarli.jfif',
    '../img/juegos/memotest/diego-maradona.jfif',
];

/* ==========================================================================
   2. EVENTO PRINCIPAL: INICIO DEL JUEGO
   ========================================================================== */
btnComenzar.addEventListener("click", function() {
    let cantidadSeleccionada = parseInt(selectJugadores.value);
    
    // Inicialización del estado de la partida
    jugadores = new Array(cantidadSeleccionada).fill(0);
    turnoActual = 0;
    coincidenciasEncontradas = 0;
    cartasDadasVuelta = [];

    // Limpieza de interfaz
    seccionConfig.style.display = "none";
    contenedorMarcador.innerHTML = ""; 

    // Generación de elementos visuales
    crearMarcadores(cantidadSeleccionada);
    const mazoListo = generarMazo(); 
    mostrarTablero(mazoListo);
    actualizarVisualTurno();
});

/* ==========================================================================
   3. FUNCIONES DE GENERACIÓN
   ========================================================================== */

function crearMarcadores(cantidad) {
    for (let i = 1; i <= cantidad; i++) {
        contenedorMarcador.innerHTML += `
            <div class="col shadow-sm p-2 m-1 border rounded bg-white" id="jugador-${i}">
                <h5 class="mb-0">Jugador ${i}</h5>
                <p class="mb-0 puntos-color">Puntos: <span id="puntos-${i}">0</span></p>
            </div>
        `;
    }
}

function generarMazo() {
    let mazo = [...imagenesBase, ...imagenesBase];
    mazo.sort(() => Math.random() - 0.5); 
    return mazo;
}

function mostrarTablero(mazo) {
    tablero.innerHTML = ""; 
    mazo.forEach((imagen) => {
        tablero.innerHTML += `
            <div class="carta" data-icono="${imagen}">
                <div class="cara dorso"></div>
                <div class="cara frente" style="background-image: url('${imagen}')"></div>
            </div>
        `;
    });
}

/* ==========================================================================
   4. LÓGICA DE JUEGO
   ========================================================================== */

tablero.addEventListener("click", function(e) {
    const cartaClickeada = e.target.closest('.carta');

    if (cartaClickeada && !cartaClickeada.classList.contains('volteada') && cartasDadasVuelta.length < 2) {
        cartaClickeada.classList.add('volteada');
        cartasDadasVuelta.push(cartaClickeada);

        if (cartasDadasVuelta.length === 2) {
            verificarCoincidencia(); 
        }
    }
});

function verificarCoincidencia() {
    const [carta1, carta2] = cartasDadasVuelta;
    const esPareja = carta1.dataset.icono === carta2.dataset.icono;

    if (esPareja) {
        coincidenciasEncontradas++;
        sumarPuntoJugadorActual();
        cartasDadasVuelta = []; 

        // Verificamos si es el final de la partida
        if (coincidenciasEncontradas === imagenesBase.length) {
            setTimeout(finalizarPartida, 800);
        }
    } else {
        // Si fallan, esperamos 1 segundo para que memoricen y volteamos
        setTimeout(() => {
            carta1.classList.remove('volteada');
            carta2.classList.remove('volteada');
            cambiarTurno();
            cartasDadasVuelta = [];
        }, 1000);
    }
}

/* ==========================================================================
   5. TURNOS, PUNTUACIÓN Y FINAL
   ========================================================================== */

function sumarPuntoJugadorActual() {
    jugadores[turnoActual]++; 
    const spanPuntos = document.getElementById(`puntos-${turnoActual + 1}`);
    spanPuntos.innerText = jugadores[turnoActual];
}

function cambiarTurno() {
    turnoActual = (turnoActual + 1) % jugadores.length;
    actualizarVisualTurno();
}

function actualizarVisualTurno() {
    // 1. Limpiamos a todos los jugadores
    for (let i = 1; i <= 4; i++) {
        const div = document.getElementById(`jugador-${i}`);
        if (div) {
            div.classList.remove('jugador-activo'); // Quitamos el celeste
            div.classList.add('bg-white');         // Volvemos al blanco
        }
    }

    // 2. Resaltamos al jugador del turno actual
    const marcadorActivo = document.getElementById(`jugador-${turnoActual + 1}`);
    if (marcadorActivo) {
        marcadorActivo.classList.remove('bg-white');
        marcadorActivo.classList.add('jugador-activo');
    }
}

/**
 * Calcula el ganador y ofrece reiniciar
 */
function finalizarPartida() {
    const maxPuntos = Math.max(...jugadores);
    const ganadores = [];
    
    jugadores.forEach((puntos, indice) => {
        if (puntos === maxPuntos) {
            ganadores.push(`Jugador ${indice + 1}`);
        }
    });

    let mensaje = "";
    if (ganadores.length > 1) {
        mensaje = `¡Empate! Los ganadores son: ${ganadores.join(", ")} con ${maxPuntos} puntos.`;
    } else {
        mensaje = `¡Felicidades ${ganadores[0]}! Ganaste con ${maxPuntos} puntos.`;
    }

    if (confirm(mensaje + "\n\n¿Querés volver a jugar?")) {
        location.reload();
    }
}