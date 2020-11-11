
let seccion = document.getElementById("segundo");
let seccionFavoritos = document.getElementById("favoritos");
let verMasFavoritos = document.getElementById("ver-mas-favoritos");
let galeriaImagenesFavoritos = document.querySelector(".galeria-imagenes-favoritos");
let sinContenido = document.querySelector(".sin-contenido");
let arraySeccionFavoritos;
let contFav; //contador que funciona como un offset

seccion.addEventListener("click", event => {

    event.target.style.color = "#9CAFC3";
    event.target.style.borderBottom = "unset"
    linkGifos.style.color = "";
    linkGifos.style.borderBottom = "";

    botonCrear.style.backgroundColor = ""; //reseteo el boton crear
    botonCrear.style.borderColor = "";
    botonCrear.style.cursor = "";
    spanSuma[0].style.backgroundColor = "";
    spanSuma[1].style.backgroundColor = "";

    seccionPresentacion.style.display = "none";
    seccionBusquedas.style.display = "none";
    seccionGifos.style.display = "none";
    seccionCrearGifos.style.display = "none";
    seccionFavoritos.style.display = "unset";

    if(seccionTrending.style.display = "none") {

        seccionTrending.style.display = "";
    }

    let guardado = localStorage.getItem("favoritos");
    arraySeccionFavoritos = JSON.parse(guardado);

    galeriaImagenesFavoritos.innerHTML = "";
    sinContenido.style.display = "none";

    favoritos(arraySeccionFavoritos);
})

function favoritos(array) {

    if(array == null
       || array.length == 0) {
        
        verMasFavoritos.style.display = "none";
        sinContenido.style.display = "unset";

    }else if(array.length <= 12) {

        let linkDescarga = document.getElementsByClassName("descarga");
        let iconSeccionFavoritos = document.getElementsByClassName("favorito");
        let titulosGifo = document.getElementsByClassName("titulo-gifo");
        let imagenFavoritos = document.getElementsByClassName("gifs");

        for(let r = 0; r < array.length; r++) {

            crearTarjeta(array[r].images.fixed_height_downsampled.url, array[r].title, array[r].username, ".galeria-imagenes-favoritos", "maximizar seccion", "favorito", "descarga", "imagen");

            linkDescarga[r + cont].setAttribute("href", array[r].images.original.url); //cont es porque aparecen después de los iconos de ``Búsquedas´´
            linkDescarga[r +cont].download = "descarga.gif"; 
            
            iconSeccionFavoritos[r + cont].classList.add("seccion");
            iconSeccionFavoritos[r + cont].classList.add("tildado"); //para que ya queden tildados
            iconSeccionFavoritos[r + cont].classList.add("guardado");

            iconSeccionFavoritos[r + cont].setAttribute("src", "images/icon-fav-active.svg");

            imagenFavoritos[r + cont].classList.add("seccion");

            titulosGifo[r + cont].classList.add("seccion");
            
            verMasFavoritos.style.display = "none";
    
        }

    }else if(array.length > 12) {

        contFav = 0;

        let linkDescarga = document.getElementsByClassName("descarga");
        let iconSeccionFavoritos = document.getElementsByClassName("favorito");
        let titulosGifo = document.getElementsByClassName("titulo-gifo");
        let imagenFavoritos = document.getElementsByClassName("gifs");

        for(let r = 0; r < 12; r++) {

            crearTarjeta(array[r].images.fixed_height_downsampled.url, array[r].title, array[r].username, ".galeria-imagenes-favoritos", "maximizar seccion", "favorito", "descarga", "imagen");

            linkDescarga[r + cont].setAttribute("href", array[r].images.original.url);
            linkDescarga[r +cont].download = "descarga.gif"; 
            
            iconSeccionFavoritos[r + cont].classList.add("seccion");
            iconSeccionFavoritos[r + cont].classList.add("tildado"); //para que ya queden tildados
            iconSeccionFavoritos[r + cont].classList.add("guardado");

            iconSeccionFavoritos[r + cont].setAttribute("src", "images/icon-fav-active.svg");

            imagenFavoritos[r + cont].classList.add("seccion");

            titulosGifo[r + cont].classList.add("seccion");

            verMasFavoritos.style.display = "block"; 
        }

        contFav += 12;
    }
}


// FUNCIONAMIENTO DEL BOTÓN VER MÁS DE ``FAVORITOS´´

verMasFavoritos.addEventListener("click", () => {

    if (arraySeccionFavoritos.length > 12) {

        let linkDescarga = document.getElementsByClassName("descarga");
        let iconSeccionFavoritos = document.getElementsByClassName("favorito");
        let titulosGifo = document.getElementsByClassName("titulo-gifo");
        let imagenFavoritos = document.getElementsByClassName("gifs");
        let vueltas;

        for(let r = contFav; r < arraySeccionFavoritos.length; r++) {

            crearTarjeta(arraySeccionFavoritos[r].images.fixed_height_downsampled.url, arraySeccionFavoritos[r].title, arraySeccionFavoritos[r].username, ".galeria-imagenes-favoritos", "maximizar seccion", "favorito", "descarga", "imagen");

            linkDescarga[r + cont].setAttribute("href", arraySeccionFavoritos[r].images.original.url);
            linkDescarga[r +cont].download = "descarga.gif"; 
            
            iconSeccionFavoritos[r + cont].classList.add("seccion");
            iconSeccionFavoritos[r + cont].classList.add("tildado"); //para que ya queden tildados
            iconSeccionFavoritos[r + cont].classList.add("guardado");

            iconSeccionFavoritos[r + cont].setAttribute("src", "images/icon-fav-active.svg");

            imagenFavoritos[r + cont].classList.add("seccion");

            titulosGifo[r + cont].classList.add("seccion");
            
            vueltas = r;
    
        }

        contFav += 12;

        if(contFav > arraySeccionFavoritos.length) {

            verMasFavoritos.style.display = "none"; 
        }
    }
})


// FUNCIÓN PARA BORRAR GIF DE FAVORITOS (Y DE OTRAS SECCIONES) 

let indexFavoritoTrending;
let indexFavorito;
let idSeccionFavorito; //para saber la posicion del gif favorito borrado

function borrarFavoritoSeccion() {

    let iconSeccionFavoritos = document.getElementsByClassName("favorito seccion");
    let indice;

    for(let d = 0; d < iconSeccionFavoritos.length; d++) {

        if(iconSeccionFavoritos[d].className == "favorito seccion guardado") {
 
                iconSeccionFavoritos[d].classList.remove("guardado");
                indice = d;
        }
    }

    idSeccionFavorito = arraySeccionFavoritos[indice].id;

    let indexBorrar;

    for (let l = 0; l < arrayFavoritos.length; l++) {
                        
        if(arrayFavoritos[l].id == idSeccionFavorito) {
                    
            indexBorrar = l;
        }
    }

    arrayFavoritos.splice([indexBorrar], 1); //borro el gif especifico del arrayFavoritos


    //encuentro la posicion del gif borrado en la determianda sección

    let iconFavoritoTrending = document.getElementsByClassName("favorito trending"); //TRENDING GIFOS

    for (let h = 0; h < arrayResultadosTrending.length; h++) {
                        
        if(arrayResultadosTrending[h].id == idSeccionFavorito) {
                    
            indexFavoritoTrending = h;
        }
    }
    
    for (let k = 0; k < arrayResultados.length; k++) {
                        
        if(arrayResultados[k].id == idSeccionFavorito) {
                    
            indexFavorito = k;
        }
    }

    //cambio posicion y/o posicionTrending y borro en su respectiva sección


    if(indexFavoritoTrending != null) {

        iconFavoritoTrending[indexFavoritoTrending].setAttribute("src", "images/icon-fav-hover.svg");
        iconFavoritoTrending[indexFavoritoTrending].classList.remove("tildado");
        iconFavoritoTrending[indexFavoritoTrending].classList.remove("guardado");
        posicionFavTrendMax.splice(posicionFavTrendMax.indexOf(indexFavoritoTrending), 1); //borro la posicion de FavTrendMax
        posicionFavTrend.splice(posicionFavTrend.indexOf(indexFavoritoTrending), 1); //borro la posicion de de FavTrend
    }

    let iconFavorito = document.getElementsByClassName("favorito"); //BUSQUEDAS

    if(indexFavorito != null) {

        posicion = indexFavorito;

        iconFavorito[posicion].setAttribute("src", "images/icon-fav-hover.svg");
        iconFavorito[posicion].classList.remove("tildado");
        iconFavorito[posicion].classList.remove("guardado");
        posicionFav.splice((posicionFav.indexOf(posicion)), 1); //borro la posicion de posicionFav
        posicionFavMax.splice((posicionFavMax.indexOf(posicion)), 1); //borro la posicion de posicionFavMax
    }
}



//FUNCIÓN PARA GUARDAR GIF FAVORITO EN FAVORITOS (Y EN OTRAS SECCIONES)


let posicionFavSeccion; //posicion del gif favorito en ``Favoritos´´ tamaño chico

function guardarFavoritoSeccion() {

    let iconSeccionFavoritos = document.getElementsByClassName("favorito seccion");

    for(let d = 0; d < iconSeccionFavoritos.length; d++) {

        if(iconSeccionFavoritos[d].className == "favorito seccion tildado") {
 
            iconSeccionFavoritos[d].classList.add("guardado");
            arrayFavoritos.push(arraySeccionFavoritos[d]);
            posicionFavSeccion = d; 
        }
    }

    idSeccionFavorito = arraySeccionFavoritos[posicionFavSeccion].id;

    //encuentro la posicion del gif borrado en ``Trending GIFOS´´ (``Búsquedas´´ no hace falta)

    let iconFavoritoTrending = document.getElementsByClassName("favorito trending"); //TRENDING GIFOS

    for (let h = 0; h < arrayResultadosTrending.length; h++) {
                        
        if(arrayResultadosTrending[h].id == idSeccionFavorito) {
                    
            indexFavoritoTrending = h;
        }
    }

    //uso la posicion para guardarlo en su seccion

    if(indexFavoritoTrending != null) {

        iconFavoritoTrending[indexFavoritoTrending].setAttribute("src", "images/icon-fav-active.svg");
        iconFavoritoTrending[indexFavoritoTrending].classList.add("tildado");
        iconFavoritoTrending[indexFavoritoTrending].classList.add("guardado");
        posicionFavTrendMax.push(indexFavoritoTrending); //agregp la posicion en FavTrendMax
        posicionFavTrend.push(indexFavoritoTrending); //agrego la posicion en FavTrend
    }

}


//FUNCIÓN PARA MAXIMIZAR LOS GIFS DE FAVORITOS

let posicionFavSeccionMax; //posicion del gif favorito en ``Favoritos´´ pero maximizado

function maximizarFavorito() {

    let gifMax = document.getElementById("gif-maximizado");
    let imgMaximizar = document.getElementsByClassName("maximizar seccion");
    let imagenSeccion = document.getElementsByClassName("gifs seccion");

    seccionTrending.style.display = "none";
    seccionFavoritos.style.display = "none";
    enFavoritos = true; //para saber que estoy en la sección ``Favoritos´´
    header.style.display = "none";
    footer.style.display = "none";
    gifMax.style.display = "unset";

    for(let l = 0; l < arraySeccionFavoritos.length; l++) {

        if(imgMaximizar[l].className == "maximizar seccion activado"
           || imagenSeccion[l].className == "gifs seccion activado") {


            crearTarjetaMaximizada(arraySeccionFavoritos[l].images.fixed_height.url, arraySeccionFavoritos[l].title, arraySeccionFavoritos[l].username, arraySeccionFavoritos[l].images.original.url, "gifs-max-seccion", "favorito seccion-max", "itemBusqueda");

            posicionFavSeccionMax = l;

            mantenerActivadoSeccion();

            linkClose.setAttribute("href", "#favoritos"); //para luego cerrar e ir a esa sección
            
            return;
        }  
    }
}


// FUNCIÓN PARA MANTENER ACTIVA EL FAVORITO DE LA IMAGEN MAXIMIZADA

function mantenerActivadoSeccion() {

    let iconMaxSeccion = document.querySelector("img#itemBusqueda.favorito.seccion-max");
    let titulo = document.getElementById("item2").textContent;

    for (let h = 0; h < arrayFavoritos.length; h++) {
        
        if(arrayFavoritos[h].title == titulo) {
                            
            if(body.style.backgroundColor == "rgb(55, 56, 60)") { //modo nocturno

                iconMaxSeccion.setAttribute("src", "images/icon-fav-active-noc.svg");
                iconMaxSeccion.classList.add("tildado");
                iconMaxSeccion.classList.add("guardado");
        
            }else {
        
                iconMaxSeccion.setAttribute("src", "images/icon-fav-active.svg");
                iconMaxSeccion.classList.add("tildado");
                iconMaxSeccion.classList.add("guardado");
            }
        }
    }
}


// FUNCIÓN PARA GUARDAR GIF MAXIMIZADO Y PARA BORRARLO EN TODAS LAS SECCIONES (DESDE EL GIF MAXIMIZADO)

function tildarMaxFavorito() {

    let iconFavMax = document.querySelector("img#itemBusqueda.favorito.seccion-max");
    let titulosGifoSeccion = document.getElementsByClassName("titulo-gifo seccion");
    let iconSeccionFavoritos = document.getElementsByClassName("favorito seccion");
    let titulo = document.getElementById("item2").textContent;

    iconFavMax.classList.add("guardado");

    for(let t = 0; t < titulosGifoSeccion.length; t++) {

        if(titulosGifoSeccion[t].textContent == titulo) {

            iconSeccionFavoritos[t].classList.add("tildado");
            iconSeccionFavoritos[t].setAttribute("src", "images/icon-fav-active.svg");
        }
    }

    guardarFavoritoSeccion();
}

function borrarMaxFavorito() {

    let iconFavMax = document.querySelector("img#itemBusqueda.favorito.seccion-max");
    let titulosGifoSeccion = document.getElementsByClassName("titulo-gifo seccion");
    let iconSeccionFavoritos = document.getElementsByClassName("favorito seccion");
    let titulo = document.getElementById("item2").textContent;

    iconFavMax.classList.remove("guardado");

    for(let t = 0; t < titulosGifoSeccion.length; t++) {

        if(titulosGifoSeccion[t].textContent == titulo) {

            iconSeccionFavoritos[t].classList.remove("tildado");
            iconSeccionFavoritos[t].setAttribute("src", "images/icon-fav-hover.svg");
        }
    }

    borrarFavoritoSeccion();
}