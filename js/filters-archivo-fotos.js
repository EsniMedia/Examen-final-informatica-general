document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.form-check-input');
    const fotos = document.querySelectorAll('.foto-individual');
    const buscador = document.getElementById('filterSearch');

    function filtrarGaleria() {
        // 1. Obtener categorías seleccionadas
        const categoriasActivas = Array.from(checkboxes)
            .filter(i => i.checked)
            .map(i => i.value.toLowerCase());

        // 2. Obtener texto del buscador
        const textoBusqueda = buscador.value.toLowerCase();

        fotos.forEach(foto => {
            // Sacamos la categoría del data-attribute
            const categoriaFoto = (foto.getAttribute('data-category') || "").toLowerCase();
            // Sacamos el texto del alt de la imagen para que el buscador funcione con eso
            const textoFoto = foto.querySelector('img').getAttribute('alt').toLowerCase();

            // Lógica de coincidencia
            const coincideCategoria = categoriasActivas.length === 0 || categoriasActivas.includes(categoriaFoto);
            const coincideBusqueda = textoFoto.includes(textoBusqueda);

            // Mostrar u ocultar
            if (coincideCategoria && coincideBusqueda) {
                foto.style.display = 'block';
            } else {
                foto.style.display = 'none';
            }
        });
    }

    // Eventos
    checkboxes.forEach(cb => cb.addEventListener('change', filtrarGaleria));
    buscador.addEventListener('input', filtrarGaleria);
});