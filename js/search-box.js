
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