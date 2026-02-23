const articulosbutton = document.getElementById('pestaña-articulos')

const blogbutton = document.getElementById('pestaña-blog')

const contenidoarticulos = document.getElementById('contenido-articulos')

const contenidoblog = document.getElementById('contenido-blog')


articulosbutton.addEventListener('click', function(){
    if (articulosbutton.classList.contains('link-carpetas-on')){
        console.log('ya estas en esta pestaña')
        return;
    }else{
        articulosbutton.classList.remove('link-carpetas-off');
        articulosbutton.classList.add('link-carpetas-on');
        blogbutton.classList.remove('link-carpetas-on');
        blogbutton.classList.add('link-carpetas-off');
        contenidoarticulos.classList.remove('oculto');
        contenidoblog.classList.add('oculto');
    }

})

blogbutton.addEventListener('click', function(){
    if (blogbutton.classList.contains('link-carpetas-on')){
        console.log('ya estas en esta pestaña')
        return;
    }else{
        blogbutton.classList.remove('link-carpetas-off');
        blogbutton.classList.add('link-carpetas-on');
        articulosbutton.classList.remove('link-carpetas-on');
        articulosbutton.classList.add('link-carpetas-off');
        contenidoblog.classList.remove('oculto');
        contenidoarticulos  .classList.add('oculto');
    }

})


