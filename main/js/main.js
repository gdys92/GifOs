

////crear gifos
document.getElementById("make-gifs").onclick = function() {
  window.location.href = "http://file:///C:/Gledys-Muguerza-Gifos/videos/crear-gifos";
};


////Themes
var them1 = document.getElementById("tema1");
var them2 = document.getElementById("tema2");
them1.addEventListener("click", function() {
  document.body.style.backgroundColor = "#FFF4FD";
  document.body.style.color = "#110038";
  document.querySelector(".logo").src = "./images/gifOF_logo.png";
  document.querySelector(".header")
})
them2.addEventListener("click", function(){
  document.body.style.backgroundColor = "#110038";
  document.body.style.color = "#FFFFFF"
  document.querySelector(".logo").src = "./images/gifOF_logo_dark.png";
})
 
////Search box////
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const resultsEl = document.getElementById('results')
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const q = searchInput.value
    search(q)
  }) 

function search(q) {
const apikey = '6649Pbqc4KTauggEW8EoUN7pgqbw3g9R'
const path = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=24&offset=0&rating=G&lang=en`

  fetch(path).then(function(res) {
     return res.json()
  }).then(function(json) {
    console.log(json.data[0].images.original.url)
    
    let resultsHTML = ''
   
    json.data.forEach(function(obj) {
      console.log(obj)

      const url = obj.images.original.url
      const width = obj.images.original.width
      const height = obj.images.original
      const title = obj.title
      resultsHTML += `<img 
      class="item"
      src="${url}" 
      widht="${width}" 
      height="${height}"
      alt="${title}">`
    })
   
    resultsEl.innerHTML = resultsHTML
  }).catch(function(err) {
    console.log(err.message)
  })

  }

  ////Tendencias/////
const trendingEl = document.getElementById('trending')
const q = 'trending'
const apikey = '6649Pbqc4KTauggEW8EoUN7pgqbw3g9R'
const path = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=24&offset=0&rating=G&lang=en`

  fetch(path).then(function(res) {
     return res.json()
  }).then(function(json) {
    console.log(json.data[0].images.original.url)
 
    let resultsHTML = ''
   
   json.data.forEach(function(obj) {
     console.log(obj)

     const url = obj.images.original.url
     const width = obj.images.original.width
     const height = obj.images.original
     const title = obj.title
     resultsHTML += `<img 
     class="item2"
     src="${url}" 
     widht="${width}" 
     height="${height}"
     alt="${title}">`
   })
  
   trendingEl.innerHTML = resultsHTML
 }).catch(function(err) {
   console.log(err.message)
 })


////Icono X de Sugerencias
var hide = document.getElementById("close-button1");
var hide2 = document.getElementById("close-button2");
var hide3 = document.getElementById("close-button3");
var hide4 = document.getElementById("close-button4");
hide.addEventListener("click", function(){
  document.getElementById("close").style.display = "none";
});
hide2.addEventListener("click", function(){
  document.getElementById("close2").style.display = "none";
});
hide3.addEventListener("click", function(){
  document.getElementById("close3").style.display = "none";
});
hide4.addEventListener("click", function(){
  document.getElementById("close4").style.display = "none";
});

////Botones de sugerencias



