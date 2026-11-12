
//Navegador
alert('Guardado correctamente'); // informa; no devuelve nada
const seguro = confirm('¿Eliminar el elemento?'); // true (Aceptar) o false (Cancelar)
const nombre = prompt('Nombre del elemento', 'Sin título'); // texto, '' o null (Cancelar)


//Abrir ventana modal que bloquea los otros elementos cuando salen
/*
<dialog id="confirmar">
    <h2>¿Eliminar el elemento?</h2>
    <p>Esta acción no se puede deshacer.</p>
    <form method="dialog">
        <button value="cancelar">Cancelar</button>
        <button value="eliminar">Eliminar</button>
    </form>
</dialog>
<button id="borrar">Eliminar</button>
*/

const dialogo = document.getElementById('confirmar');
document.getElementById('borrar').addEventListener('click', () => {
dialogo.showModal(); // lo abre como modal
});
dialogo.addEventListener('close', () => {
// returnValue es el value del botón que cerró el diálogo
if (dialogo.returnValue === 'eliminar') {
    console.log('Eliminado');
} else {
    console.log('Cancelado');
}
});

//Que pida datos pon un <input> dentro del formulario del diálogo y léelo en el evento close
<dialog id="pedirNombre">
<form method="dialog">
<label>Nombre <input id="nombre" required></label>
<button value="ok">Aceptar</button>
</form>
</dialog>
const d = document.getElementById('pedirNombre');
d.addEventListener('close', () => {
if (d.returnValue === 'ok') {
console.log(document.getElementById('nombre').value);
}
});
d.showModal();