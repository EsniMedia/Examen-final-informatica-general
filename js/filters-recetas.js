document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.form-check-input');
    const cards = document.querySelectorAll('.carta-valoracion');
    const buscador = document.getElementById('filterSearch'); // Asegurate que el ID coincida en tu HTML

    function filtrarTodo() {
        // 1. Obtenemos categorías marcadas
        const filtrosActivos = Array.from(checkboxes)
            .filter(i => i.checked)
            .map(i => i.value.toLowerCase());

        // 2. Obtenemos texto del buscador
        const textoBusqueda = buscador.value.toLowerCase();

        cards.forEach(card => {
            // Datos de la carta (Categoría y Título/Contenido)
            const categoriaCarta = (card.getAttribute('data-receta') || "").toLowerCase();
            const textoCarta = card.innerText.toLowerCase();

            // LÓGICA COMBINADA:
            // ¿Coincide la categoría? (Si no hay marcas, coincide por defecto)
            const coincideFiltro = filtrosActivos.length === 0 || filtrosActivos.includes(categoriaCarta);
            
            // ¿Coincide el texto buscado?
            const coincideBusqueda = textoCarta.includes(textoBusqueda);

            // Solo se muestra si cumple AMBAS condiciones
            if (coincideFiltro && coincideBusqueda) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Escuchamos cambios en los checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filtrarTodo);
    });

    // Escuchamos el teclado en el buscador
    if (buscador) {
        buscador.addEventListener('input', filtrarTodo);
    }
});