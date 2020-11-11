let linkGifos = document.getElementById("tercero");
let seccionGifos = document.getElementById("mis-gifos");
let verMasGifos = document.getElementById("ver-mas-gifos");
let galeriaImagenesGifos = document.querySelector(".galeria-gifos");
let sinContenidoGifos = document.querySelector(".sin-gifos");
let arraySeccionGifos;
let contGif; //contador que funciona como un offset

linkGifos.addEventListener("click", event => {

    event.target.style.color = "#9CAFC3";
    event.target.style.borderBottom = "unset"
    seccion.style.color = "";
    seccion.style.borderBottom = "";

    botonCrear.style.backgroundColor = ""; //reseteo el boton crear
    botonCrear.style.borderColor = "";
    botonCrear.style.cursor = "";
    spanSuma[0].style.backgroundColor = "";
    spanSuma[1].style.backgroundColor = "";

    seccionPresentacion.style.display = "none";
    seccionBusquedas.style.display = "none";
    seccionFavoritos.style.display = "none";
    seccionCrearGifos.style.display = "none";
    seccionGifos.style.display = "unset";

    if(seccionTrending.style.display = "none") {

        seccionTrending.style.display = "";
    }

    let gifos = localStorage.getItem("gifos");
    arraySeccionGifos = JSON.parse(gifos);

    galeriaImagenesGifos.innerHTML = "";
    sinContenidoGifos.style.display = "none";

    mostrarGifos(arraySeccionGifos);
})

function mostrarGifos(array) { //es como la funcion favoritos() pero modificada en algunas partes

    if(array == null
       || array.length == 0) {
        
        verMasGifos.style.display = "none";
        sinContenidoGifos.style.display = "unset";

    }else if(array.length <= 12) {

        for(let r = 0; r < array.length; r++) {

            crearTarjeta(array[r].images.fixed_height_downsampled.url, array[r].title, array[r].username, ".galeria-gifos", "maximizar gifos", "eliminar", "descarga-gifos", "imagen-gifos");

            let linkDescargaGifos = document.getElementsByClassName("descarga-gifos");
            let iconEliminar = document.getElementsByClassName("eliminar");

            linkDescargaGifos[r].setAttribute("href", array[r].images.original.url);
            linkDescargaGifos[r].download = "descarga.gif"; 

            iconEliminar[r].setAttribute("src", "images/icon_trash.svg");
            
            verMasGifos.style.display = "none";
    
        }

    }else if(array.length > 12) {

        contGif = 0;

        for(let r = 0; r < 12; r++) {

            crearTarjeta(array[r].images.fixed_height_downsampled.url, array[r].title, array[r].username, ".galeria-gifos", "maximizar gifos", "eliminar", "descarga-gifos", "imagen-gifos");

            let linkDescargaGifos = document.getElementsByClassName("descarga-gifos");
            let iconEliminar = document.getElementsByClassName("eliminar");

            linkDescargaGifos[r].setAttribute("href", array[r].images.original.url);
            linkDescargaGifos[r].download = "descarga.gif"; 

            iconEliminar[r].setAttribute("src", "images/icon_trash.svg");

            verMasGifos.style.display = "block"; 
        }

        contGif += 12;
    }
}



// FUNCIONAMIENTO DEL BOTÓN VER MÁS DE ``MIS GIFOS´´

verMasGifos.addEventListener("click", () => {

    if (arraySeccionGifos.length > 12) {

        let vueltas;

        for(let r = contGif; r < arraySeccionGifos.length; r++) {

            crearTarjeta(arraySeccionGifos[r].images.fixed_height_downsampled.url, arraySeccionGifos[r].title, arraySeccionGifos[r].username, ".galeria-imagenes-favoritos", "maximizar seccion", "eliminar", "descarga-gifos", "imagen-gifos");

            let linkDescargaGifos = document.getElementsByClassName("descarga-gifos");
            let iconEliminar = document.getElementsByClassName("eliminar");

            linkDescargaGifos[r].setAttribute("href", arraySeccionGifos[r].images.original.url);
            linkDescargaGifos[r].download = "descarga.gif"; 

            iconEliminar[r].setAttribute("src", "images/icon_trash.svg");
            
            vueltas = r;
    
        }

        contGif += 12;

        if(contGif > arraySeccionGifos.length) {

            verMasGifos.style.display = "none"; 
        }
    }
})



// FUNCION PARA ELIMINAR GIFO

function eliminarGifo() {

    let iconEliminar = document.getElementsByClassName("eliminar");
    let divImagenGifos = document.getElementsByClassName("imagen-gifos");
    let imagenMaxGifos = document.getElementsByClassName("gifs-max-gifos");
    let gifMax = document.getElementById("gif-maximizado");
    let galeriaImagenesMax = document.getElementById("galeria-max");

    if(imagenMaxGifos.length != 0) {

        gifMax.style.display = "none";
        galeriaImagenesMax.innerHTML = "";
        seccionGifos.style.display = "unset";
        header.style.display = "";
        footer.style.display = "";
        seccionTrending.style.display = "";
        enGifos = false;

        for(let p = 0; p < iconEliminar.length; p++) {

            iconEliminar[posicionGifo].classList.add("activado");
        }
    }

    for(let e = 0; e < iconEliminar.length; e++) {

        if(iconEliminar[e].className = "eliminar activado") {

            divImagenGifos[e].remove();
            arraySeccionGifos.splice([e], 1);
            arrayMisGifos.splice([e], 1);
            localStorage.setItem("gifos", JSON.stringify(arrayMisGifos)); //guardo la nueva información

            if(arrayMisGifos.length == 0) {

                sinContenidoGifos.style.display = "unset";
            }

            return;
        }
            
    }
}



//FUNCION PARA MAXIMIZAR GIFO

let posicionGifo; //posicion del gif favorito en ``Favoritos´´ pero maximizado

function maximizarGifo() {

    let gifMax = document.getElementById("gif-maximizado");
    let imgMaximizar = document.getElementsByClassName("maximizar gifos");

    seccionTrending.style.display = "none";
    seccionGifos.style.display = "none"
    enGifos = true; //para saber que estoy en la seccion ``Gifos´´
    header.style.display = "none";
    footer.style.display = "none";
    gifMax.style.display = "unset";

    for(let l = 0; l < arraySeccionGifos.length; l++) {

        if(imgMaximizar[l].className == "maximizar gifos activado") {

            crearTarjetaMaximizada(arraySeccionGifos[l].images.fixed_height.url, arraySeccionGifos[l].title, arraySeccionGifos[l].username, arraySeccionGifos[l].images.original.url, "gifs-max-gifos", "eliminar-max", "itemBusqueda");

            let iconEliminar = document.querySelector(".eliminar-max");

            iconEliminar.setAttribute("src", "images/icon_trash.svg");

            posicionGifo= l;

            linkClose.setAttribute("href", "#mis-gifos"); //para luego cerrar e ir a esa sección
            
            return;
        }  
    }
}




    