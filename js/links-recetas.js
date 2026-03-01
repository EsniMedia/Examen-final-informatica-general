const milanesas = document.getElementById("receta-milanesas")
const empanadas = document.getElementById("receta-empanadas")
const bizcochuelo = document.getElementById("receta-bizcochuelo")

milanesas.addEventListener("click", function(){
    window.location.href = "/gastronomia/milanesas/index.html"
})

empanadas.addEventListener("click", function(){
    window.location.href = "/gastronomia/empanadas/index.html"
})
bizcochuelo.addEventListener("click", function(){
    window.location.href = "/gastronomia/bizcochuelo/index.html"
})