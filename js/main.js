import {database} from './database.js'

window.onload=inicializar

let i=0
let titulo, autor, ISBN, fecha, portada


function inicializar(){
    titulo=document.getElementById('Titulo')
    autor=document.getElementById('Autor')
    ISBN=document.getElementById('ISBN')
    fecha=document.getElementById('Fecha')
    portada=document.getElementById('Portada')


    let siguiente = document.getElementById('siguiente')
    let atras = document.getElementById('atras')
    let buscar = document.getElementById('buscar')
    
    cargarDatos()

    siguiente.addEventListener('click', ()=>{
        if(i<database.length-1){
            i++
            cargarDatos()
        }
        else{
            i=0
            cargarDatos()
        }
    })

        atras.addEventListener('click', ()=>{
        if(i>0){
            i--
            cargarDatos()
        }
        else{
            i=database.length-1
            cargarDatos()
        }
    })

    buscar.addEventListener('click', buscarLibro)
    
}

function cargarDatos(){



    titulo.value=database[i].titulo
    autor.value=database[i].autor
    ISBN.value=database[i].isbn
    fecha.value=database[i].fecha

    portada.src=`https://covers.openlibrary.org/b/id/${database[i].filename}`

}

function buscarLibro(){
    const currentISBN=ISBN.value
    fetch('https://openlibrary.org/search.json?q=isbn:'+currentISBN)
    .then(r=> r.json())
    .then(libroJSON=> {
        console.log(libroJSON)
        let libro = mapear(libroJSON)
        database.push(libro)
        i=database.length-1
        cargarDatos()
    })
    
}

function mapear(json){
    let datos= json.docs[0]
    let autores= datos.author_name || []
    let libro={
        "isbn": json.q.split(':')[1],
        "autor": autores.join(', '),
        "fecha": datos.first_publish_year,
        "titulo":  datos.title,
        "filename": datos.cover_i+'-M.jpg'
    }
    return libro
}