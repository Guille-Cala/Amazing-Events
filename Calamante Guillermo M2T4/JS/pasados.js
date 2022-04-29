async function getEvents() { //defino una función asincrona (lee LINEA por LINEA)
    let response = await fetch("https://amazingeventsapi.herokuapp.com/api/eventos") //lo primero que tiene que hacer la funcion es ESPERAR la carga de un archivo (base de datos)
    let data = await response.json() // espero la transformacion del json
    let events = data.eventos // defino la variable que contiene los eventos
    let date = data.fechaActual // defino la variable que contiene la fecha actual
    return [events, date]
}
const getJson = await getEvents() // espero la ejecución la funcion para cargar los datos del json
var eventos = getJson[0] // defino la variable que contiene un array con los eventos
var fechaHoy = getJson[1] // defino la variable que contiene la fecha

var inputSearch = document.querySelector("#searchInput")
inputSearch.addEventListener("keyup",search)
var busqueda = ""
var datos = []
var past = eventos.filter(card => card.date<fechaHoy)

function search(event){
    busqueda=event.target.value
        datos=past.filter(evento=>evento.name.toLowerCase().includes(busqueda.toLowerCase())||evento.category.toLowerCase().includes(busqueda.toLowerCase()))
    displayTarjeta(datos)
}
function displayTarjeta(datos){
    var display = []
    if(datos == undefined){
        display.push(...past)
    }
    else{display.push(...datos)}
    console.log(display)
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
document.querySelector('#past').innerHTML = templateHtml
 }
displayTarjeta()