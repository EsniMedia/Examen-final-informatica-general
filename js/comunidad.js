const historia1 = document.getElementById("historia1")
const historia2 = document.getElementById("historia2")
const historia3 = document.getElementById("historia3")
const blog1 = document.getElementById("blog1")
const blog2 = document.getElementById("blog2")
const blog3 = document.getElementById("blog3")
const buscador = document.getElementById('filterSearch');

historia1.addEventListener("click", function(){
    window.location.href = "/comunidad/historia1/index"

})

historia2.addEventListener("click", function(){
    window.location.href = "/comunidad/historia2/index"

})

historia3.addEventListener("click", function(){
    window.location.href = "/comunidad/historia3/index"

})


blog1.addEventListener("click", function(){
    window.location.href = "/comunidad/blog1/index.html"
})

blog2.addEventListener("click", function(){
    window.location.href = "/comunidad/blog2/index.html"
})

blog3.addEventListener("click", function(){
    window.location.href = "/comunidad/blog3/index.html"
})



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




