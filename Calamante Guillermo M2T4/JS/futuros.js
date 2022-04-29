async function getEvents() { 
    let response = await fetch("https://amazingeventsapi.herokuapp.com/api/eventos") 
    let data = await response.json() 
    let events = data.eventos 
    let date = data.fechaActual 
    return [events, date]
}

const getJson = await getEvents()
var eventos = getJson[0]
var fechaHoy = getJson[1]

var inputSearch = document.querySelector("#searchInput")
inputSearch.addEventListener("keyup",search)
var busqueda = ""
var datos = []
var future = eventos.filter(card => card.date>fechaHoy)

function search(event){
    busqueda=event.target.value
        datos=future.filter(evento=>evento.name.toLowerCase().includes(busqueda.toLowerCase())||evento.category.toLowerCase().includes(busqueda.toLowerCase()))
    displayTarjeta(datos)
}
function displayTarjeta(datos){
    var display = []
    if(datos == undefined){
        display.push(...future)
    }
    else{display.push(...datos)}
    var templateHtml=""
    display.map(dato =>{
        templateHtml += 
        `
        <div class="tarjeta">
        <a href="detalles.html?id=${dato.id}">
            <img src="${dato.image}" alt="${dato.image}">
        </a>
            <div>
            <a href="detalles.html?id=${dato.id}">
                    <h2 class="texto-tarj">${dato.name}</h2>
                    <p class="texto-tarj">${dato.date} - ${dato.place}</p>
                    <h4 class="texto-tarj">${dato.category}</h4>
                </a>
            </div>
        </div>
        `
    })
document.querySelector('#future').innerHTML = templateHtml
 }
displayTarjeta()