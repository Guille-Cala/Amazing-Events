async function getEvents(){ 
    let response = await fetch("https://amazingeventsapi.herokuapp.com/api/eventos") 
    let data = await response.json() 
    let events = data.eventos
    var separo = events.map(evento => evento.category)
    var categoryArray = new Set(separo)
    categorias = [...categoryArray] 
    return [events, categorias]
}
const getJson = await getEvents()
var eventos = getJson[0]
var categorias = getJson[1]
console.log(categorias)
console.log(eventos)

function printOptions(){
var inputOption = ""
var optionDefault = ""
categorias.forEach(categoria => {
    inputOption +=`<option value="${categoria}">${categoria}</option>`
})
optionDefault=`<option value="">Seleccionar categoría</option>`
document.querySelector('.category-search').innerHTML=optionDefault+inputOption
}
printOptions()

var inputSelect = document.querySelector(".select")
var inputSearch = document.querySelector("#searchInput")
inputSelect.addEventListener("change",select)
inputSearch.addEventListener("keyup",search)

var busqueda = ""
var datos = []
var parametro = ""

function select(event){
    parametro = event.target.value
    if(parametro == "" || parametro == undefined){
        if(busqueda == "" || busqueda == undefined){
        datos=eventos
        }else{
            datos=eventos.filter(evento=>evento.name.toLowerCase().includes(busqueda.toLowerCase()))
        }
    }else{
        if(busqueda == "" || busqueda == undefined){
            datos=eventos.filter(evento=>evento.category==parametro)
        }else{
            datos=eventos.filter(evento=>evento.category == parametro && evento.name.toLowerCase().includes(busqueda.toLowerCase()))
        }
    }
    displayTarjeta(datos)
    // console.log(parametro)
    return parametro
}
function search(event){
    busqueda=event.target.value
    if(parametro == "" || parametro == undefined){
        datos=eventos.filter(evento=>evento.name.toLowerCase().includes(busqueda.toLowerCase()))
    }else{
        datos=eventos.filter(evento=>evento.category == parametro && evento.name.toLowerCase().includes(busqueda.toLowerCase()))
    }
    displayTarjeta(datos)
    console.log(parametro)
    console.log(busqueda)
    return busqueda
}
function displayTarjeta(datos){
    var display = []
    if(datos == undefined){
        display.push(...eventos)
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
document.querySelector('.tarjetero').innerHTML = templateHtml
}
displayTarjeta()