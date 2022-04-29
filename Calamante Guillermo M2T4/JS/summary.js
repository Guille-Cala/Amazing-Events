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
// console.log(categorias)
eventos.map(evento=>{
    evento.ganancia = evento.price*(evento.assistance||evento.estimate),
    evento.porcientoAsist = Math.round((((evento.assistance||evento.estimate)*100)/evento.capacity)*100)/100
})
// console.log(eventos)
var losDatos = []
function displaySummary(){
    var templateHtml=""
    var porCategoria = []

    categorias.forEach(categoria=>{

        porCategoria.push({
            categoria:categoria,
            eventos:eventos.filter(evento => evento.category === categoria)
        })
    })
        // console.log(porCategoria)
    porCategoria.map(info=>{
        losDatos.push({
            categoria:info.categoria,
            mayorCapacidad: info.eventos.map(item=>item.capacity),
            ganancia: info.eventos.map(item=>item.ganancia),
            percentAsist: info.eventos.map(item=>item.porcientoAsist),
            mayorAsist: info.eventos.map(item=>item.porcientoAsist),
            menorAsist: info.eventos.map(item=>item.porcientoAsist),
        })
    })
    losDatos.forEach(categoria=>{        
        let ingresos = 0
        let asistenciaPromedio = 0              
        categoria.ganancia.forEach(ganancia=>{ingresos+=ganancia})
        categoria.ganancia=ingresos
        categoria.percentAsist.forEach(porciento=>{return asistenciaPromedio+= porciento/categoria.percentAsist.length})
        categoria.percentAsist= Math.round(asistenciaPromedio*100)/100
        categoria.mayorAsist = Math.max(...categoria.mayorAsist)       
        categoria.menorAsist = Math.min(...categoria.menorAsist)
        categoria.mayorCapacidad=Math.max(...categoria.mayorCapacidad)
    })
    // console.log(losDatos)
    losDatos.map(dato=>{
        templateHtml += 
            `
            <tr>
                <td>${dato.categoria}</td>
                <td>${dato.mayorCapacidad}</td>
                <td>${dato.mayorAsist}</td>
                <td>${dato.menorAsist}</td>
                <td>${dato.percentAsist}</td>
                <td>${dato.ganancia}</td>
            </tr>
            `
        document.querySelector('#table-rows').innerHTML = templateHtml
    })
}
displaySummary()