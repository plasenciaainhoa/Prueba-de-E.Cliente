/**
 * 3A. Corrección de XSS utilizando textContent para los datos del usuario.
 */
const nombreInseguro = prompt('Introduce tu nombre (prueba el ataque XSS aquí):') || '';
const contenedor = document.getElementById('salida');

// Creamos la estructura estática segura con innerHTML
contenedor.innerHTML = `<h2>Hola, <span id="saludo-nombre"></span></h2>`;

// Asignamos el dato del usuario mediante textContent para neutralizar cualquier script
document.getElementById('saludo-nombre').textContent = nombreInseguro;