document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionamos los elementos según TU HTML
    const checkboxes = document.querySelectorAll('.form-check-input');
    const elementosAFiltrar = document.querySelectorAll('.carrusel-individual');
    const buscador = document.getElementById('filterSearch');

    function aplicarFiltros() {
        // Obtenemos qué regiones están marcadas (las pasamos a minúsculas para comparar fácil)
        const regionesSeleccionadas = Array.from(checkboxes)
            .filter(i => i.checked)
            .map(input => input.value.toLowerCase());

        // Obtenemos lo que se escribió en el buscador
        const textoBusqueda = buscador.value.toLowerCase();

        elementosAFiltrar.forEach(elemento => {
            // Sacamos la región del data-region del carrusel
            const regionElemento = (elemento.getAttribute('data-region') || "").toLowerCase();
            // Sacamos el texto del carrusel (el h5 y el p que tenés abajo)
            const textoElemento = elemento.innerText.toLowerCase();

            // LÓGICA DE FILTRADO:
            // ¿No hay filtros? Mostramos todo. ¿Hay filtros? Debe coincidir la región.
            const coincideRegion = regionesSeleccionadas.length === 0 || regionesSeleccionadas.includes(regionElemento);
            
            // ¿El texto buscado está en el título o descripción del carrusel?
            const coincideBusqueda = textoElemento.includes(textoBusqueda);

            // Si cumple ambas, se muestra, si no, se oculta
            if (coincideRegion && coincideBusqueda) {
                elemento.style.display = 'block'; 
            } else {
                elemento.style.display = 'none';
            }
        });
    }

    // 2. Escuchamos los cambios en los checkboxes
    checkboxes.forEach(cb => {
        cb.addEventListener('change', aplicarFiltros);
    });

    // 3. Escuchamos el buscador
    buscador.addEventListener('input', aplicarFiltros);
});