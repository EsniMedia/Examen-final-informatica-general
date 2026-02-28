


const buscador = document.getElementById('filterSearch');
document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.form-check-input');
    const cards = document.querySelectorAll('.carta-valoracion');
    const textoBusqueda = buscador.value.toLowerCase();

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // Obtenemos los valores de todos los checkboxes marcados
            const filtrosActivos = Array.from(checkboxes)
                .filter(i => i.checked)
                .map(i => i.value);

            cards.forEach(card => {
                const regionCarta = card.getAttribute('data-region');
                
                // Si no hay filtros marcados, mostramos todo
                if (filtrosActivos.length === 0) {
                    card.style.display = 'block';
                } else {
                    // Si la región de la carta está en la lista de filtros activos, se muestra
                    if (filtrosActivos.includes(regionCarta)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
});




