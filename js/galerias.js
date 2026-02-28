// Seleccionamos todos los carruseles que tengan data-region
document.querySelectorAll('.carrusel-individual').forEach(cuadro => {
    cuadro.addEventListener('click', (e) => {
        // Si el click no fue en un control...
        if (!e.target.closest('.carousel-control-next') && !e.target.closest('.carousel-control-prev')) {
            // Obtenemos la región (caba, jujuy, etc) y armamos la URL automáticamente
            const provincia = cuadro.getAttribute('data-provincia').toLowerCase();
            window.location.href = `${provincia}/index.html`;
        }
    });
});