let productosEnCarrito = localStorage.getItem("productos-en-carrito")
productosEnCarrito=JSON.parse(productosEnCarrito)

const contenedorCarritoVacio = document.querySelector("#carrito-vacio")
const contenedorCarritoProductos = document.querySelector("#carrito-productos")
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones")
const contenedorCarritocomprado = document.querySelector("#carrito-comprado")
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")
const botonVaciar = document.querySelector("#carrito-acciones-vaciar")
const contenedorTotal = document.querySelector("#total")

function cargarProductosCarrito(){
    if (productosEnCarrito && productosEnCarrito.length > 0) {
    
    contenedorCarritoVacio.classList.add("disabled")
    contenedorCarritoProductos.classList.remove("disabled")
    contenedorCarritoAcciones.classList.remove("disabled")
    contenedorCarritocomprado.classList.add("disabled")
    
    contenedorCarritoProductos.innerHTML="";

    productosEnCarrito.forEach(producto => {
        
    
    const div = document.createElement("div")
    div.classList.add("carrito-producto")
    div.innerHTML = `<img class="carrito-producto-imagen" src="${producto.imagen}" alt= "${producto.titulo}">
            <div class="carrito-producto-titulo">
                <small>titulo</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carrito-producto-cantidad">
                <small>cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <small>precio</small>
                <p>${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>subtotal</small>
                <p>${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito-producto-eliminar" id="${producto.id}">
                <i class="bi bi-trash3-fill"></i></button>`

            contenedorCarritoProductos.append(div)

            });

    } else {
    contenedorCarritoVacio.classList.remove("disabled")
    contenedorCarritoProductos.classList.add("disabled")
    contenedorCarritoAcciones.classList.add("disabled")
    contenedorCarritocomprado.classList.add("disabled")
    }
    actualizarBotonesEliminar()
    actualizarTotal()
}

cargarProductosCarrito()



function actualizarBotonesEliminar(){
    botonesEliminar=document.querySelectorAll(".carrito-producto-eliminar")

    botonesEliminar.forEach(boton =>{
        boton.addEventListener("click", eliminarDelCarrrito)
    })        
}
function eliminarDelCarrrito(e){
    const idBoton = e.currentTarget.id
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
   
    productosEnCarrito.splice(index, 1)
    cargarProductosCarrito()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

botonVaciar.addEventListener("click", vaciarCarrito)

function vaciarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
    cargarProductosCarrito()
}

function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)
    total.innerText = `${totalCalculado}`
}
