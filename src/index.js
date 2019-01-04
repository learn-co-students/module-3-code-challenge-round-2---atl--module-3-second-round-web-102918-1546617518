document.addEventListener('DOMContentLoaded', initPage)

function initPage() {
  fetchBeers()
}

function fetchBeers() {
  fetch('http://localhost:3000/beers').then(function (response) {
    return response.json()
  }).then(function (json){
    json.forEach(renderBeerList)
    var listItems = document.querySelectorAll(".list-group-item")
    listItems.forEach(addClickHandler)
  })
}

function addClickHandler(name) {
name.addEventListener('click', renderBeerDetails)
}

function renderBeerList(json) {
  let list = document.querySelector('#list-group')
  let beersListHtml = `<li class="list-group-item"
    data-name="${json.name}"
    data-description="${json.description}"
    data-image_url="${json.image_url}"
    data-tagline="${json.tagline}"
    data-tagline="${json.id}"
    >
    ${json.name}</li>`

  list.innerHTML += beersListHtml
}

function addEditEventListner() {
  var descriptionValue = document.querySelector("#beer-detail > textarea")
  form.addEventListener('submit', editBeerDescription)
}


function editBeerDescription(event){
  event.preventDefault()
  debugger
  let description = document.querySelector("#beer-detail > textarea").value
  let request = new Request(`http://localhost:3000/beers/${event.target.dataset.id}`)
  let options = {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      description: description
    })
  }
    fetch(request, options)
  }


function renderBeerDetails(event) {
let detailsContainer = document.querySelector('#beer-detail')
let beerHTML = `<h1>${event.target.dataset.name}</h1>
<img src="${event.target.dataset.image_url}">
<h3>${event.target.dataset.tagline}</h3>
<textarea></textarea>
<button id="edit-beer" class="btn btn-info">
  Save Your Changes
</button>`
detailsContainer.innerHTML = beerHTML

let button = document.querySelector('#edit-beer')
button.addEventListener('click', editBeerDescription)
}
