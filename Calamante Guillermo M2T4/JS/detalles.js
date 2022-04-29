var eventos = []

async function getData(){
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then(response => response.json())
    .then(json => eventos.push(...json.eventos))

    var id = location.search.split("?id=").filter(Number)
    var selectedId = Number(id[0])
    var tarjeta = eventos.find(function(tarjeta){
        return tarjeta.id == selectedId
    })
    var templateHtml =
    `    
    <div>
        <img src="${tarjeta.image}" alt="${tarjeta.image}">
        <div>
            <h2 class="texto-tarj">${tarjeta.name}</h2>
            <p class="texto-tarj">${tarjeta.date} - ${tarjeta.place}</p>
            <h4 class="texto-tarj">${tarjeta.category}</h4>
            <h4 class="texto-tarj">${tarjeta.description}</h4>
            <p class="texto-tarj">Capacidad: ${tarjeta.capacity} - Vendidos: ${tarjeta.estimate || tarjeta.assistance}</p>
            <h3 class="texto-tarj">Precio: $${tarjeta.price}</h3>
        </div>
    </div>
    `
document.querySelector('#detalles').innerHTML = templateHtml
}
getData()

