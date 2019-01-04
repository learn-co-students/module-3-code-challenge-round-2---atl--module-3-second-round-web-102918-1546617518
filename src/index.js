const URL = `http://localhost:3000/beers`

document.addEventListener('DOMContentLoaded', initPage)

function initPage(){
  fetchBeer()
}

//use json-server to fetch information on beer
function fetchBeer(){
  fetch(URL)
  .then(resp => resp.json())
  .then(json => renderBeer(json))
}

//set up to render intial beer list
function renderBeer(json){

  let beers = document.querySelector(".list-group")

  let beerHTML = ""

  json.forEach(list => beerHTML += `<li class="list-group-item" data-name="${list.name}" data-id="${list.id}" data-tagline="${list.tagline}" data-brewed="${list.first_brewed}" data-description="${list.description}" data-url="${list.image_url}" data-pairing="${list.food_pairing}" data-tips="${list.brewers_tips}" data-contributed=${list.contributed_by} > ${list.name}</li>`)

  beers.innerHTML += beerHTML

  beerDetailHandler()
}

function beerDetailHandler(){
  let beerBtn = document.querySelectorAll('.list-group-item')
  beerBtn.forEach(btn => btn.addEventListener('click', beerDetails))
}

//used datasets from renderBeer in order to interact with beerDetailHandler and display beer details
function beerDetails(e){

  let details = document.querySelector("#beer-detail")

  let dataset = e.target.dataset

  let name = dataset.name
  let img = dataset.url
  let tagline = dataset.tagline
  let description = dataset.description
  let id = dataset.id



  detailsHTML = `<h1>${name}</h1>
    <img src="${img}">
    <h3>${tagline}</h3>
    <textarea class="textarea">${description}</textarea>
    <button id="edit-beer" class="btn btn-info">
    Save
    </button>`

    details.innerHTML = detailsHTML

updateDescriptionHandler()
}


//not sure how to get to submit from textarea
function updateDescriptionHandler(){
  let saveBtn = document.querySelector('#edit-beer')
  saveBtn.addEventListener('submit', editDescitpion)
}

//set up to edit textarea description
function editDescitpion(e){
debugger
  e.preventDefault()

  let description = e.target.value
  let textarea = document.querySelector('.textarea')
  let textareaHTML = `<textarea class="textarea">${description}</textarea>`

  textarea.innerHTML = textareaHTML

  e.target.reset()
  patchDescription(id, description)
}

//use editDescitpion variables to patch data into database
function patchDescription(id, description){
  let request = new Request(`http://localhost:3000/beers/${id}`)
  let options = {
    method: 'PATCH',
    headers:   {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    description: description
  })
  }
  fetch(request, options)
}
