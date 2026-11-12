// 1. Seleccionar un elemento por su ID del HTML
const tituloElemento = document.getElementById("titulo-principal");

// 2. Cambiar su contenido de texto
if (tituloElemento) {
    tituloElemento.textContent = "Catálogo Actualizado";
}

// 3. Añadir un evento (por ejemplo, al hacer clic en un botón)
const botonBorrar = document.getElementById("btn-borrar");

if (botonBorrar) {
    botonBorrar.addEventListener("click", (evento) => {
        const confirmar = confirm("¿Estás seguro de que deseas eliminar este elemento?");
        if (!confirmar) {
            evento.preventDefault(); // Evita que se envíe el formulario si el usuario cancela
        }
    });
}