let botonCrear = document.getElementById("crear");
let spanSuma = document.getElementsByClassName("suma");
let pasos = document.getElementById("pasos");
let paso1 = document.getElementById("paso1");
let paso2 = document.getElementById("paso2");
let paso3 = document.getElementById("paso3");
let divVideo = document.getElementById("div-video");
let video = document.createElement("video");
video.className = "video-player";

let subiendo = document.createElement("p"); //texto que aparece una vez que se está subiendo el gif
let subiendoImg = document.createElement("img");
let contenedor = document.createElement("div");
let divDescarga = document.createElement("div");
let divLink = document.createElement("div");
let linkDescarga = document.createElement("a");
let linkGifo = document.createElement("a");
let iconDescarga = document.createElement("img");
let iconLink = document.createElement("img");
subiendo.className = "subiendo";
subiendo.textContent = "Estamos subiendo tu GIFO";
subiendoImg.className = "subiendo-imagen";
subiendoImg.setAttribute("src", "images/loader.svg");
contenedor.appendChild(divDescarga);
contenedor.appendChild(divLink);
divDescarga.appendChild(linkDescarga);
divLink.appendChild(linkGifo);
linkDescarga.appendChild(iconDescarga);
linkGifo.appendChild(iconLink);
contenedor.className = "contenedor-gifo";
divDescarga.className = "icon"; //los mismos que uso en los cards
divLink.className = "icon";
linkDescarga.className = "descarga-gifo";
linkGifo.className = "link-gifo";
iconDescarga.className = "img-descarga";
iconLink.className = "img-link";
linkDescarga.setAttribute("target", "_blank");
linkGifo.setAttribute("target", "_blank");
iconDescarga.setAttribute("src", "images/icon-download.svg");
iconLink.setAttribute("src", "images/icon-link.svg");

let arrayMisGifos = []; //array con los gifos creados

if(localStorage.getItem("gifos") != undefined) {

    let gifosGuardados = localStorage.getItem("gifos");
    arrayMisGifos = JSON.parse(gifosGuardados);
}

let seccionCrearGifos = document.getElementById("crear-gifos");

botonCrear.addEventListener("click", event => {

    seccionPresentacion.style.display = "none";
    seccionTrending.style.display = "none";
    seccionBusquedas.style.display = "none";
    seccionFavoritos.style.display = "none";
    seccionGifos.style.display = "none";

    seccionCrearGifos.style.display = "unset";

    botonCrear.style.backgroundColor = "#9CAFC3";
    botonCrear.style.borderColor = "#9CAFC3";
    botonCrear.style.cursor = "initial";
    spanSuma[0].style.backgroundColor = "white";
    spanSuma[1].style.backgroundColor = "white";

    seccion.style.color = "";
    seccion.style.borderBottom = "";
    linkGifos.style.color = "";
    linkGifos.style.borderBottom = "";

})

let botonComenzar = document.getElementById("comenzar");

botonComenzar.addEventListener("click", event => {

    if(botonComenzar.textContent == "GRABAR") {

        video.play();
        recorder.startRecording();
        timer();
        botonComenzar.textContent = "FINALIZAR"
        return

    }else if (botonComenzar.textContent == "FINALIZAR") {

        video.pause();
        cronometro.innerHTML = "";
        cronometro.classList.add("timer-off");
        cronometro.style.width = "9rem";
        pasos.style.marginRight = "1%";
        cronometro.textContent = "REPETIR CAPTURA";
        recorder.stopRecording();
        track.stop(); // apago la cámara
        botonComenzar.textContent = "SUBIR GIFO";
        return

    }else if (botonComenzar.textContent == "SUBIR GIFO") {

        botonComenzar.style.visibility = "hidden";

        if(body.style.backgroundColor == "rgb(55, 56, 60)") { //modo nocturno

            paso2.style.color = "white";
            paso2.style.backgroundColor = "rgb(55, 56, 60)";
            paso3.style.color = "black";
            paso3.style.backgroundColor = "white";

        }else {

            paso2.style.color = "#572EE5";
            paso2.style.backgroundColor = "white";
            paso3.style.color = "white";
            paso3.style.backgroundColor = "#572EE5";

        }
        
        cronometro.innerHTML = "";
        cronometro.classList.remove("timer-off");
        cronometro.style.width = "7rem";
        pasos.style.marginRight = "29%";

        divVideo.style.backgroundColor = "#572EE5";
        video.style.opacity = "0.6";
        divVideo.appendChild(subiendo);
        divVideo.appendChild(subiendoImg);

        let form = new FormData();

        form.append('file', recorder.getBlob(), 'myGif.gif');

        console.log(form.get('file')); //para chequear que el objeto FormData se creó correctamente

        fetch("https://upload.giphy.com/v1/gifs?api_key=6649Pbqc4KTauggEW8EoUN7pgqbw3g9R", {
            method: "POST",
            body: form
        })
        .then(response => {

            let data = response.json();
            return data;
        })
        .then(resp => {

            let idGifo = resp.data.id; //guardo el id 

            fetch(`https://api.giphy.com/v1/gifs/${idGifo}?api_key=6649Pbqc4KTauggEW8EoUN7pgqbw3g9R`)
            .then(response => 

                response.json())

            .then(resp => {

                subiendo.textContent = "GIFO subido con éxito";
                subiendo.style.left = "13rem";
                subiendoImg.setAttribute("src", "images/check.svg");
                divVideo.appendChild(contenedor);
                linkDescarga.setAttribute("download", "descarga.gif");
                linkDescarga.setAttribute("href", resp.data.images.original.url);
                linkGifo.setAttribute("href", resp.data.url);

                arrayMisGifos.push(resp.data);
                localStorage.setItem("gifos", JSON.stringify(arrayMisGifos)); //guardo la info del gifo

            })   
        })
        .catch(err => {

            console.error("No se pudo subir el gif")
        })

        return;
    }

    if(body.style.backgroundColor == "rgb(55, 56, 60)") { //modo nocturno

        paso1.style.color = "black";
        paso1.style.backgroundColor = "white";

    }else {

        paso1.style.color = "white";
        paso1.style.backgroundColor = "#572EE5";

    }

    let titulo1 = document.querySelector(".titulo-crear");
    let titulo2 = document.querySelector(".titulo-crear2");
    let parrafoCrear = document.getElementsByClassName("parrafo-crear");

    titulo1.textContent = "¿Nos das acceso";
    titulo2.className = "titulo-crear-modificado";
    titulo2.textContent = "a tu cámara?";
    parrafoCrear[0].textContent = "El acceso a tu cámara será válido sólo"
    parrafoCrear[1].textContent = "por el tiempo en el que estés creando el GIFO."


    getStreamAndRecord(); //abre la cámara
})



// FUNCIÓN PARA USAR LA CÁMARA Y PREPARAR EL PASO 2

let recorder; //para luego usar el objeto recorder
let track;

function getStreamAndRecord() { 

        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                
                height: { max: 480 }
            }

        })
        .then(function(stream) {

        video.srcObject = stream;

        track = stream.getTracks()[0]; // para parar la cámara cuando todo haya finalizado

        recorder = RecordRTC(stream, { //OBJETO RECORDER
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function() {
                console.log('started') //avisa que arranco la grabación
            },
        });

        divVideo.innerHTML = "";
        divVideo.appendChild(video);
        divVideo.className = "div-video-encendido"

        if(body.style.backgroundColor == "rgb(55, 56, 60)") { //modo nocturno

            paso1.style.color = "white";
            paso1.style.backgroundColor = "rgb(55, 56, 60)";
            paso2.style.color = "black";
            paso2.style.backgroundColor = "white";

        }else {

            paso1.style.color = "#572EE5";
            paso1.style.backgroundColor = "white";
            paso2.style.color = "white";
            paso2.style.backgroundColor = "#572EE5";

        }
        
        botonComenzar.textContent = "GRABAR"

        video.pause();

        }).catch(function(error) {

            console.error("Algo salió mal")
        })
 
}


// FUNCIÓN CRONÓMETRO

let cronometro = document.querySelector(".timer");

function timer() {

    let contMinutos1 = 0;
    let contMinutos2 = 0;
    let contSegundos1 = 0;
    let contSegundos2 = 0;

    let horas1 = document.createElement("span");
    let horas2 = document.createElement("span");
    let separacion1 = document.createElement("span");
    let minutos1 = document.createElement("span");
    let minutos2 = document.createElement("span");
    let separacion2 = document.createElement("span")
    let segundos1 = document.createElement("span");
    let segundos2 = document.createElement("span");

    cronometro.appendChild(horas1);
    cronometro.appendChild(horas2);
    cronometro.appendChild(separacion1);
    cronometro.appendChild(minutos1);
    cronometro.appendChild(minutos2);
    cronometro.appendChild(separacion2);
    cronometro.appendChild(segundos1);
    cronometro.appendChild(segundos2);

    horas1.textContent = "0";
    horas2.textContent = "0";
    separacion1.textContent = ":";
    minutos1.textContent = "0";
    minutos2.textContent = "0";
    separacion2.textContent = ":";
    segundos1.textContent = "0";
    segundos2.textContent = "0";

    cronometro.style.display = "unset";

    window.setInterval(function(){

        contSegundos2++;
        segundos2.innerHTML = contSegundos2; 

        if(contSegundos2 == 10) {

            contSegundos2 = 0;
            segundos2.innerHTML = contSegundos2; 
            contSegundos1++;
            segundos1.innerHTML = contSegundos1;

            if(contSegundos1 == 6) {

                contSegundos1 = 0;
                segundos1.innerHTML = contSegundos1;
                contMinutos2++;
                minutos2.innerHTML = contMinutos2;

                if(contMinutos2 == 10) {

                    contMinutos2 = 0;
                    minutos2.innerHTML = contMinutos2;
                    contMinutos1++;
                    minutos1.innerHTML = contMinutos1;
                }
            }
        }
        
    }, 1000);
    
}

// REPETIR CAPTURA

document.addEventListener("click", event => {

    if(event.target.className == "timer timer-off") {

            cronometro.innerHTML = "";
            cronometro.classList.remove("timer-off");
            cronometro.style.width = "7rem";
            pasos.style.marginRight = "1%";
            getStreamAndRecord(); 
    }
})