document.addEventListener('DOMContentLoaded', initPage)

function initPage(){
  getBeers()
  beerHandler()
}


function getBeers(){
  fetch(`http://localhost:3000/beers`)
  .then(res => res.json())
  .then(data => {
    data.forEach(showBeers)})
}

function showBeers(data){
  let beerContainer = document.querySelector('#list-group')
  let html = `<li data-beer-id="${data.id}" class="list-group-item">${data.name}</li>`
  beerContainer.innerHTML += html
}

function beerHandler(){
  let beerName = document.querySelectorAll('.list-group')
  beerName.forEach(function (name){
    name.addEventListener('click', showDetails)
  })
}

function showDetails(event){
  let id = event.target.dataset.beerId
  fetch(`http://localhost:3000/beers/${id}`)
  .then(resp => resp.json())
  .then(data => {
    data.forEach(addToHtml)})
    console.log(data)
}


// was thinking I needed data from the id in order to add it to the html which is why I used
//another fetch in show details

function addToHtml(data){
  let beerContainer = document.querySelector('#beer-detail')
  let html = `<h1>${data.name}</h1>
  <img src="${data.image_url}">
  <h3>${data.tagline}</h3>
  <textarea>${data.description}</textarea>
  <button id="edit-beer" class="btn btn-info">
    Save
  </button>`

  beerContainer.innerHTML += html
}
